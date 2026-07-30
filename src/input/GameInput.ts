import Phaser from "phaser";

export const SKILL_BUTTON = {
  x: 864,
  y: 444,
  radius: 58,
} as const;

export type InputIntent = {
  moveX: number;
  moveY: number;
  activateSkill: boolean;
};

export type DragVisualState = {
  active: boolean;
  originX: number;
  originY: number;
  knobX: number;
  knobY: number;
};

type MovementKeys = {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  w: Phaser.Input.Keyboard.Key;
  a: Phaser.Input.Keyboard.Key;
  s: Phaser.Input.Keyboard.Key;
  d: Phaser.Input.Keyboard.Key;
  skill: Phaser.Input.Keyboard.Key;
};

const DRAG_ZONE_MAX_X = 610;
const JOYSTICK_RADIUS = 54;
const JOYSTICK_DEAD_ZONE = 8;

export class GameInput {
  private readonly scene: Phaser.Scene;
  private readonly keys: MovementKeys;
  private enabled = false;
  private skillQueued = false;
  private dragPointerId: number | null = null;
  private dragOriginX = 118;
  private dragOriginY = 438;
  private dragX = 118;
  private dragY = 438;

  public constructor(scene: Phaser.Scene) {
    this.scene = scene;

    const keyboard = scene.input.keyboard;
    if (keyboard === null) {
      throw new Error("Keyboard input plugin is unavailable.");
    }

    this.keys = keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      skill: Phaser.Input.Keyboard.KeyCodes.SPACE,
    }) as MovementKeys;

    scene.input.on("pointerdown", this.handlePointerDown, this);
    scene.input.on("pointermove", this.handlePointerMove, this);
    scene.input.on("pointerup", this.handlePointerUp, this);
    scene.input.on("pointerupoutside", this.handlePointerUp, this);
    window.addEventListener("blur", this.reset);
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) {
      this.reset();
    }
  }

  public queueSkill(): void {
    if (this.enabled) {
      this.skillQueued = true;
    }
  }

  public consumeIntent(): InputIntent {
    const keyboardX =
      (this.keys.right.isDown || this.keys.d.isDown ? 1 : 0) -
      (this.keys.left.isDown || this.keys.a.isDown ? 1 : 0);
    const keyboardY =
      (this.keys.down.isDown || this.keys.s.isDown ? 1 : 0) -
      (this.keys.up.isDown || this.keys.w.isDown ? 1 : 0);

    let moveX = keyboardX;
    let moveY = keyboardY;

    if (moveX === 0 && moveY === 0 && this.dragPointerId !== null) {
      const deltaX = this.dragX - this.dragOriginX;
      const deltaY = this.dragY - this.dragOriginY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance > JOYSTICK_DEAD_ZONE) {
        const strength = Math.min(1, distance / JOYSTICK_RADIUS);
        moveX = (deltaX / distance) * strength;
        moveY = (deltaY / distance) * strength;
      }
    }

    const magnitude = Math.hypot(moveX, moveY);
    if (magnitude > 1) {
      moveX /= magnitude;
      moveY /= magnitude;
    }

    const activateSkill =
      this.skillQueued || Phaser.Input.Keyboard.JustDown(this.keys.skill);
    this.skillQueued = false;

    return {
      moveX: this.enabled ? moveX : 0,
      moveY: this.enabled ? moveY : 0,
      activateSkill: this.enabled && activateSkill,
    };
  }

  public getDragVisual(): DragVisualState {
    if (this.dragPointerId === null) {
      return {
        active: false,
        originX: this.dragOriginX,
        originY: this.dragOriginY,
        knobX: this.dragOriginX,
        knobY: this.dragOriginY,
      };
    }

    const deltaX = this.dragX - this.dragOriginX;
    const deltaY = this.dragY - this.dragOriginY;
    const distance = Math.hypot(deltaX, deltaY);
    const ratio = distance > JOYSTICK_RADIUS ? JOYSTICK_RADIUS / distance : 1;

    return {
      active: true,
      originX: this.dragOriginX,
      originY: this.dragOriginY,
      knobX: this.dragOriginX + deltaX * ratio,
      knobY: this.dragOriginY + deltaY * ratio,
    };
  }

  public destroy(): void {
    this.scene.input.off("pointerdown", this.handlePointerDown, this);
    this.scene.input.off("pointermove", this.handlePointerMove, this);
    this.scene.input.off("pointerup", this.handlePointerUp, this);
    this.scene.input.off("pointerupoutside", this.handlePointerUp, this);
    window.removeEventListener("blur", this.reset);
  }

  private readonly handlePointerDown = (pointer: Phaser.Input.Pointer): void => {
    if (!this.enabled) {
      return;
    }

    if (
      Phaser.Math.Distance.Between(pointer.x, pointer.y, SKILL_BUTTON.x, SKILL_BUTTON.y) <=
      SKILL_BUTTON.radius
    ) {
      this.skillQueued = true;
      return;
    }

    if (pointer.x <= DRAG_ZONE_MAX_X && this.dragPointerId === null) {
      this.dragPointerId = pointer.id;
      this.dragOriginX = Phaser.Math.Clamp(pointer.x, 76, 272);
      this.dragOriginY = Phaser.Math.Clamp(pointer.y, 336, 474);
      this.dragX = pointer.x;
      this.dragY = pointer.y;
    }
  };

  private readonly handlePointerMove = (pointer: Phaser.Input.Pointer): void => {
    if (pointer.id !== this.dragPointerId) {
      return;
    }

    this.dragX = pointer.x;
    this.dragY = pointer.y;
  };

  private readonly handlePointerUp = (pointer: Phaser.Input.Pointer): void => {
    if (pointer.id === this.dragPointerId) {
      this.dragPointerId = null;
    }
  };

  private readonly reset = (): void => {
    this.dragPointerId = null;
    this.skillQueued = false;
  };
}
