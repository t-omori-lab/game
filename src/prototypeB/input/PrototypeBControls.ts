export type PrototypeBControlFrame = {
  readonly moveX: number;
  readonly moveY: number;
  readonly attack: boolean;
  readonly guard: boolean;
  readonly dodge: boolean;
  readonly activateRelic: boolean;
  readonly useItem: boolean;
  readonly interact: boolean;
  readonly switchWeapon: boolean;
  readonly outcomeChoice: 0 | 1 | 2 | null;
};

type QueuedActions = {
  moveX: number;
  moveY: number;
  attack: boolean;
  dodge: boolean;
  activateRelic: boolean;
  useItem: boolean;
  interact: boolean;
  switchWeapon: boolean;
  outcomeChoice: 0 | 1 | 2 | null;
};

const MOVEMENT_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
]);

export class PrototypeBControls {
  private readonly pressedKeys = new Set<string>();
  private readonly listeners: Array<() => void> = [];
  private readonly joystickPad: HTMLElement;
  private readonly joystickKnob: HTMLElement;
  private joystickPointerId: number | null = null;
  private joystickX = 0;
  private joystickY = 0;
  private guardHeld = false;
  private guardMovementChordActive = false;
  private enabled = false;
  private queued: QueuedActions = createEmptyQueue();

  public constructor(private readonly root: HTMLElement) {
    this.joystickPad = requireElement(root, '[data-control="move"]');
    this.joystickKnob = requireElement(root, '[data-control="move-knob"]');
    this.bindJoystick();
    this.bindActionButton("attack", () => {
      this.queued.attack = true;
    });
    this.bindHoldButton(
      "guard",
      () => {
        this.guardHeld = true;
        this.updateGuardMovementChord();
      },
      () => {
        this.guardHeld = false;
        this.updateGuardMovementChord();
      },
    );
    this.bindActionButton("relic", () => {
      this.queued.activateRelic = true;
    });
    this.bindActionButton("item", () => {
      this.queued.useItem = true;
    });
    this.bindActionButton("interact", () => {
      this.queued.interact = true;
    });
    this.bindActionButton("switch-weapon", () => {
      this.queued.switchWeapon = true;
    });
    this.bindActionButton("outcome-destroy", () => {
      this.queued.outcomeChoice = 0;
    });
    this.bindActionButton("outcome-calm", () => {
      this.queued.outcomeChoice = 1;
    });
    this.bindActionButton("outcome-connect", () => {
      this.queued.outcomeChoice = 2;
    });

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("blur", this.reset);
    this.listeners.push(() => {
      window.removeEventListener("keydown", this.handleKeyDown);
      window.removeEventListener("keyup", this.handleKeyUp);
      window.removeEventListener("blur", this.reset);
    });
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    this.root.classList.toggle("is-controls-disabled", !enabled);

    if (!enabled) {
      this.reset();
    }
  }

  public consumeFrame(): PrototypeBControlFrame {
    const queue = this.queued;
    this.queued = createEmptyQueue();
    const keyboardX =
      (this.isPressed("ArrowRight", "KeyD") ? 1 : 0) -
      (this.isPressed("ArrowLeft", "KeyA") ? 1 : 0);
    const keyboardY =
      (this.isPressed("ArrowDown", "KeyS") ? 1 : 0) -
      (this.isPressed("ArrowUp", "KeyW") ? 1 : 0);

    let moveX =
      keyboardX === 0
        ? this.joystickX === 0
          ? queue.moveX
          : this.joystickX
        : keyboardX;
    let moveY =
      keyboardY === 0
        ? this.joystickY === 0
          ? queue.moveY
          : this.joystickY
        : keyboardY;
    const magnitude = Math.hypot(moveX, moveY);

    if (magnitude > 1) {
      moveX /= magnitude;
      moveY /= magnitude;
    }

    if (!this.enabled) {
      return {
        moveX: 0,
        moveY: 0,
        attack: false,
        guard: false,
        dodge: false,
        activateRelic: false,
        useItem: false,
        interact: false,
        switchWeapon: false,
        outcomeChoice: null,
      };
    }

    return {
      moveX,
      moveY,
      attack: queue.attack,
      guard: this.isGuardActive(),
      dodge: queue.dodge,
      activateRelic: queue.activateRelic,
      useItem: queue.useItem,
      interact: queue.interact,
      switchWeapon: queue.switchWeapon,
      outcomeChoice: queue.outcomeChoice,
    };
  }

  public destroy(): void {
    this.reset();
    for (const removeListener of this.listeners.splice(0)) {
      removeListener();
    }
  }

  private bindJoystick(): void {
    const handlePointerDown = (event: PointerEvent): void => {
      if (!this.enabled || this.joystickPointerId !== null) {
        return;
      }

      event.preventDefault();
      this.joystickPointerId = event.pointerId;
      this.joystickPad.setPointerCapture(event.pointerId);
      this.updateJoystick(event);
    };
    const handlePointerMove = (event: PointerEvent): void => {
      if (event.pointerId !== this.joystickPointerId) {
        return;
      }

      event.preventDefault();
      this.updateJoystick(event);
    };
    const handlePointerEnd = (event: PointerEvent): void => {
      if (event.pointerId !== this.joystickPointerId) {
        return;
      }

      this.joystickPointerId = null;
      this.joystickX = 0;
      this.joystickY = 0;
      this.updateGuardMovementChord();
      this.updateJoystickKnob();
    };

    this.joystickPad.addEventListener("pointerdown", handlePointerDown);
    this.joystickPad.addEventListener("pointermove", handlePointerMove);
    this.joystickPad.addEventListener("pointerup", handlePointerEnd);
    this.joystickPad.addEventListener("pointercancel", handlePointerEnd);
    this.listeners.push(() => {
      this.joystickPad.removeEventListener("pointerdown", handlePointerDown);
      this.joystickPad.removeEventListener("pointermove", handlePointerMove);
      this.joystickPad.removeEventListener("pointerup", handlePointerEnd);
      this.joystickPad.removeEventListener("pointercancel", handlePointerEnd);
    });
  }

  private bindActionButton(
    control: string,
    onPress: () => void,
  ): void {
    const element = requireElement(this.root, `[data-control="${control}"]`);
    const handlePointerDown = (event: PointerEvent): void => {
      if (!this.enabled) {
        return;
      }

      event.preventDefault();
      onPress();
    };
    const handleClick = (event: MouseEvent): void => {
      if (!this.enabled) {
        return;
      }

      event.preventDefault();
      if (event.detail > 0) {
        return;
      }

      onPress();
    };
    element.addEventListener("pointerdown", handlePointerDown);
    element.addEventListener("click", handleClick);
    this.listeners.push(() => {
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("click", handleClick);
    });
  }

  private bindHoldButton(
    control: string,
    onPress: () => void,
    onRelease: () => void,
  ): void {
    const element = requireElement(this.root, `[data-control="${control}"]`);
    const press = (event: PointerEvent): void => {
      if (!this.enabled) {
        return;
      }

      event.preventDefault();
      element.setPointerCapture(event.pointerId);
      onPress();
    };
    const release = (event: PointerEvent): void => {
      event.preventDefault();
      onRelease();
    };
    const pressWithKeyboard = (event: KeyboardEvent): void => {
      if (
        !this.enabled ||
        event.repeat ||
        (event.code !== "Space" && event.code !== "Enter")
      ) {
        return;
      }

      event.preventDefault();
      onPress();
    };
    const releaseWithKeyboard = (event: KeyboardEvent): void => {
      if (event.code !== "Space" && event.code !== "Enter") {
        return;
      }

      event.preventDefault();
      onRelease();
    };
    element.addEventListener("pointerdown", press);
    element.addEventListener("pointerup", release);
    element.addEventListener("pointercancel", release);
    element.addEventListener("keydown", pressWithKeyboard);
    element.addEventListener("keyup", releaseWithKeyboard);
    this.listeners.push(() => {
      element.removeEventListener("pointerdown", press);
      element.removeEventListener("pointerup", release);
      element.removeEventListener("pointercancel", release);
      element.removeEventListener("keydown", pressWithKeyboard);
      element.removeEventListener("keyup", releaseWithKeyboard);
    });
  }

  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.enabled || isControlActivationKey(event)) {
      return;
    }

    if (MOVEMENT_KEYS.has(event.code) || event.code === "Space") {
      event.preventDefault();
    }

    this.pressedKeys.add(event.code);
    this.queueMovementTap(event.code);
    this.updateGuardMovementChord();
    if (event.repeat) {
      return;
    }

    switch (event.code) {
      case "Space":
      case "KeyJ":
        this.queued.attack = true;
        break;
      case "KeyK":
        this.queued.dodge = true;
        break;
      case "KeyQ":
      case "KeyL":
        this.queued.activateRelic = true;
        break;
      case "KeyR":
        this.queued.useItem = true;
        break;
      case "KeyE":
        this.queued.interact = true;
        break;
      case "Digit1":
        event.preventDefault();
        this.queued.switchWeapon = true;
        break;
      case "Digit7":
        this.queued.outcomeChoice = 0;
        break;
      case "Digit8":
        this.queued.outcomeChoice = 1;
        break;
      case "Digit9":
        this.queued.outcomeChoice = 2;
        break;
    }
  };

  private readonly handleKeyUp = (event: KeyboardEvent): void => {
    this.pressedKeys.delete(event.code);
    this.updateGuardMovementChord();
  };

  private readonly reset = (): void => {
    this.pressedKeys.clear();
    this.guardHeld = false;
    this.joystickPointerId = null;
    this.joystickX = 0;
    this.joystickY = 0;
    this.guardMovementChordActive = false;
    this.queued = createEmptyQueue();
    this.updateJoystickKnob();
  };

  private updateJoystick(event: PointerEvent): void {
    const bounds = this.joystickPad.getBoundingClientRect();
    const radius = Math.min(bounds.width, bounds.height) * 0.5;
    const deltaX = event.clientX - (bounds.left + bounds.width * 0.5);
    const deltaY = event.clientY - (bounds.top + bounds.height * 0.5);
    const distance = Math.hypot(deltaX, deltaY);
    const ratio = distance > radius ? radius / distance : 1;
    this.joystickX = (deltaX * ratio) / radius;
    this.joystickY = (deltaY * ratio) / radius;
    this.queued.moveX = this.joystickX;
    this.queued.moveY = this.joystickY;
    this.updateGuardMovementChord();
    this.updateJoystickKnob();
  }

  private updateGuardMovementChord(): void {
    const movementActive =
      Math.hypot(this.joystickX, this.joystickY) > 0.22 ||
      [...MOVEMENT_KEYS].some((code) => this.pressedKeys.has(code));
    const chordActive = this.isGuardActive() && movementActive;

    if (chordActive && !this.guardMovementChordActive) {
      this.queued.dodge = true;
    }

    this.guardMovementChordActive = chordActive;
  }

  private isGuardActive(): boolean {
    return (
      this.guardHeld ||
      this.pressedKeys.has("ShiftLeft") ||
      this.pressedKeys.has("ShiftRight")
    );
  }

  private queueMovementTap(code: string): void {
    switch (code) {
      case "ArrowRight":
      case "KeyD":
        this.queued.moveX = 1;
        break;
      case "ArrowLeft":
      case "KeyA":
        this.queued.moveX = -1;
        break;
      case "ArrowDown":
      case "KeyS":
        this.queued.moveY = 1;
        break;
      case "ArrowUp":
      case "KeyW":
        this.queued.moveY = -1;
        break;
    }
  }

  private updateJoystickKnob(): void {
    this.joystickKnob.style.setProperty("--move-x", `${this.joystickX * 42}px`);
    this.joystickKnob.style.setProperty("--move-y", `${this.joystickY * 42}px`);
  }

  private isPressed(primary: string, secondary: string): boolean {
    return (
      this.pressedKeys.has(primary) ||
      this.pressedKeys.has(secondary)
    );
  }
}

function createEmptyQueue(): QueuedActions {
  return {
    moveX: 0,
    moveY: 0,
    attack: false,
    dodge: false,
    activateRelic: false,
    useItem: false,
    interact: false,
    switchWeapon: false,
    outcomeChoice: null,
  };
}

function requireElement(root: HTMLElement, selector: string): HTMLElement {
  const element = root.querySelector<HTMLElement>(selector);

  if (element === null) {
    throw new Error(`Prototype B control is missing: ${selector}`);
  }

  return element;
}

function isControlActivationKey(event: KeyboardEvent): boolean {
  if (event.code !== "Space" && event.code !== "Enter") {
    return false;
  }

  return (
    typeof Element !== "undefined" &&
    event.target instanceof Element &&
    event.target.closest("button[data-control]") !== null
  );
}
