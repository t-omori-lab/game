export type ConnectivityState = "online" | "offline";
export type InstallAvailability = "available" | "installed" | "unavailable";

export interface PwaStatus {
  readonly connectivity: ConnectivityState;
  readonly install: InstallAvailability;
  readonly standalone: boolean;
}

export type InstallRequestResult =
  | { readonly outcome: "accepted" | "dismissed" }
  | { readonly outcome: "unavailable" };

export type ServiceWorkerRegistrationResult =
  | { readonly status: "registered"; readonly registration: ServiceWorkerRegistration }
  | { readonly status: "unsupported" }
  | { readonly status: "failed"; readonly error: Error };

interface InstallPromptChoice {
  readonly outcome: "accepted" | "dismissed";
}

interface InstallPromptEvent extends Event {
  prompt(): Promise<void>;
  readonly userChoice: Promise<InstallPromptChoice>;
}

interface IosNavigator extends Navigator {
  readonly standalone?: boolean;
}

export class PwaLifecycle {
  private readonly listeners = new Set<(status: PwaStatus) => void>();
  private deferredPrompt: InstallPromptEvent | null = null;
  private started = false;
  private installedDuringSession = false;

  public constructor(
    private readonly windowRef: Window,
    private readonly navigatorRef: Navigator,
  ) {}

  public get status(): PwaStatus {
    const standalone = isStandalone(this.windowRef, this.navigatorRef);

    return {
      connectivity: this.navigatorRef.onLine ? "online" : "offline",
      install:
        standalone || this.installedDuringSession
          ? "installed"
          : this.deferredPrompt === null
            ? "unavailable"
            : "available",
      standalone,
    };
  }

  public start(): void {
    if (this.started) {
      return;
    }

    this.windowRef.addEventListener("online", this.handleConnectionChange);
    this.windowRef.addEventListener("offline", this.handleConnectionChange);
    this.windowRef.addEventListener(
      "beforeinstallprompt",
      this.handleInstallPrompt,
    );
    this.windowRef.addEventListener("appinstalled", this.handleInstalled);
    this.started = true;
    this.emit();
  }

  public stop(): void {
    if (!this.started) {
      return;
    }

    this.windowRef.removeEventListener("online", this.handleConnectionChange);
    this.windowRef.removeEventListener("offline", this.handleConnectionChange);
    this.windowRef.removeEventListener(
      "beforeinstallprompt",
      this.handleInstallPrompt,
    );
    this.windowRef.removeEventListener("appinstalled", this.handleInstalled);
    this.deferredPrompt = null;
    this.started = false;
  }

  public subscribe(listener: (status: PwaStatus) => void): () => void {
    this.listeners.add(listener);
    listener(this.status);

    return () => {
      this.listeners.delete(listener);
    };
  }

  public async requestInstall(): Promise<InstallRequestResult> {
    const prompt = this.deferredPrompt;

    if (prompt === null) {
      return { outcome: "unavailable" };
    }

    this.deferredPrompt = null;
    await prompt.prompt();
    const choice = await prompt.userChoice;
    this.emit();

    return { outcome: choice.outcome };
  }

  private readonly handleConnectionChange = (): void => {
    this.emit();
  };

  private readonly handleInstallPrompt = (event: Event): void => {
    if (!isInstallPromptEvent(event)) {
      return;
    }

    event.preventDefault();
    this.deferredPrompt = event;
    this.emit();
  };

  private readonly handleInstalled = (): void => {
    this.deferredPrompt = null;
    this.installedDuringSession = true;
    this.emit();
  };

  private emit(): void {
    const status = this.status;

    for (const listener of this.listeners) {
      listener(status);
    }
  }
}

export async function registerServiceWorker(
  scriptUrl = "./sw.js",
  navigatorRef: Navigator | undefined = globalThis.navigator,
): Promise<ServiceWorkerRegistrationResult> {
  if (
    navigatorRef === undefined ||
    !("serviceWorker" in navigatorRef)
  ) {
    return { status: "unsupported" };
  }

  try {
    const registration = await navigatorRef.serviceWorker.register(scriptUrl);
    return { status: "registered", registration };
  } catch (error: unknown) {
    return {
      status: "failed",
      error: error instanceof Error ? error : new Error("Service worker registration failed."),
    };
  }
}

export function createBrowserPwaLifecycle(): PwaLifecycle | null {
  if (
    typeof globalThis.window === "undefined" ||
    typeof globalThis.navigator === "undefined"
  ) {
    return null;
  }

  return new PwaLifecycle(globalThis.window, globalThis.navigator);
}

function isStandalone(
  windowRef: Window,
  navigatorRef: Navigator,
): boolean {
  const iosNavigator = navigatorRef as IosNavigator;

  return (
    windowRef.matchMedia("(display-mode: standalone)").matches ||
    iosNavigator.standalone === true
  );
}

function isInstallPromptEvent(event: Event): event is InstallPromptEvent {
  const candidate = event as Event & {
    readonly prompt?: unknown;
    readonly userChoice?: unknown;
  };

  return (
    typeof candidate.prompt === "function" &&
    candidate.userChoice instanceof Promise
  );
}
