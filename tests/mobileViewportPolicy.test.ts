import { describe, expect, it } from "vitest";

import indexHtml from "../index.html?raw";

type NodeFs = {
  readFileSync(path: URL, encoding: "utf8"): string;
};

type NodeProcess = {
  getBuiltinModule(name: "fs"): NodeFs;
};

const nodeGlobal = globalThis as typeof globalThis & {
  readonly process: NodeProcess;
};
const styles = nodeGlobal.process
  .getBuiltinModule("fs")
  .readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");

describe("mobile viewport gesture policy", () => {
  it("blocks double-tap zoom without trapping the user at a fixed scale", () => {
    expect(indexHtml).toContain(
      "width=device-width, initial-scale=1, viewport-fit=cover",
    );
    expect(indexHtml).not.toContain("user-scalable=no");
    expect(styles).toMatch(
      /html,\s*body,\s*#app\s*\{[^}]*touch-action:\s*manipulation;/s,
    );
    expect(styles).toMatch(
      /\.game-shell \*\s*\{[^}]*touch-action:\s*manipulation;/s,
    );
  });

  it("keeps custom multi-touch game controls out of browser gestures", () => {
    expect(styles).toMatch(
      /\.game-stage canvas\s*\{[^}]*touch-action:\s*none;/s,
    );
    expect(styles).toMatch(
      /\.relic-world canvas\s*\{[^}]*touch-action:\s*manipulation;/s,
    );
    expect(styles).toMatch(
      /\.relic-joystick\s*\{[^}]*touch-action:\s*none;/s,
    );
    expect(styles).toMatch(
      /\.relic-action\s*\{[^}]*touch-action:\s*none;/s,
    );
  });
});
