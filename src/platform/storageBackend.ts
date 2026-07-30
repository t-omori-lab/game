export type StoragePersistence = "indexeddb" | "memory";
export type StoragePersistenceListener = (
  persistence: StoragePersistence,
) => void;

export interface StorageBackend {
  readonly persistence: StoragePersistence;
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
  subscribePersistence(listener: StoragePersistenceListener): () => void;
}

export class MemoryStorageBackend implements StorageBackend {
  public readonly persistence = "memory" as const;
  private readonly values = new Map<string, string>();

  public async get(key: string): Promise<string | null> {
    return this.values.get(key) ?? null;
  }

  public async set(key: string, value: string): Promise<void> {
    this.values.set(key, value);
  }

  public async remove(key: string): Promise<void> {
    this.values.delete(key);
  }

  public subscribePersistence(listener: StoragePersistenceListener): () => void {
    listener(this.persistence);
    return () => undefined;
  }
}

export interface IndexedDbStorageOptions {
  readonly databaseName?: string;
  readonly databaseVersion?: number;
  readonly storeName?: string;
}

export class IndexedDbStorageBackend implements StorageBackend {
  public readonly persistence = "indexeddb" as const;
  private readonly databaseName: string;
  private readonly databaseVersion: number;
  private readonly storeName: string;
  private databasePromise: Promise<IDBDatabase> | undefined;

  public constructor(
    private readonly factory: IDBFactory,
    options: IndexedDbStorageOptions = {},
  ) {
    this.databaseName =
      options.databaseName ?? "small-persistent-world-platform";
    this.databaseVersion = options.databaseVersion ?? 1;
    this.storeName = options.storeName ?? "key-value";
  }

  public async ready(): Promise<void> {
    await this.open();
  }

  public async get(key: string): Promise<string | null> {
    const database = await this.open();

    return new Promise<string | null>((resolve, reject) => {
      const transaction = database.transaction(this.storeName, "readonly");
      const request = transaction.objectStore(this.storeName).get(key);

      request.onsuccess = () => {
        const value: unknown = request.result;

        if (value === undefined) {
          resolve(null);
        } else if (typeof value === "string") {
          resolve(value);
        } else {
          reject(new Error(`Stored value for "${key}" is not a string.`));
        }
      };
      request.onerror = () => {
        reject(request.error ?? new Error(`Unable to read "${key}".`));
      };
      transaction.onabort = () => {
        reject(transaction.error ?? new Error(`Read for "${key}" was aborted.`));
      };
    });
  }

  public async set(key: string, value: string): Promise<void> {
    const database = await this.open();

    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(this.storeName, "readwrite");

      transaction.objectStore(this.storeName).put(value, key);
      transaction.oncomplete = () => {
        resolve();
      };
      transaction.onerror = () => {
        reject(transaction.error ?? new Error(`Unable to write "${key}".`));
      };
      transaction.onabort = () => {
        reject(transaction.error ?? new Error(`Write for "${key}" was aborted.`));
      };
    });
  }

  public async remove(key: string): Promise<void> {
    const database = await this.open();

    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(this.storeName, "readwrite");

      transaction.objectStore(this.storeName).delete(key);
      transaction.oncomplete = () => {
        resolve();
      };
      transaction.onerror = () => {
        reject(transaction.error ?? new Error(`Unable to remove "${key}".`));
      };
      transaction.onabort = () => {
        reject(
          transaction.error ?? new Error(`Removal for "${key}" was aborted.`),
        );
      };
    });
  }

  public async close(): Promise<void> {
    if (this.databasePromise === undefined) {
      return;
    }

    const database = await this.databasePromise;
    database.close();
    this.databasePromise = undefined;
  }

  public subscribePersistence(listener: StoragePersistenceListener): () => void {
    listener(this.persistence);
    return () => undefined;
  }

  private open(): Promise<IDBDatabase> {
    if (this.databasePromise !== undefined) {
      return this.databasePromise;
    }

    this.databasePromise = new Promise<IDBDatabase>((resolve, reject) => {
      const request = this.factory.open(
        this.databaseName,
        this.databaseVersion,
      );

      request.onupgradeneeded = () => {
        const database = request.result;

        if (!database.objectStoreNames.contains(this.storeName)) {
          database.createObjectStore(this.storeName);
        }
      };
      request.onsuccess = () => {
        const database = request.result;

        database.onversionchange = () => {
          database.close();
          this.databasePromise = undefined;
        };
        resolve(database);
      };
      request.onerror = () => {
        this.databasePromise = undefined;
        reject(request.error ?? new Error("Unable to open IndexedDB."));
      };
      request.onblocked = () => {
        this.databasePromise = undefined;
        reject(new Error("IndexedDB open request was blocked."));
      };
    });

    return this.databasePromise;
  }
}

export class ResilientStorageBackend implements StorageBackend {
  private primaryAvailable = true;
  private readonly persistenceListeners = new Set<StoragePersistenceListener>();

  public constructor(
    private readonly primary: StorageBackend,
    private readonly fallback: StorageBackend = new MemoryStorageBackend(),
  ) {}

  public get usingFallback(): boolean {
    return !this.primaryAvailable;
  }

  public get persistence(): StoragePersistence {
    return this.primaryAvailable
      ? this.primary.persistence
      : this.fallback.persistence;
  }

  public async get(key: string): Promise<string | null> {
    if (!this.primaryAvailable) {
      return this.fallback.get(key);
    }

    try {
      const value = await this.primary.get(key);

      if (value === null) {
        await this.fallback.remove(key);
      } else {
        await this.fallback.set(key, value);
      }

      return value;
    } catch {
      this.useFallback();
      return this.fallback.get(key);
    }
  }

  public async set(key: string, value: string): Promise<void> {
    await this.fallback.set(key, value);

    if (!this.primaryAvailable) {
      return;
    }

    try {
      await this.primary.set(key, value);
    } catch {
      this.useFallback();
    }
  }

  public async remove(key: string): Promise<void> {
    await this.fallback.remove(key);

    if (!this.primaryAvailable) {
      return;
    }

    try {
      await this.primary.remove(key);
    } catch {
      this.useFallback();
    }
  }

  public subscribePersistence(listener: StoragePersistenceListener): () => void {
    this.persistenceListeners.add(listener);
    listener(this.persistence);

    return () => {
      this.persistenceListeners.delete(listener);
    };
  }

  private useFallback(): void {
    if (!this.primaryAvailable) {
      return;
    }

    this.primaryAvailable = false;

    for (const listener of this.persistenceListeners) {
      listener(this.persistence);
    }
  }
}

export interface StorageBackendSelection {
  readonly backend: StorageBackend;
  readonly persistence: StoragePersistence;
}

export async function createDefaultStorageBackend(
  options: IndexedDbStorageOptions = {},
): Promise<StorageBackendSelection> {
  if (typeof globalThis.indexedDB === "undefined") {
    return selectBackend(new MemoryStorageBackend());
  }

  const indexedDb = new IndexedDbStorageBackend(globalThis.indexedDB, options);

  try {
    await indexedDb.ready();
    return selectBackend(new ResilientStorageBackend(indexedDb));
  } catch {
    return selectBackend(new MemoryStorageBackend());
  }
}

function selectBackend(backend: StorageBackend): StorageBackendSelection {
  return {
    backend,
    get persistence() {
      return backend.persistence;
    },
  };
}
