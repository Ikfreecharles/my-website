import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);
gsap.config({});

export function useAnimateSplitText(headingRef: React.RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    if (!headingRef.current) return;

    let ctx: gsap.Context;
    let split: SplitText;
    let masks: HTMLSpanElement[] = [];

    ctx = gsap.context(() => {
      // Optional smoother (remove if not needed)
      ScrollSmoother.create({
        smooth: 2,
      });

      split = new SplitText(headingRef.current!, {
        type: "lines",
      });
      const makeItHappen = () => {
        masks = [];

        split.lines.forEach((line) => {
          const mask = document.createElement("span");
          mask.className = "mask";

          line.append(mask);
          masks.push(mask);

          gsap.to(mask, {
            scaleX: 0,
            transformOrigin: "right center",
            ease: "none",
            scrollTrigger: {
              trigger: line,
              scrub: true,
              start: "top center",
              end: "bottom center",
            },
          });
        });
      };

      const rebuild = () => {
        ScrollTrigger.getAll().forEach((t, i) => {
          t.kill();
          masks[i].remove();
        });

        split.split({ type: "lines" });
        makeItHappen();
      };

      makeItHappen();
      window.addEventListener("resize", rebuild);

      return () => {
        window.removeEventListener("resize", rebuild);
        ScrollTrigger.getAll().forEach((t) => t.kill());
        masks.forEach((mask) => mask.remove());
        split?.revert();
      };
    }, headingRef);

    return () => ctx.revert();
  }, [headingRef]);
}
