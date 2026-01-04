import React, { useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface Config {
  headingWrapper: React.RefObject<HTMLElement>;
  title: React.RefObject<HTMLElement>;
  headingDesc: React.RefObject<HTMLElement>;
}
type TConfig = Config;

export default function useAnimateAxis(
  config: TConfig
): [(e: React.PointerEvent<HTMLDivElement>) => void, () => void] {
  gsap.registerPlugin(useGSAP);

  const { headingWrapper, title, headingDesc } = config;
  let outerRX: any;
  let outerRY: any;
  let innerX: any;
  let innerY: any;

  useGSAP(
    () => {
      gsap.set(headingWrapper.current, { perspective: 650 });
      outerRX = gsap.quickTo(title.current, "rotationX", { ease: "power3" });
      outerRY = gsap.quickTo(title.current, "rotationY", { ease: "power3" });
      innerX = gsap.quickTo(headingDesc.current, "x", { ease: "power3" });
      innerY = gsap.quickTo(headingDesc.current, "y", { ease: "power3" });
    },
    { dependencies: [headingWrapper, title.current, headingDesc.current] }
  );

  const { contextSafe } = useGSAP({
    dependencies: [outerRX, outerRY, innerX, innerY],
    revertOnUpdate: true,
  });

  const handleMouseMove = useCallback(
    contextSafe((e: React.PointerEvent<HTMLDivElement>) => {
      const { clientX: x, clientY: y } = e;
      outerRX(gsap.utils.interpolate(45, -45, y / window.innerHeight));
      outerRY(gsap.utils.interpolate(-45, 45, x / window.innerWidth));
      innerX(gsap.utils.interpolate(-30, 30, x / window.innerWidth));
      innerY(gsap.utils.interpolate(-30, 30, y / window.innerHeight));
    }),
    [outerRX, outerRY, innerX, innerY]
  );

  const handleMouseLeave = useCallback(
    contextSafe(() => {
      outerRX(0);
      outerRY(0);
      innerX(0);
      innerY(0);
    }),
    [outerRX, outerRY, innerX, innerY]
  );

  return [handleMouseMove, handleMouseLeave];
}
