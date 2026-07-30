export const SAVE_FORMAT = "small-persistent-world/save" as const;
export const SAVE_VERSION = 1 as const;

export type JsonPrimitive = boolean | number | string | null;
export type JsonArray = readonly JsonValue[];
export interface JsonObject {
  readonly [key: string]: JsonValue;
}
export type JsonValue = JsonPrimitive | JsonArray | JsonObject;

export type SaveValidationCode =
  | "checksum_mismatch"
  | "invalid_field"
  | "invalid_json"
  | "invalid_payload"
  | "limit_exceeded"
  | "missing_field"
  | "unexpected_field"
  | "unsupported_version";

export interface SaveValidationIssue {
  readonly path: string;
  readonly code: SaveValidationCode;
  readonly message: string;
}

export type ValidationResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly issues: readonly SaveValidationIssue[] };

export interface SaveEnvelope {
  readonly format: typeof SAVE_FORMAT;
  readonly saveVersion: typeof SAVE_VERSION;
  readonly contentVersion: string;
  readonly seed: number;
  readonly revision: number;
  readonly savedAt: string;
  readonly payload: JsonValue;
  readonly checksum: string;
}

export interface CreateSaveEnvelopeInput {
  readonly contentVersion: string;
  readonly seed: number;
  readonly revision: number;
  readonly savedAt: string;
  readonly payload: JsonValue;
}

type UnsignedSaveEnvelope = Omit<SaveEnvelope, "checksum">;

export const MAX_SAVE_EXPORT_CHARACTERS = 2_000_000;
export const MAX_SAVE_PAYLOAD_DEPTH = 64;
export const MAX_SAVE_PAYLOAD_NODES = 100_000;

const ALLOWED_ENVELOPE_KEYS = new Set([
  "format",
  "saveVersion",
  "contentVersion",
  "seed",
  "revision",
  "savedAt",
  "payload",
  "checksum",
]);

const CONTENT_VERSION_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;
const CHECKSUM_PATTERN = /^fnv1a32:[0-9a-f]{8}$/;
const ISO_DATE_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;

interface JsonValidationState {
  nodes: number;
  nodeLimitReported: boolean;
}

export class SaveFormatError extends Error {
  public readonly issues: readonly SaveValidationIssue[];

  public constructor(
    message: string,
    issues: readonly SaveValidationIssue[],
  ) {
    super(message);
    this.name = "SaveFormatError";
    this.issues = issues;
  }
}

export function createSaveEnvelope(
  input: CreateSaveEnvelopeInput,
): SaveEnvelope {
  const payloadIssues: SaveValidationIssue[] = [];

  validateJsonValue(
    input.payload,
    "$.payload",
    payloadIssues,
    new WeakSet<object>(),
    { nodes: 0, nodeLimitReported: false },
    0,
  );

  if (payloadIssues.length > 0) {
    throw new SaveFormatError(
      "Cannot create an invalid save envelope.",
      payloadIssues,
    );
  }

  const unsigned: UnsignedSaveEnvelope = {
    format: SAVE_FORMAT,
    saveVersion: SAVE_VERSION,
    contentVersion: input.contentVersion,
    seed: input.seed,
    revision: input.revision,
    savedAt: input.savedAt,
    payload: input.payload,
  };
  const candidate: SaveEnvelope = {
    ...unsigned,
    checksum: checksumForEnvelope(unsigned),
  };
  const result = validateSaveEnvelope(candidate);

  if (!result.ok) {
    throw new SaveFormatError(
      "Cannot create an invalid save envelope.",
      result.issues,
    );
  }

  return result.value;
}

export function serializeSaveEnvelope(envelope: SaveEnvelope): string {
  const result = validateSaveEnvelope(envelope);

  if (!result.ok) {
    throw new SaveFormatError("Cannot export an invalid save envelope.", result.issues);
  }

  return `${JSON.stringify(result.value, null, 2)}\n`;
}

export function parseSaveEnvelope(text: string): ValidationResult<SaveEnvelope> {
  if (text.length > MAX_SAVE_EXPORT_CHARACTERS) {
    return invalid([
      {
        path: "$",
        code: "limit_exceeded",
        message: `The save export exceeds ${MAX_SAVE_EXPORT_CHARACTERS} characters.`,
      },
    ]);
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(text) as unknown;
  } catch {
    return invalid([
      {
        path: "$",
        code: "invalid_json",
        message: "The save export is not valid JSON.",
      },
    ]);
  }

  return validateSaveEnvelope(parsed);
}

export function validateSaveEnvelope(
  input: unknown,
): ValidationResult<SaveEnvelope> {
  if (!isRecord(input)) {
    return invalid([
      {
        path: "$",
        code: "invalid_field",
        message: "The save envelope must be a JSON object.",
      },
    ]);
  }

  const issues: SaveValidationIssue[] = [];

  for (const key of Object.keys(input)) {
    if (!ALLOWED_ENVELOPE_KEYS.has(key)) {
      issues.push({
        path: `$.${key}`,
        code: "unexpected_field",
        message: `Unexpected save field "${key}".`,
      });
    }
  }

  const format = input["format"];
  const saveVersion = input["saveVersion"];
  const contentVersion = input["contentVersion"];
  const seed = input["seed"];
  const revision = input["revision"];
  const savedAt = input["savedAt"];
  const payload = input["payload"];
  const checksum = input["checksum"];

  requireExactString(format, "$.format", SAVE_FORMAT, issues);

  if (saveVersion === undefined) {
    issues.push(missing("$.saveVersion"));
  } else if (saveVersion !== SAVE_VERSION) {
    issues.push({
      path: "$.saveVersion",
      code: "unsupported_version",
      message: `Only save version ${SAVE_VERSION} is supported.`,
    });
  }

  if (contentVersion === undefined) {
    issues.push(missing("$.contentVersion"));
  } else if (
    typeof contentVersion !== "string" ||
    !CONTENT_VERSION_PATTERN.test(contentVersion)
  ) {
    issues.push({
      path: "$.contentVersion",
      code: "invalid_field",
      message:
        "contentVersion must be 1-64 letters, digits, dots, underscores, or hyphens.",
    });
  }

  if (
    typeof seed !== "number" ||
    !Number.isInteger(seed) ||
    seed < 0 ||
    seed > 0xffff_ffff
  ) {
    issues.push({
      path: "$.seed",
      code: seed === undefined ? "missing_field" : "invalid_field",
      message: "seed must be an unsigned 32-bit integer.",
    });
  }

  if (
    typeof revision !== "number" ||
    !Number.isSafeInteger(revision) ||
    revision < 1
  ) {
    issues.push({
      path: "$.revision",
      code: revision === undefined ? "missing_field" : "invalid_field",
      message: "revision must be a positive safe integer.",
    });
  }

  if (!isCanonicalIsoDate(savedAt)) {
    issues.push({
      path: "$.savedAt",
      code: savedAt === undefined ? "missing_field" : "invalid_field",
      message: "savedAt must be a valid UTC ISO-8601 timestamp.",
    });
  }

  if (payload === undefined) {
    issues.push(missing("$.payload"));
  } else {
    validateJsonValue(
      payload,
      "$.payload",
      issues,
      new WeakSet<object>(),
      { nodes: 0, nodeLimitReported: false },
      0,
    );
  }

  if (typeof checksum !== "string" || !CHECKSUM_PATTERN.test(checksum)) {
    issues.push({
      path: "$.checksum",
      code: checksum === undefined ? "missing_field" : "invalid_field",
      message: "checksum must use the fnv1a32:xxxxxxxx format.",
    });
  }

  if (issues.length > 0) {
    return invalid(issues);
  }

  const envelope: SaveEnvelope = {
    format: SAVE_FORMAT,
    saveVersion: SAVE_VERSION,
    contentVersion: contentVersion as string,
    seed: seed as number,
    revision: revision as number,
    savedAt: savedAt as string,
    payload: payload as JsonValue,
    checksum: checksum as string,
  };
  const expectedChecksum = checksumForEnvelope(envelope);

  if (envelope.checksum !== expectedChecksum) {
    return invalid([
      {
        path: "$.checksum",
        code: "checksum_mismatch",
        message: "The save contents do not match their checksum.",
      },
    ]);
  }

  return { ok: true, value: envelope };
}

export function checksumForEnvelope(
  envelope: UnsignedSaveEnvelope | SaveEnvelope,
): string {
  const unsigned: JsonObject = {
    format: envelope.format,
    saveVersion: envelope.saveVersion,
    contentVersion: envelope.contentVersion,
    seed: envelope.seed,
    revision: envelope.revision,
    savedAt: envelope.savedAt,
    payload: envelope.payload,
  };

  return `fnv1a32:${fnv1a32(canonicalStringify(unsigned))}`;
}

export function canonicalStringify(value: JsonValue): string {
  if (value === null) {
    return "null";
  }

  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (isJsonArray(value)) {
    return `[${value.map((item) => canonicalStringify(item)).join(",")}]`;
  }

  const entries = Object.keys(value)
    .sort()
    .map(
      (key) =>
        `${JSON.stringify(key)}:${canonicalStringify(value[key] as JsonValue)}`,
    );

  return `{${entries.join(",")}}`;
}

function fnv1a32(value: string): string {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return (hash >>> 0).toString(16).padStart(8, "0");
}

function validateJsonValue(
  value: unknown,
  path: string,
  issues: SaveValidationIssue[],
  ancestors: WeakSet<object>,
  state: JsonValidationState,
  depth: number,
): value is JsonValue {
  state.nodes += 1;

  if (depth > MAX_SAVE_PAYLOAD_DEPTH) {
    issues.push({
      path,
      code: "limit_exceeded",
      message: `Save payload depth cannot exceed ${MAX_SAVE_PAYLOAD_DEPTH}.`,
    });
    return false;
  }

  if (state.nodes > MAX_SAVE_PAYLOAD_NODES) {
    if (!state.nodeLimitReported) {
      issues.push({
        path,
        code: "limit_exceeded",
        message: `Save payload cannot exceed ${MAX_SAVE_PAYLOAD_NODES} values.`,
      });
      state.nodeLimitReported = true;
    }

    return false;
  }

  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "boolean"
  ) {
    return true;
  }

  if (typeof value === "number") {
    if (Number.isFinite(value)) {
      return true;
    }

    issues.push({
      path,
      code: "invalid_payload",
      message: "Save payload numbers must be finite.",
    });
    return false;
  }

  if (typeof value !== "object") {
    issues.push({
      path,
      code: "invalid_payload",
      message: "Save payload values must be JSON-compatible.",
    });
    return false;
  }

  if (ancestors.has(value)) {
    issues.push({
      path,
      code: "invalid_payload",
      message: "Save payload values cannot contain cycles.",
    });
    return false;
  }

  ancestors.add(value);
  let valid = true;

  if (Array.isArray(value)) {
    if (value.length > MAX_SAVE_PAYLOAD_NODES) {
      issues.push({
        path,
        code: "limit_exceeded",
        message: `Save payload arrays cannot exceed ${MAX_SAVE_PAYLOAD_NODES} items.`,
      });
      ancestors.delete(value);
      return false;
    }

    for (let index = 0; index < value.length; index += 1) {
      if (!Object.prototype.hasOwnProperty.call(value, index)) {
        issues.push({
          path: `${path}[${index}]`,
          code: "invalid_payload",
          message: "Save payload arrays cannot contain empty slots.",
        });
        valid = false;
        continue;
      }

      const item: unknown = value[index];
      valid =
        validateJsonValue(
          item,
          `${path}[${index}]`,
          issues,
          ancestors,
          state,
          depth + 1,
        ) && valid;

      if (state.nodeLimitReported) {
        break;
      }
    }
  } else {
    const prototype: unknown = Object.getPrototypeOf(value);

    if (prototype !== Object.prototype && prototype !== null) {
      issues.push({
        path,
        code: "invalid_payload",
        message: "Save payload objects must be plain JSON objects.",
      });
      valid = false;
    } else {
      for (const [key, item] of Object.entries(value)) {
        valid =
          validateJsonValue(
            item,
            `${path}.${key}`,
            issues,
            ancestors,
            state,
            depth + 1,
          ) && valid;

        if (state.nodeLimitReported) {
          break;
        }
      }
    }
  }

  ancestors.delete(value);
  return valid;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isJsonArray(value: JsonValue): value is JsonArray {
  return Array.isArray(value);
}

function isCanonicalIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !ISO_DATE_PATTERN.test(value)) {
    return false;
  }

  const milliseconds = Date.parse(value);
  return (
    Number.isFinite(milliseconds) &&
    new Date(milliseconds).toISOString() === value
  );
}

function requireExactString(
  value: unknown,
  path: string,
  expected: string,
  issues: SaveValidationIssue[],
): void {
  if (value === undefined) {
    issues.push(missing(path));
    return;
  }

  if (value !== expected) {
    issues.push({
      path,
      code: "invalid_field",
      message: `${path} must be "${expected}".`,
    });
  }
}

function missing(path: string): SaveValidationIssue {
  return {
    path,
    code: "missing_field",
    message: `${path} is required.`,
  };
}

function invalid<T>(
  issues: readonly SaveValidationIssue[],
): ValidationResult<T> {
  return { ok: false, issues };
}
