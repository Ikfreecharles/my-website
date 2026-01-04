import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function useAnimateContent(
  triggerEl: React.RefObject<HTMLElement>,
  timelineEl: React.RefObject<HTMLElement>
) {
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      const slides: any = gsap.utils.toArray(".slide");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl.current,
          start: "top top",
          end: "+=" + slides.length * 25 + "%",
          pin: true,
          scrub: true,
        },
      });

      // First element visible, set the marker
      timelineEl.current &&
        gsap.set(timelineEl.current, {
          scaleY: 1 / slides.length,
          transformOrigin: "top left",
        });

      slides.forEach((item: any, i) => {
        const previousItem: any = slides[i - 1];
        if (previousItem) {
          tl.set(item, {}, 2 * i)
            .to(
              slides[i],
              {
                autoAlpha: 1,
                duration: 3,
              },
              "<"
            )
            .set(previousItem, {}, "<")
            .to(
              slides[i - 1],
              {
                autoAlpha: 0,
                duration: 2,
                top: "30%",
              },
              "<"
            );
        } else {
          gsap.set(item, {});
          gsap.set(slides[i], { autoAlpha: 1 });
        }
      });
      tl.to(
        timelineEl.current,
        {
          scaleY: 1,
          transformOrigin: "top left",
          ease: "none",
          duration: tl.duration(),
        },
        0
      ).to({}, {});
    },
    { dependencies: [triggerEl, timelineEl] }
  );
}
