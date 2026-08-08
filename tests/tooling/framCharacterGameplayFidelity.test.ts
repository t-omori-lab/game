import { describe, expect, it } from "vitest";

type NodeFs = { readFileSync(path: URL, encoding: "utf8"): string };
type NodeProcess = { getBuiltinModule(name: "fs"): NodeFs };
const fileSystem = (globalThis as typeof globalThis & {
  readonly process: NodeProcess;
}).process.getBuiltinModule("fs");

function source(path: string): string {
  return fileSystem.readFileSync(new URL(path, import.meta.url), "utf8");
}

describe("F.R.A.M. character gameplay fidelity skill", () => {
  it("ships every resource named by the project-local workflow", () => {
    const skill = source("../../skills/fram-character-gameplay-fidelity/SKILL.md");
    const contract = source(
      "../../skills/fram-character-gameplay-fidelity/references/pipeline-contract.md",
    );
    const example = source(
      "../../skills/fram-character-gameplay-fidelity/examples/f01-r09-gameplay-correction.md",
    );
    const audit = source(
      "../../skills/fram-character-gameplay-fidelity/scripts/audit-surface-pack.mjs",
    );
    const capture = source(
      "../../skills/fram-character-gameplay-fidelity/scripts/capture-gameplay-fidelity.mjs",
    );
    const profile = JSON.parse(
      source("../../src/characterForge/f01.gameplay-profile.json"),
    );

    expect(skill).toContain("name: fram-character-gameplay-fidelity");
    expect(skill).toContain("references/pipeline-contract.md");
    expect(skill).toContain("examples/f01-r09-gameplay-correction.md");
    expect(contract).toContain("Source mismatch");
    expect(contract).toContain("Human art gate");
    expect(example).toContain("9,421 visible gameplay cells");
    expect(audit).toContain("fram-character-surface-pack-audit-v1");
    expect(capture).toContain("fram-character-gameplay-fidelity-capture-v1");
    expect(capture).toContain("t-omori-lab.github.io");
    expect(profile.sourceSurfaceCells).toBe(9_454);
    expect(profile.visibleSurfaceCells).toBe(9_421);
    expect(profile.topologyFilter.excludedCells).toBe(33);
  });

  it("wires the deterministic audit into the release check", () => {
    const packageJson = JSON.parse(source("../../package.json"));
    const agents = source("../../AGENTS.md");

    expect(packageJson.scripts["audit:character:f01"]).toContain(
      "--profile src/characterForge/f01.gameplay-profile.json",
    );
    expect(packageJson.scripts["capture:character:r09"]).toContain(
      "capture-gameplay-fidelity.mjs",
    );
    expect(packageJson.scripts.check).toContain("audit:character:f01");
    expect(agents).toContain("skills/fram-character-gameplay-fidelity/SKILL.md");
  });
});
