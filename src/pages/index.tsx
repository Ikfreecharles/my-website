import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Heading from "@theme/Heading";
import styles from "./index.module.css";
import { Card } from "../components/Card/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, FreeMode } from "swiper/modules";
import PageWrapper from "../components/Layout/layout";
import { blurbs, breakpoints, cards } from "./__data/data";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

export default function Home(): ReactNode {
  gsap.registerPlugin(ScrambleTextPlugin);
  gsap.registerPlugin(useGSAP);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const headingWrapper = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const headingDesc = useRef<HTMLDivElement>(null);
  const todo = useRef<HTMLDivElement>(null);
  let outerRX: any;
  let outerRY: any;
  let innerX: any;
  let innerY: any;

  useEffect(() => {
    gsap.set(headingWrapper.current, { perspective: 650 });
    outerRX = gsap.quickTo(title.current, "rotationX", { ease: "power3" });
    outerRY = gsap.quickTo(title.current, "rotationY", { ease: "power3" });
    innerX = gsap.quickTo(headingDesc.current, "x", { ease: "power3" });
    innerY = gsap.quickTo(headingDesc.current, "y", { ease: "power3" });
  }, [headingWrapper, title.current, headingDesc.current]);

  useGSAP(
    () => {
      const startScramble = setInterval(() => {
        setCurrentIdx(() => (currentIdx + 1) % blurbs.length);
        gsap.to(todo.current, {
          scrambleText: {
            text: blurbs[currentIdx],
            chars: "upperAndLowerCase",
            revealDelay: 0.1,
            tweenLength: true,
            newClass: currentIdx === 2 ? "border" : "",
          },
          ease: "power2.inOut",
          overwrite: "auto",
          duration: 2,
        });
      }, 5000);
      return () => {
        clearInterval(startScramble);
      };
    },
    { dependencies: [currentIdx, todo.current, blurbs] }
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

  return (
    <PageWrapper>
      <>
        <main className={styles.main__container}>
          <div
            className={styles.heading__wrapper}
            onPointerMove={handleMouseMove}
            onPointerLeave={handleMouseLeave}
            ref={headingWrapper}
          >
            <div>
              <Heading as="h1" className={styles.title} ref={title}>
                Senior Software Engineer and{" "}
                <em id={styles.spec__char}>architect*</em>
              </Heading>
              <Heading
                as="h2"
                className={styles.heading__desc}
                ref={headingDesc}
              >
                Over the last seven years, I have worked <br />
                with a variety of companies and clients to <br />
                <em ref={todo}>build scalable software solutions.</em>
              </Heading>
            </div>
            <button className="btn button">
              <a
                href="https://www.linkedin.com/in/charles-ikulayo"
                target="_blank"
              >
                Say Hello on LinkedIn
              </a>
            </button>
          </div>
        </main>
        <section className={styles.completed__features__section}>
          <div className={styles.features__section}>
            <div className={styles.project__exec}>
              <Heading as="h2">/completed_features</Heading>
              <Heading as="h3">
                Modularity as a philosophy in programming, code implementation,
                workflow execution at all level.
              </Heading>
              <p>
                For over seven years, I've been collaborating on projects
                ranging from design to development working with global companies
                and startups on new ventures and prototypes. Across all of
                these, my philosophy of modularity has remained the same for
                both projects and workflow. Taking it one feature at a time and
                ensuring they are testable independently.
              </p>
            </div>
          </div>
          <section
            role="group"
            aria-label="List of business requirements and how they were solved"
            aria-roledescription="carousel"
            id="multiCarousel"
          >
            <div aria-atomic="false" aria-live="off" id="carouselInner">
              <Swiper
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                slidesPerView={1}
                modules={[Autoplay, FreeMode]}
                breakpoints={breakpoints}
                grabCursor={true}
              >
                {cards.map(
                  (
                    {
                      title,
                      tags,
                      to,
                      specialClass,
                      isTagLight,
                      isButtonLight,
                    },
                    idx
                  ) => (
                    <SwiperSlide>
                      <Card
                        key={idx}
                        index={idx}
                        title={title}
                        tags={tags}
                        to={to}
                        groupLength={cards.length}
                        specialClass={specialClass}
                        isTagLight={isTagLight}
                        isButtonLight={isButtonLight}
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          </section>
        </section>
        {/* <section className={styles.partners__workxp}></section> */}
      </>
    </PageWrapper>
  );
}
