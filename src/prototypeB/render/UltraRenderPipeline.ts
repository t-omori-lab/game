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

const DepthAwareDofShader = {
  name: "DepthAwareDofShader",
  uniforms: {
    tDiffuse: { value: null },
    tDepth: { value: null },
    resolution: { value: new THREE.Vector2(1, 1) },
    focusDepth: { value: 0.5 },
    focusRange: { value: 0.024 },
    blurPixels: { value: 2.35 },
    edgeThreshold: { value: 0.0065 },
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
    uniform sampler2D tDepth;
    uniform vec2 resolution;
    uniform float focusDepth;
    uniform float focusRange;
    uniform float blurPixels;
    uniform float edgeThreshold;
    varying vec2 vUv;

    void main() {
      float centerDepth = texture2D(tDepth, vUv).r;
      float depthDistance = abs(centerDepth - focusDepth);
      float coc = smoothstep(focusRange * 0.42, focusRange, depthDistance);
      coc *= 0.82;
      vec2 radius = (blurPixels * coc) / resolution;

      vec4 sum = texture2D(tDiffuse, vUv) * 1.8;
      float weightSum = 1.8;
      vec2 taps[8];
      taps[0] = vec2(1.0, 0.0);
      taps[1] = vec2(-1.0, 0.0);
      taps[2] = vec2(0.0, 1.0);
      taps[3] = vec2(0.0, -1.0);
      taps[4] = vec2(0.7071, 0.7071);
      taps[5] = vec2(-0.7071, 0.7071);
      taps[6] = vec2(0.7071, -0.7071);
      taps[7] = vec2(-0.7071, -0.7071);

      for (int index = 0; index < 8; index += 1) {
        vec2 sampleUv = clamp(vUv + taps[index] * radius, vec2(0.001), vec2(0.999));
        float sampleDepth = texture2D(tDepth, sampleUv).r;
        float depthDelta = abs(sampleDepth - centerDepth);
        float sameSurface = 1.0 - smoothstep(
          edgeThreshold * 0.38,
          edgeThreshold,
          depthDelta
        );
        float weight = 0.72 * sameSurface;
        sum += texture2D(tDiffuse, sampleUv) * weight;
        weightSum += weight;
      }

      gl_FragColor = sum / max(weightSum, 0.001);
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
  /** Scene-depth bilateral softness. It is mutually exclusive with tilt-shift. */
  readonly depthAwareDof?: boolean;
  readonly depthFocusRange?: number;
  readonly depthBlurPixels?: number;
  readonly depthEdgeThreshold?: number;
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
  readonly depthAwareDof: boolean;
  readonly depthFocus: number;
  readonly depthFocusRange: number;
  readonly depthBlurPixels: number;
  readonly depthEdgeThreshold: number;
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
  private depthAwareDofEnabled = false;
  private depthTarget: THREE.WebGLRenderTarget | null = null;
  private depthMaterial: THREE.MeshDepthMaterial | null = null;
  private depthAwareDofPass: ShaderPass | null = null;
  private depthFocus = 0.5;
  private depthFocusRange = 0.024;
  private depthBlurPixels = 2.35;
  private depthEdgeThreshold = 0.0065;
  private readonly projectedFocus = new THREE.Vector3();
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
        this.renderDepthMap();
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
      this.syncDepthAwareDofUniforms();
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
      depthAwareDof: this.depthAwareDofEnabled,
      depthFocus: this.depthFocus,
      depthFocusRange: this.depthFocusRange,
      depthBlurPixels: this.depthBlurPixels,
      depthEdgeThreshold: this.depthEdgeThreshold,
      fallbackReason: this.fallbackReason,
    };
  }

  /** Keeps the miniature focus plane on a world-space subject. */
  public setDepthFocusPoint(worldPosition: THREE.Vector3): void {
    if (!this.depthAwareDofEnabled) return;
    this.projectedFocus.copy(worldPosition).project(this.camera);
    this.depthFocus = THREE.MathUtils.clamp(
      this.projectedFocus.z * 0.5 + 0.5,
      0,
      1,
    );
    this.syncDepthAwareDofUniforms();
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

      if (options.depthAwareDof ?? false) {
        this.depthFocusRange = THREE.MathUtils.clamp(
          options.depthFocusRange ?? 0.024,
          0.006,
          0.12,
        );
        this.depthBlurPixels = THREE.MathUtils.clamp(
          options.depthBlurPixels ?? 2.35,
          0.5,
          5,
        );
        this.depthEdgeThreshold = THREE.MathUtils.clamp(
          options.depthEdgeThreshold ?? 0.0065,
          0.001,
          0.04,
        );
        this.depthTarget = new THREE.WebGLRenderTarget(1, 1, {
          depthBuffer: true,
          stencilBuffer: false,
          minFilter: THREE.NearestFilter,
          magFilter: THREE.NearestFilter,
          type: THREE.UnsignedByteType,
        });
        this.depthTarget.texture.name = "R07 linear scene depth";
        this.depthMaterial = new THREE.MeshDepthMaterial({
          depthPacking: THREE.BasicDepthPacking,
          blending: THREE.NoBlending,
          side: THREE.DoubleSide,
        });
        this.depthMaterial.name = "R07 bilateral depth prepass";
        this.depthAwareDofPass = new ShaderPass(DepthAwareDofShader);
        this.depthAwareDofPass.material.name = "R07 depth-aware miniature softness";
        this.depthAwareDofPass.uniforms["tDepth"]!.value = this.depthTarget.texture;
        composer.addPass(this.depthAwareDofPass);
        passes.push(this.depthAwareDofPass);
        this.depthAwareDofEnabled = true;
        this.syncDepthAwareDofUniforms();
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
      this.disposeDepthResources();
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
    this.depthAwareDofPass = null;
    this.disposeDepthResources();
  }

  private disposeDepthResources(): void {
    this.depthTarget?.dispose();
    this.depthTarget = null;
    this.depthMaterial?.dispose();
    this.depthMaterial = null;
  }

  private resetFeatureStatus(): void {
    this.mode = "direct";
    this.samples = 0;
    this.gtaoEnabled = false;
    this.bloomEnabled = false;
    this.smaaEnabled = false;
    this.tiltShiftEnabled = false;
    this.depthAwareDofEnabled = false;
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

  private syncDepthAwareDofUniforms(): void {
    if (this.depthAwareDofPass === null || this.depthTarget === null) return;
    const renderWidth = Math.max(1, Math.round(this.width * this.pixelRatio));
    const renderHeight = Math.max(1, Math.round(this.height * this.pixelRatio));
    this.depthTarget.setSize(renderWidth, renderHeight);
    this.depthAwareDofPass.uniforms["resolution"]!.value.set(
      renderWidth,
      renderHeight,
    );
    this.depthAwareDofPass.uniforms["focusDepth"]!.value = this.depthFocus;
    this.depthAwareDofPass.uniforms["focusRange"]!.value = this.depthFocusRange;
    this.depthAwareDofPass.uniforms["blurPixels"]!.value = this.depthBlurPixels;
    this.depthAwareDofPass.uniforms["edgeThreshold"]!.value =
      this.depthEdgeThreshold;
  }

  private renderDepthMap(): void {
    if (
      !this.depthAwareDofEnabled ||
      this.depthTarget === null ||
      this.depthMaterial === null
    ) {
      return;
    }
    const previousTarget = this.renderer.getRenderTarget();
    const previousOverride = this.scene.overrideMaterial;
    const previousBackground = this.scene.background;
    try {
      this.scene.overrideMaterial = this.depthMaterial;
      this.scene.background = null;
      this.renderer.setRenderTarget(this.depthTarget);
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    } finally {
      this.renderer.setRenderTarget(previousTarget);
      this.scene.overrideMaterial = previousOverride;
      this.scene.background = previousBackground;
    }
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
