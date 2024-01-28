import { useThree, useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  ToneMappingEffect,
  FXAAEffect,
} from "postprocessing";
import { useEffect, useState } from "react";
import { SSGIEffect, VelocityDepthNormalPass } from "./realism-effects/v2";

export function Effects() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const [composer] = useState(
    () => new EffectComposer(gl, { multisampling: 0 })
  );

  useEffect(() => composer.setSize(size.width, size.height), [composer, size]);
  useEffect(() => {
    const config = {
      distance: 1,
      thickness: 3,
      denoiseIterations: 1,
      denoiseKernel: 3,
      denoiseDiffuse: 25,
      denoiseSpecular: 25.54,
      radius: 16,
      phi: 0.1,
      lumaPhi: 25.543,
      depthPhi: 6.522000000000001,
      normalPhi: 40.217,
      roughnessPhi: 28.261,
      specularPhi: 2.771999999999999,
      envBlur: 0.8,
      importanceSampling: true,
      steps: 20,
      refineSteps: 4,
      spp: 1,
      resolutionScale: 1,
      missedRays: false,
    };

    const renderPass = new RenderPass(scene, camera);
    const velocityDepthNormalPass = new VelocityDepthNormalPass(scene, camera);
    composer.addPass(renderPass);
    composer.addPass(velocityDepthNormalPass);
    composer.addPass(
      new EffectPass(
        camera,
        new SSGIEffect(composer, scene, camera, {
          ...config,
          velocityDepthNormalPass,
        })
      )
    );
    composer.addPass(
      new EffectPass(
        camera,
        new BloomEffect({
          mipmapBlur: true,
          luminanceThreshold: 0.1,
          intensity: 0.9,
          levels: 7,
        })
      )
    );
    composer.addPass(
      new EffectPass(camera, new FXAAEffect(), new ToneMappingEffect())
    );

    return () => {
      composer.removeAllPasses();
    };
  }, [composer, camera, scene]);

  useFrame((state, delta) => {
    gl.autoClear = true; // ?
    composer.render(delta);
  }, 1);
}
