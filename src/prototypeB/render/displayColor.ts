import * as THREE from "three";
import {
  DisplayP3ColorSpace,
  DisplayP3ColorSpaceImpl,
} from "three/examples/jsm/math/ColorSpaces.js";

export type DisplayColorConfiguration = {
  readonly gamut: "srgb" | "display-p3";
  readonly toneMapping: "agx";
  readonly exposure: number;
};

const HDR_LOOK_EXPOSURE = 1.18;

type WideGamutContext = WebGL2RenderingContext & {
  drawingBufferColorSpace?: PredefinedColorSpace;
};

function displayReportsP3(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(color-gamut: p3)").matches
  );
}

/**
 * Keeps the scene-referred lighting pipeline identical on every device, then
 * progressively widens only the final display transform when both the screen
 * and WebGL context report Display P3 support. Unsupported browsers remain on
 * the known-good sRGB path rather than interpreting P3 values as sRGB.
 */
export function configureDisplayColor(
  renderer: THREE.WebGLRenderer,
  exposure = HDR_LOOK_EXPOSURE,
): DisplayColorConfiguration {
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = exposure;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  let gamut: DisplayColorConfiguration["gamut"] = "srgb";
  const context = renderer.getContext() as WideGamutContext;

  if (
    displayReportsP3() &&
    "drawingBufferColorSpace" in context
  ) {
    THREE.ColorManagement.define({
      [DisplayP3ColorSpace]: DisplayP3ColorSpaceImpl,
    });

    try {
      renderer.outputColorSpace = DisplayP3ColorSpace;
      if (context.drawingBufferColorSpace === DisplayP3ColorSpace) {
        gamut = "display-p3";
      } else {
        renderer.outputColorSpace = THREE.SRGBColorSpace;
      }
    } catch {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
  }

  renderer.domElement.dataset.outputGamut = gamut;
  renderer.domElement.dataset.toneMapping = "agx";
  renderer.domElement.dataset.toneMappingExposure = exposure.toFixed(2);

  return {
    gamut,
    toneMapping: "agx",
    exposure,
  };
}
