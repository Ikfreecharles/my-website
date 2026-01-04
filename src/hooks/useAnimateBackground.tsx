import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function useAnimateBackground(
  element: React.RefObject<HTMLElement>,
  scrollStartEl: React.RefObject<HTMLElement>,
  scrollEndEl: React.RefObject<HTMLElement>
) {
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      const navbar = document.querySelector(".navbar");
      const ctx = gsap.context((self) => {
        gsap.to([navbar, element.current], {
          color: "var(--white)",
          backgroundColor: "var(--main-bg-color)",
          immediateRender: false,
          scrollTrigger: {
            trigger: scrollStartEl.current,
            start: "top center",
            end: "+=500",
            scrub: true,
          },
        });
      }, scrollStartEl.current);

      const ctxTwo = gsap.context((self) => {
        gsap.to([navbar, element.current], {
          color: "var(--main-bg-color)",
          backgroundColor: "var(--white)",
          immediateRender: false,
          scrollTrigger: {
            trigger: scrollEndEl.current,
            start: "bottom 50%-=150px",
            end: "+=250",
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
