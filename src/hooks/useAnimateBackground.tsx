import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function useAnimateBackground(
  element: React.RefObject<HTMLElement>, // el that will be styled
  scrollStartEl: React.RefObject<HTMLElement>, // el that triggers the effect and animation
  scrollEndEl: React.RefObject<HTMLElement> // el that ends the effect and animation
) {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  useGSAP(
    () => {
      const navbar = document.querySelector(".navbar");
      const ctx = gsap.context((self) => {
        gsap.to([navbar, element.current], {
          color: "var(--white)",
          backgroundColor: "var(--main-bg-color)",
          immediateRender: true,
          duration: 0.05,
          scrollTrigger: {
            trigger: scrollStartEl.current,
            start: "top center",
            end: "+=150",
            scrub: true,
          },
        });
      }, scrollStartEl.current);

      const ctxTwo = gsap.context((self) => {
        gsap.to([navbar, element.current], {
          color: "var(--main-bg-color)",
          backgroundColor: "var(--white)",
          immediateRender: true,
          scrollTrigger: {
            trigger: scrollEndEl.current,
            start: "bottom 100%-=150px",
            end: "+=200",
            scrub: true,
          },
        });
      }, scrollEndEl.current);
      return () => {
        ctx.revert();
        ctxTwo.revert();
      };
    },
    { dependencies: [element, scrollStartEl, scrollEndEl] }
  );
}
