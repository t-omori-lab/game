export type RelicSoundCue =
  | "blade"
  | "impact"
  | "guard"
  | "perfect-guard"
  | "hurt"
  | "warning"
  | "enemy-impact"
  | "dodge"
  | "relic"
  | "item"
  | "pickup"
  | "ui"
  | "result"
  | "outcome-destroy"
  | "outcome-calm"
  | "outcome-connect";

const TEMPO = 92;
const BEAT_SECONDS = 60 / TEMPO / 2;
const SCHEDULE_LOOKAHEAD_SECONDS = 0.08;
const EXPLORATION_NOTES = [110, 130.81, 146.83, 174.61, 146.83, 123.47];

export function rebaseStaleBeatAt(
  nextBeatAt: number,
  currentTime: number,
  lookaheadSeconds = SCHEDULE_LOOKAHEAD_SECONDS,
): number {
  if (!Number.isFinite(nextBeatAt) || nextBeatAt < currentTime) {
    return currentTime + lookaheadSeconds;
  }

  return nextBeatAt;
}

export class RelicSoundscape {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private musicBus: GainNode | null = null;
  private effectsBus: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private nextBeatAt = 0;
  private beatIndex = 0;
  private danger = 0;
  private muted = false;

  public get isReady(): boolean {
    return this.context !== null && this.context.state === "running";
  }

  public async unlock(): Promise<void> {
    if (this.context === null) {
      const context = new AudioContext({
        latencyHint: "interactive",
        sampleRate: 44_100,
      });
      const master = context.createGain();
      const musicBus = context.createGain();
      const effectsBus = context.createGain();

      master.gain.value = this.muted ? 0 : 0.72;
      musicBus.gain.value = 0.22;
      effectsBus.gain.value = 0.58;
      musicBus.connect(master);
      effectsBus.connect(master);
      master.connect(context.destination);

      this.context = context;
      this.master = master;
      this.musicBus = musicBus;
      this.effectsBus = effectsBus;
      this.noiseBuffer = createNoiseBuffer(context);
      this.nextBeatAt =
        context.currentTime + SCHEDULE_LOOKAHEAD_SECONDS;
    }

    if (this.context.state !== "running") {
      await this.context.resume();
      this.nextBeatAt =
        this.context.currentTime + SCHEDULE_LOOKAHEAD_SECONDS;
    }
  }

  public setMuted(muted: boolean): void {
    const wasMuted = this.muted;
    this.muted = muted;

    if (this.context !== null && this.master !== null) {
      const now = this.context.currentTime;
      if (wasMuted && !muted) {
        this.nextBeatAt = now + SCHEDULE_LOOKAHEAD_SECONDS;
      }

      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setTargetAtTime(muted ? 0 : 0.72, now, 0.015);
    }
  }

  public setDanger(value: number): void {
    this.danger = clamp(value, 0, 1);
  }

  public update(): void {
    const context = this.context;
    const musicBus = this.musicBus;

    if (
      context === null ||
      musicBus === null ||
      context.state !== "running" ||
      this.muted
    ) {
      return;
    }

    const currentTime = context.currentTime;
    const scheduleHorizon =
      currentTime + SCHEDULE_LOOKAHEAD_SECONDS;
    this.nextBeatAt = rebaseStaleBeatAt(
      this.nextBeatAt,
      currentTime,
    );

    let scheduled = 0;
    while (this.nextBeatAt <= scheduleHorizon && scheduled < 2) {
      const note =
        EXPLORATION_NOTES[this.beatIndex % EXPLORATION_NOTES.length] ?? 110;
      const accent = this.beatIndex % 4 === 0;
      this.playTone(
        note,
        this.nextBeatAt,
        accent ? 0.2 : 0.105,
        accent ? 0.095 : 0.05,
        "square",
        musicBus,
      );

      if (this.danger > 0.15 && this.beatIndex % 2 === 1) {
        this.playTone(
          note * 2.01,
          this.nextBeatAt + 0.015,
          0.065,
          0.025 + this.danger * 0.035,
          "sawtooth",
          musicBus,
        );
      }

      if (accent) {
        this.playNoise(
          this.nextBeatAt,
          0.045,
          0.008 + this.danger * 0.012,
          210,
          musicBus,
        );
      }

      this.beatIndex += 1;
      this.nextBeatAt += BEAT_SECONDS;
      scheduled += 1;
    }
  }

  public play(cue: RelicSoundCue): void {
    const context = this.context;
    const output = this.effectsBus;

    if (
      context === null ||
      output === null ||
      context.state !== "running" ||
      this.muted
    ) {
      return;
    }

    const now = context.currentTime;

    switch (cue) {
      case "blade":
        this.playSweep(720, 280, now, 0.075, 0.16, "sawtooth", output);
        this.playNoise(now, 0.035, 0.055, 2200, output);
        break;
      case "impact":
        this.playSweep(118, 42, now, 0.16, 0.28, "square", output);
        this.playNoise(now, 0.11, 0.12, 310, output);
        break;
      case "guard":
        this.playTone(392, now, 0.085, 0.13, "square", output);
        this.playTone(587.33, now + 0.018, 0.06, 0.07, "triangle", output);
        break;
      case "perfect-guard":
        this.playTone(523.25, now, 0.12, 0.15, "square", output);
        this.playTone(783.99, now + 0.035, 0.12, 0.11, "square", output);
        break;
      case "hurt":
        this.playSweep(160, 72, now, 0.18, 0.17, "sawtooth", output);
        this.playNoise(now, 0.08, 0.08, 480, output);
        break;
      case "warning":
        this.playTone(880, now, 0.055, 0.075, "square", output);
        this.playTone(660, now + 0.07, 0.07, 0.07, "square", output);
        break;
      case "enemy-impact":
        this.playSweep(95, 48, now, 0.13, 0.2, "square", output);
        this.playNoise(now, 0.075, 0.07, 390, output);
        break;
      case "dodge":
        this.playSweep(420, 135, now, 0.11, 0.09, "triangle", output);
        this.playNoise(now, 0.065, 0.04, 1_100, output);
        break;
      case "relic":
        this.playSweep(190, 880, now, 0.34, 0.14, "triangle", output);
        this.playTone(617, now + 0.08, 0.28, 0.075, "square", output);
        this.playNoise(now + 0.03, 0.2, 0.04, 1400, output);
        break;
      case "item":
        this.playTone(440, now, 0.09, 0.1, "triangle", output);
        this.playTone(659.25, now + 0.065, 0.13, 0.09, "triangle", output);
        break;
      case "pickup":
        this.playTone(329.63, now, 0.055, 0.08, "square", output);
        this.playTone(493.88, now + 0.045, 0.075, 0.08, "square", output);
        break;
      case "ui":
        this.playTone(246.94, now, 0.045, 0.045, "square", output);
        break;
      case "result":
        this.playTone(220, now, 0.22, 0.08, "triangle", output);
        this.playTone(329.63, now + 0.11, 0.27, 0.08, "triangle", output);
        this.playTone(493.88, now + 0.23, 0.36, 0.07, "triangle", output);
        break;
      case "outcome-destroy":
        this.playSweep(164.81, 55, now, 0.48, 0.18, "sawtooth", output);
        this.playNoise(now + 0.08, 0.24, 0.1, 260, output);
        break;
      case "outcome-calm":
        this.playTone(261.63, now, 0.42, 0.1, "triangle", output);
        this.playTone(392, now + 0.12, 0.46, 0.09, "triangle", output);
        break;
      case "outcome-connect":
        this.playTone(220, now, 0.5, 0.07, "square", output);
        this.playSweep(330, 665, now + 0.08, 0.56, 0.1, "triangle", output);
        this.playNoise(now + 0.12, 0.4, 0.035, 1800, output);
        break;
    }
  }

  public dispose(): void {
    if (this.context !== null) {
      void this.context.close();
    }

    this.context = null;
    this.master = null;
    this.musicBus = null;
    this.effectsBus = null;
    this.noiseBuffer = null;
  }

  private playTone(
    frequency: number,
    startAt: number,
    duration: number,
    volume: number,
    wave: OscillatorType,
    output: AudioNode,
  ): void {
    const context = this.context;
    if (context === null) {
      return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(frequency, startAt);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    oscillator.connect(gain);
    gain.connect(output);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.02);
  }

  private playSweep(
    startFrequency: number,
    endFrequency: number,
    startAt: number,
    duration: number,
    volume: number,
    wave: OscillatorType,
    output: AudioNode,
  ): void {
    const context = this.context;
    if (context === null) {
      return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(startFrequency, startAt);
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(1, endFrequency),
      startAt + duration,
    );
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    oscillator.connect(gain);
    gain.connect(output);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.02);
  }

  private playNoise(
    startAt: number,
    duration: number,
    volume: number,
    filterFrequency: number,
    output: AudioNode,
  ): void {
    const context = this.context;
    const buffer = this.noiseBuffer;
    if (context === null || buffer === null) {
      return;
    }

    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    source.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = filterFrequency;
    filter.Q.value = 0.7;
    gain.gain.setValueAtTime(volume, startAt);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(output);
    source.start(startAt);
    source.stop(startAt + duration);
  }
}

function createNoiseBuffer(context: AudioContext): AudioBuffer {
  const frameCount = Math.floor(context.sampleRate * 0.5);
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const channel = buffer.getChannelData(0);
  let state = 0x49a3bc21;

  for (let index = 0; index < channel.length; index += 1) {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    channel[index] = ((state >>> 0) / 0xffffffff) * 2 - 1;
  }

  return buffer;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}
