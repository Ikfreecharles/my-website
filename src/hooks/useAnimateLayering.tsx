import React, { useState } from "react";
import { gsap, snap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useAnimateLayering(
  sectionRef: React.RefObject<HTMLDivElement> // el that will trigger the animation
) {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

  const [maxScroll, setmaxScroll] = useState<number>(0);

  useGSAP(() => {
    if (!sectionRef.current) return;

    let ctx: gsap.Context;
    let maxScroll = 0;

    ctx = gsap.context(() => {
      const section = sectionRef.current!;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        pin: true,
        snap: {
          snapTo: (value) => {
            const snapped = gsap.utils.snap(1, value);

            if (snapped <= 0) {
              return 0;
            } else if (snapped >= 1) {
              return 1;
            }
            return snapped;
          },
          inertia: true,
          delay: 0,
          duration: { min: 0, max: 1 },
        },
        pinSpacing: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
}
