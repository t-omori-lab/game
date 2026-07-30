import { afterEach, describe, expect, it, vi } from "vitest";

import { PrototypeBControls } from "../../src/prototypeB/input/PrototypeBControls";

const CONTROL_NAMES = [
  "move",
  "move-knob",
  "attack",
  "guard",
  "relic",
  "item",
  "interact",
  "switch-weapon",
  "outcome-destroy",
  "outcome-calm",
  "outcome-connect",
] as const;

class FakeStyle {
  public setProperty(_name: string, _value: string): void {}
}

class FakeClassList {
  public toggle(_token: string, _force?: boolean): boolean {
    return false;
  }
}

class FakeElement extends EventTarget {
  public readonly style = new FakeStyle();
  public readonly classList = new FakeClassList();
  private readonly descendants = new Map<string, FakeElement>();

  public register(selector: string, element: FakeElement): void {
    this.descendants.set(selector, element);
  }

  public querySelector<T extends Element>(selector: string): T | null {
    const element = this.descendants.get(selector);
    return (element ?? null) as T | null;
  }

  public getBoundingClientRect(): DOMRect {
    return {
      bottom: 100,
      height: 100,
      left: 0,
      right: 100,
      top: 0,
      width: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    };
  }

  public setPointerCapture(_pointerId: number): void {}
}

type ControlsHarness = {
  readonly controls: PrototypeBControls;
  readonly elements: ReadonlyMap<string, FakeElement>;
  readonly windowTarget: EventTarget;
};

const activeControls: PrototypeBControls[] = [];

afterEach(() => {
  for (const controls of activeControls.splice(0)) {
    controls.destroy();
  }
  vi.unstubAllGlobals();
});

describe("PrototypeBControls", () => {
  it("turns guard plus movement into one dodge in either press order", () => {
    const { controls, windowTarget } = createHarness();

    dispatchKey(windowTarget, "keydown", "ShiftLeft");
    expect(controls.consumeFrame()).toMatchObject({
      dodge: false,
      guard: true,
    });

    dispatchKey(windowTarget, "keydown", "KeyW");
    expect(controls.consumeFrame()).toMatchObject({
      dodge: true,
      guard: true,
      moveY: -1,
    });
    expect(controls.consumeFrame()).toMatchObject({
      dodge: false,
      guard: true,
    });

    dispatchKey(windowTarget, "keydown", "KeyD");
    expect(controls.consumeFrame()).toMatchObject({
      dodge: false,
      guard: true,
    });
    dispatchKey(windowTarget, "keyup", "KeyW");
    dispatchKey(windowTarget, "keyup", "KeyD");
    dispatchKey(windowTarget, "keyup", "ShiftLeft");

    dispatchKey(windowTarget, "keydown", "KeyD");
    dispatchKey(windowTarget, "keydown", "ShiftLeft");
    expect(controls.consumeFrame()).toMatchObject({
      dodge: true,
      guard: true,
      moveX: 1,
    });
    expect(controls.consumeFrame()).toMatchObject({
      dodge: false,
      guard: true,
    });
  });

  it("keeps touch guard held after the movement chord queues a dodge", () => {
    const { controls, elements } = createHarness();
    const move = requireControl(elements, "move");
    const guard = requireControl(elements, "guard");

    dispatchPointer(move, "pointerdown", {
      clientX: 100,
      clientY: 50,
      pointerId: 1,
    });
    dispatchPointer(guard, "pointerdown", { pointerId: 2 });
    expect(controls.consumeFrame()).toMatchObject({
      dodge: true,
      guard: true,
      moveX: 1,
    });
    expect(controls.consumeFrame()).toMatchObject({
      dodge: false,
      guard: true,
    });

    dispatchPointer(guard, "pointerup", { pointerId: 2 });
    dispatchPointer(move, "pointerup", { pointerId: 1 });
    expect(controls.consumeFrame()).toMatchObject({
      dodge: false,
      guard: false,
    });

    dispatchPointer(guard, "pointerdown", { pointerId: 3 });
    expect(controls.consumeFrame()).toMatchObject({
      dodge: false,
      guard: true,
    });
    dispatchPointer(move, "pointerdown", {
      clientX: 100,
      clientY: 50,
      pointerId: 4,
    });
    expect(controls.consumeFrame()).toMatchObject({
      dodge: true,
      guard: true,
      moveX: 1,
    });
  });

  it("leaves Tab to browser focus navigation and keeps Digit1 weapon switching", () => {
    const { controls, windowTarget } = createHarness();

    const tab = dispatchKey(windowTarget, "keydown", "Tab");
    expect(tab.defaultPrevented).toBe(false);
    expect(controls.consumeFrame().switchWeapon).toBe(false);
    dispatchKey(windowTarget, "keyup", "Tab");

    const digitOne = dispatchKey(windowTarget, "keydown", "Digit1");
    expect(digitOne.defaultPrevented).toBe(true);
    expect(controls.consumeFrame().switchWeapon).toBe(true);
  });

  it("accepts assistive clicks without replaying pointer-originated clicks", () => {
    const { controls, elements } = createHarness();
    const attack = requireControl(elements, "attack");

    dispatchPointer(attack, "pointerdown", { pointerId: 1 });
    expect(controls.consumeFrame().attack).toBe(true);

    dispatchClick(attack, 1);
    expect(controls.consumeFrame().attack).toBe(false);

    dispatchClick(attack, 0);
    expect(controls.consumeFrame().attack).toBe(true);
  });
});

function createHarness(): ControlsHarness {
  const windowTarget = new EventTarget();
  vi.stubGlobal("window", windowTarget);

  const root = new FakeElement();
  const elements = new Map<string, FakeElement>();

  for (const name of CONTROL_NAMES) {
    const element = new FakeElement();
    elements.set(name, element);
    root.register(`[data-control="${name}"]`, element);
  }

  const controls = new PrototypeBControls(
    root as unknown as HTMLElement,
  );
  controls.setEnabled(true);
  activeControls.push(controls);

  return { controls, elements, windowTarget };
}

function requireControl(
  elements: ReadonlyMap<string, FakeElement>,
  name: string,
): FakeElement {
  const element = elements.get(name);
  if (element === undefined) {
    throw new Error(`Missing fake control: ${name}`);
  }
  return element;
}

function dispatchKey(
  target: EventTarget,
  type: "keydown" | "keyup",
  code: string,
  repeat = false,
): Event {
  const event = new Event(type, { cancelable: true });
  Object.defineProperties(event, {
    code: { value: code },
    repeat: { value: repeat },
  });
  target.dispatchEvent(event);
  return event;
}

function dispatchPointer(
  target: EventTarget,
  type: "pointerdown" | "pointerup",
  options: {
    readonly clientX?: number;
    readonly clientY?: number;
    readonly pointerId: number;
  },
): Event {
  const event = new Event(type, { cancelable: true });
  Object.defineProperties(event, {
    clientX: { value: options.clientX ?? 50 },
    clientY: { value: options.clientY ?? 50 },
    pointerId: { value: options.pointerId },
  });
  target.dispatchEvent(event);
  return event;
}

function dispatchClick(target: EventTarget, detail: number): Event {
  const event = new Event("click", { cancelable: true });
  Object.defineProperty(event, "detail", { value: detail });
  target.dispatchEvent(event);
  return event;
}
