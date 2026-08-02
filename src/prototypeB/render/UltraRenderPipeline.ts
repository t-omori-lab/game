import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { GTAOPass } from "three/examples/jsm/postprocessing/GTAOPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { type Pass } from "three/examples/jsm/postprocessing/Pass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { HorizontalTiltShiftShader } from "three/examples/jsm/shaders/HorizontalTiltShiftShader.js";
import { VerticalTiltShiftShader } from "three/examples/jsm/shaders/VerticalTiltShiftShader.js";

const DEFAULT_MAX_PIXEL_RATIO = 2;
const DEFAULT_MSAA_SAMPLES = 4;

const BandedTiltShiftShader = {
  name: "BandedTiltShiftShader",
  uniforms: {
    tDiffuse: { value: null },
    direction: { value: new THREE.Vector2(1, 0) },
    focus: { value: 0.58 },
    clearBand: { value: 0.14 },
    farBlur: { value: 13 },
    nearBlur: { value: 19 },
    resolution: { value: new THREE.Vector2(1, 1) },
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform vec2 direction;
    uniform vec2 resolution;
    uniform float focus;
    uniform float clearBand;
    uniform float farBlur;
    uniform float nearBlur;
    varying vec2 vUv;

    void main() {
      float signedDistance = vUv.y - focus;
      float edgeDistance = max(0.0, abs(signedDistance) - clearBand);
      float availableDistance = max(0.001, signedDistance < 0.0
        ? focus - clearBand
        : 1.0 - focus - clearBand);
      float ramp = smoothstep(0.0, 1.0, edgeDistance / availableDistance);
      float maxBlur = signedDistance < 0.0 ? farBlur : nearBlur;
      vec2 stepSize = direction * (maxBlur * ramp) / resolution;

      vec4 color = texture2D(tDiffuse, vUv) * 0.227027;
      color += texture2D(tDiffuse, vUv + stepSize * 1.384615) * 0.316216;
      color += texture2D(tDiffuse, vUv - stepSize * 1.384615) * 0.316216;
      color += texture2D(tDiffuse, vUv + stepSize * 3.230769) * 0.070270;
      color += texture2D(tDiffuse, vUv - stepSize * 3.230769) * 0.070270;
      gl_FragColor = color;
    }
  `,
};

export type UltraRenderPipelineMode =
  | "half-float-msaa"
  | "half-float"
  | "direct";

export interface UltraRenderPipelineOptions {
  /** Caps the device pixel ratio without lowering a 1x desktop display. */
  readonly maxPixelRatio?: number;
  /** Pins the device pixel ratio, primarily for explicit quality presets. */
  readonly pixelRatio?: number;
  /** Requested sample count. The GPU-reported maximum remains authoritative. */
  readonly samples?: number;
  readonly gtao?: boolean;
  readonly bloom?: boolean;
  readonly smaa?: boolean;
  /**
   * Fixed-camera miniature depth separation. This deliberately operates on
   * the rendered world only; DOM HUD and touch controls stay optically sharp.
   */
  readonly tiltShift?: boolean;
  readonly tiltShiftFocus?: number;
  readonly tiltShiftStrength?: number;
  readonly tiltShiftMode?: "classic" | "banded";
  readonly tiltShiftClearBand?: number;
  readonly tiltShiftFarBlurPixels?: number;
  readonly tiltShiftNearBlurPixels?: number;
  readonly onFallback?: (reason: unknown) => void;
}

export interface UltraRenderPipelineStatus {
  readonly mode: UltraRenderPipelineMode;
  readonly width: number;
  readonly height: number;
  readonly pixelRatio: number;
  readonly samples: number;
  readonly gtao: boolean;
  readonly bloom: boolean;
  readonly smaa: boolean;
  readonly tiltShift: boolean;
  readonly tiltShiftMode: "classic" | "banded";
  readonly tiltShiftFocus: number;
  readonly tiltShiftClearBand: number;
  readonly tiltShiftFarBlurPixels: number;
  readonly tiltShiftNearBlurPixels: number;
  readonly fallbackReason: string | null;
}

/**
 * PC Ultra post-processing for a preconfigured Three.js renderer.
 *
 * The scene remains usable without this helper: unsupported half-float targets
 * and runtime post-processing errors fall back to `renderer.render()`.
 */
export class UltraRenderPipeline {
  public readonly renderer: THREE.WebGLRenderer;
  public readonly scene: THREE.Scene;
  public readonly camera: THREE.Camera;

  private readonly maxPixelRatio: number;
  private readonly configuredPixelRatio: number | undefined;
  private readonly onFallback: ((reason: unknown) => void) | undefined;
  private composer: EffectComposer | null = null;
  private passes: Pass[] = [];
  private width = 1;
  private height = 1;
  private pixelRatio = 1;
  private samples = 0;
  private mode: UltraRenderPipelineMode = "direct";
  private gtaoEnabled = false;
  private bloomEnabled = false;
  private smaaEnabled = false;
  private tiltShiftEnabled = false;
  private horizontalTiltShift: ShaderPass | null = null;
  private verticalTiltShift: ShaderPass | null = null;
  private tiltShiftFocus = 0.48;
  private tiltShiftStrength = 3.4;
  private tiltShiftMode: "classic" | "banded" = "classic";
  private tiltShiftClearBand = 0.14;
  private tiltShiftFarBlurPixels = 13;
  private tiltShiftNearBlurPixels = 19;
  private fallbackReason: string | null = null;
  private disposed = false;

  public constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    options: UltraRenderPipelineOptions = {},
  ) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.maxPixelRatio = finiteAtLeastOne(
      options.maxPixelRatio ?? DEFAULT_MAX_PIXEL_RATIO,
    );
    this.configuredPixelRatio = Number.isFinite(options.pixelRatio)
      ? options.pixelRatio
      : undefined;
    this.onFallback = options.onFallback;

    const rendererSize = renderer.getSize(new THREE.Vector2());
    this.width = positiveInteger(rendererSize.x);
    this.height = positiveInteger(rendererSize.y);
    this.pixelRatio = this.resolvePixelRatio(options.pixelRatio);

    this.createComposer(options);
    this.resize(this.width, this.height, this.pixelRatio);
  }

  /** Renders one frame and permanently drops to direct rendering on failure. */
  public render(deltaSeconds?: number): void {
    if (this.disposed) {
      return;
    }

    if (this.composer !== null) {
      try {
        this.composer.render(deltaSeconds);
        return;
      } catch (reason: unknown) {
        this.fallbackToDirect(reason);
      }
    }

    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Resizes both the canvas and post-processing buffers in logical CSS pixels.
   */
  public resize(
    width: number,
    height: number,
    pixelRatio?: number,
  ): void {
    if (this.disposed) {
      return;
    }

    this.width = positiveInteger(width);
    this.height = positiveInteger(height);
    this.pixelRatio = this.resolvePixelRatio(pixelRatio);

    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(this.width, this.height, false);

    if (this.composer === null) {
      return;
    }

    try {
      this.composer.setPixelRatio(this.pixelRatio);
      this.composer.setSize(this.width, this.height);
      this.syncTiltShiftUniforms();
    } catch (reason: unknown) {
      this.fallbackToDirect(reason);
    }
  }

  public getStatus(): UltraRenderPipelineStatus {
    return {
      mode: this.mode,
      width: this.width,
      height: this.height,
      pixelRatio: this.pixelRatio,
      samples: this.samples,
      gtao: this.gtaoEnabled,
      bloom: this.bloomEnabled,
      smaa: this.smaaEnabled,
      tiltShift: this.tiltShiftEnabled,
      tiltShiftMode: this.tiltShiftMode,
      tiltShiftFocus: this.tiltShiftFocus,
      tiltShiftClearBand: this.tiltShiftClearBand,
      tiltShiftFarBlurPixels: this.tiltShiftFarBlurPixels,
      tiltShiftNearBlurPixels: this.tiltShiftNearBlurPixels,
      fallbackReason: this.fallbackReason,
    };
  }

  public dispose(): void {
    if (this.disposed) {
      return;
    }

    this.disposed = true;
    this.disposeComposer();
  }

  private createComposer(options: UltraRenderPipelineOptions): void {
    if (!supportsHalfFloatTargets(this.renderer)) {
      this.fallbackReason = "Half-float color targets are unavailable.";
      return;
    }

    const requestedSamples = nonNegativeInteger(
      options.samples ?? DEFAULT_MSAA_SAMPLES,
    );
    const supportedSamples = nonNegativeInteger(
      this.renderer.capabilities.maxSamples,
    );
    this.samples =
      supportedSamples >= 2
        ? Math.min(requestedSamples, supportedSamples)
        : 0;
    if (this.samples === 1) {
      this.samples = 0;
    }

    let composer: EffectComposer | null = null;
    let target: THREE.WebGLRenderTarget | null = null;
    const passes: Pass[] = [];

    try {
      target = new THREE.WebGLRenderTarget(1, 1, {
        depthBuffer: true,
        stencilBuffer: false,
        type: THREE.HalfFloatType,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        samples: this.samples,
      });
      target.texture.name = "PC Ultra half-float scene";
      target.texture.colorSpace = THREE.LinearSRGBColorSpace;

      composer = new EffectComposer(this.renderer, target);
      composer.setPixelRatio(this.pixelRatio);
      composer.setSize(this.width, this.height);

      const renderPass = new RenderPass(this.scene, this.camera);
      composer.addPass(renderPass);
      passes.push(renderPass);

      if (options.gtao ?? true) {
        const gtaoPass = new GTAOPass(
          this.scene,
          this.camera,
          this.width * this.pixelRatio,
          this.height * this.pixelRatio,
        );
        gtaoPass.blendIntensity = 0.52;
        gtaoPass.updateGtaoMaterial({
          radius: 0.2,
          thickness: 1,
          distanceFallOff: 1,
          samples: 12,
          screenSpaceRadius: true,
        });
        gtaoPass.updatePdMaterial({
          rings: 2,
          samples: 8,
          radius: 7,
        });
        composer.addPass(gtaoPass);
        passes.push(gtaoPass);
        this.gtaoEnabled = true;
      }

      if (options.tiltShift ?? false) {
        this.tiltShiftMode = options.tiltShiftMode ?? "classic";
        this.tiltShiftFocus = THREE.MathUtils.clamp(
          Number.isFinite(options.tiltShiftFocus)
            ? (options.tiltShiftFocus as number)
            : 0.48,
          0.18,
          0.82,
        );
        this.tiltShiftStrength = THREE.MathUtils.clamp(
          Number.isFinite(options.tiltShiftStrength)
            ? (options.tiltShiftStrength as number)
            : 3.4,
          0.5,
          8,
        );
        this.tiltShiftClearBand = THREE.MathUtils.clamp(
          options.tiltShiftClearBand ?? 0.14,
          0.04,
          0.32,
        );
        this.tiltShiftFarBlurPixels = THREE.MathUtils.clamp(
          options.tiltShiftFarBlurPixels ?? 13,
          2,
          30,
        );
        this.tiltShiftNearBlurPixels = THREE.MathUtils.clamp(
          options.tiltShiftNearBlurPixels ?? 19,
          2,
          36,
        );
        this.horizontalTiltShift = new ShaderPass(
          this.tiltShiftMode === "banded"
            ? BandedTiltShiftShader
            : HorizontalTiltShiftShader,
        );
        this.verticalTiltShift = new ShaderPass(
          this.tiltShiftMode === "banded"
            ? BandedTiltShiftShader
            : VerticalTiltShiftShader,
        );
        this.horizontalTiltShift.material.name =
          "beauty-cell-horizontal-depth-separation";
        this.verticalTiltShift.material.name =
          "beauty-cell-vertical-depth-separation";
        composer.addPass(this.horizontalTiltShift);
        composer.addPass(this.verticalTiltShift);
        passes.push(this.horizontalTiltShift, this.verticalTiltShift);
        this.tiltShiftEnabled = true;
        this.syncTiltShiftUniforms();
      }

      if (options.bloom ?? true) {
        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(
            this.width * this.pixelRatio,
            this.height * this.pixelRatio,
          ),
          0.22,
          0.18,
          1.15,
        );
        composer.addPass(bloomPass);
        passes.push(bloomPass);
        this.bloomEnabled = true;
      }

      if (options.smaa ?? true) {
        const smaaPass = new SMAAPass();
        composer.addPass(smaaPass);
        passes.push(smaaPass);
        this.smaaEnabled = true;
      }

      const outputPass = new OutputPass();
      composer.addPass(outputPass);
      passes.push(outputPass);

      this.composer = composer;
      this.passes = passes;
      this.mode = this.samples > 0 ? "half-float-msaa" : "half-float";
    } catch (reason: unknown) {
      if (composer === null) {
        target?.dispose();
      }
      disposePostProcessing(composer, passes);
      this.resetFeatureStatus();
      this.fallbackReason = describeReason(reason);
      this.onFallback?.(reason);
    }
  }

  private resolvePixelRatio(requested?: number): number {
    const deviceRatio =
      typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;
    const candidate =
      requested ?? this.configuredPixelRatio ?? deviceRatio;
    return THREE.MathUtils.clamp(
      Number.isFinite(candidate) ? candidate : 1,
      1,
      this.maxPixelRatio,
    );
  }

  private fallbackToDirect(reason: unknown): void {
    this.fallbackReason = describeReason(reason);
    this.disposeComposer();
    this.resetFeatureStatus();
    this.renderer.resetState();
    this.renderer.setRenderTarget(null);
    this.onFallback?.(reason);
  }

  private disposeComposer(): void {
    disposePostProcessing(this.composer, this.passes);
    this.composer = null;
    this.passes = [];
    this.horizontalTiltShift = null;
    this.verticalTiltShift = null;
  }

  private resetFeatureStatus(): void {
    this.mode = "direct";
    this.samples = 0;
    this.gtaoEnabled = false;
    this.bloomEnabled = false;
    this.smaaEnabled = false;
    this.tiltShiftEnabled = false;
  }

  private syncTiltShiftUniforms(): void {
    if (
      this.horizontalTiltShift === null ||
      this.verticalTiltShift === null
    ) {
      return;
    }

    const renderWidth = Math.max(1, this.width * this.pixelRatio);
    const renderHeight = Math.max(1, this.height * this.pixelRatio);
    if (this.tiltShiftMode === "banded") {
      for (const [pass, x, y] of [
        [this.horizontalTiltShift, 1, 0],
        [this.verticalTiltShift, 0, 1],
      ] as const) {
        pass.uniforms["direction"]!.value.set(x, y);
        pass.uniforms["resolution"]!.value.set(renderWidth, renderHeight);
        pass.uniforms["focus"]!.value = this.tiltShiftFocus;
        pass.uniforms["clearBand"]!.value = this.tiltShiftClearBand;
        pass.uniforms["farBlur"]!.value = this.tiltShiftFarBlurPixels;
        pass.uniforms["nearBlur"]!.value = this.tiltShiftNearBlurPixels;
      }
      return;
    }
    this.horizontalTiltShift.uniforms["h"]!.value =
      this.tiltShiftStrength / renderWidth;
    this.horizontalTiltShift.uniforms["r"]!.value = this.tiltShiftFocus;
    this.verticalTiltShift.uniforms["v"]!.value =
      this.tiltShiftStrength / renderHeight;
    this.verticalTiltShift.uniforms["r"]!.value = this.tiltShiftFocus;
  }
}

function supportsHalfFloatTargets(renderer: THREE.WebGLRenderer): boolean {
  return (
    renderer.capabilities.isWebGL2 &&
    renderer.extensions.has("EXT_color_buffer_float")
  );
}

function finiteAtLeastOne(value: number): number {
  return Number.isFinite(value) ? Math.max(1, value) : 1;
}

function positiveInteger(value: number): number {
  return Number.isFinite(value) ? Math.max(1, Math.round(value)) : 1;
}

function nonNegativeInteger(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

function describeReason(reason: unknown): string {
  return reason instanceof Error
    ? reason.message
    : "Post-processing initialization or rendering failed.";
}

function disposePostProcessing(
  composer: EffectComposer | null,
  passes: readonly Pass[],
): void {
  for (const pass of passes) {
    try {
      pass.dispose();
    } catch {
      // Disposal must never prevent the direct-render fallback.
    }
  }

  try {
    composer?.dispose();
  } catch {
    // Disposal must never prevent the direct-render fallback.
  }
}
