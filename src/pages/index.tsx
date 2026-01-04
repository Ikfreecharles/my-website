import { useCallback, useRef, type ReactNode } from "react";
import Heading from "@theme/Heading";
import styles from "./index.module.css";
import { Card } from "../components/Card/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, FreeMode } from "swiper/modules";
import PageWrapper from "../components/Layout/layout";
import { blurbs, breakpoints, cards, contacts, jobXp } from "./__data/data";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import useAnimateBackground from "../hooks/useAnimateBackground";
import useAnimateContent from "../hooks/useAnimateContent";
import useAnimateAxis from "../hooks/useAnimateAxis";
import Button from "../components/Button/button";
import { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";

export default function Home(): ReactNode {
  gsap.registerPlugin(ScrambleTextPlugin);
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  const headingWrapper = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const headingDesc = useRef<HTMLDivElement>(null);
  const todo = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const workXpRef = useRef<HTMLElement>(null);
  const extraRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const hoverBlurRef = useRef<HTMLDivElement>(null);

  useAnimateBackground(containerRef, workXpRef, extraRef);
  useAnimateContent(pinRef, timelineRef);
  const [handleMouseMove, handleMouseLeave] = useAnimateAxis({
    headingWrapper,
    title,
    headingDesc,
  });

  const circleRef = useRef<HTMLDivElement>(null);

  function moveCircle(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const rect = circleRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(circleRef.current, {
      x: `${x - 50}px`,
      y: `${y - 50}px`,
      background: `radial-gradient(600px at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      duration: 0.05,
    });
  }

  const handleMouseOver = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      gsap.to(circleRef.current, { scale: 1, autoAlpha: 1, duration: 0.25 });
    },
    [circleRef]
  );

  const handleMouseTravel = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      moveCircle(e);
    },
    [moveCircle, circleRef]
  );

  const handleMouseleave = useCallback(() => {
    gsap.to(circleRef.current, { scale: 0.1, autoAlpha: 0, duration: 0.25 });
  }, [circleRef]);

  const handleDescMouseOver = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      gsap.to(hoverBlurRef.current, { scale: 1, autoAlpha: 1, duration: 0.25 });
    },
    [hoverBlurRef]
  );

  const handleDescMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      const x = e.clientX;
      const y = e.clientY;
      gsap.to(hoverBlurRef.current, {
        x: `${x - 50}px`,
        y: `${y - 50}px`,
        duration: 0.05,
      });
    },
    [hoverBlurRef]
  );

  const handleDescMouseleave = useCallback(() => {
    gsap.to(hoverBlurRef.current, { scale: 0.1, autoAlpha: 0, duration: 0.25 });
  }, [hoverBlurRef]);

  return (
    <div
      ref={containerRef}
      style={{ transition: "background-color 0.3s linear" }}
    >
      <PageWrapper>
        <main className={`container ${styles.main__container}`}>
          <div
            className={styles.heading__wrapper}
            onPointerMove={handleMouseMove}
            onPointerLeave={handleMouseLeave}
            ref={headingWrapper}
          >
            <DotLottieReact
              src="https://lottie.host/d7ca0311-77d4-4289-8d4b-d529712a68b4/rljPsbAsp2.lottie"
              loop
              autoplay
            />

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
                <div ref={todo} className={styles.cubespinner}>
                  {blurbs.map((blurb, idx) => (
                    <em key={idx}>{blurb}</em>
                  ))}
                </div>
              </Heading>
            </div>

            <Button>
              <a
                href="https://www.linkedin.com/in/charles-ikulayo"
                target="_blank"
              >
                Say Hello on LinkedIn
              </a>
            </Button>
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
                {cards.map((cardEl, idx) => {
                  const cardWithIdx = {
                    index: idx,
                    groupLength: cards.length,
                    ...cardEl,
                  };
                  return (
                    <SwiperSlide key={idx}>
                      <Card cardEl={cardWithIdx} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </section>
        </section>
        <section
          className={`${styles.partners__workxp}`}
          ref={workXpRef}
          onMouseOver={handleMouseOver}
          onMouseMove={handleMouseTravel}
          onMouseLeave={handleMouseleave}
        >
          <div className={styles.partner__info__wrapper} ref={pinRef}>
            <div className={styles.social__wrapper}>
              {contacts.map(({ url, logoUrl }, idx) => (
                <Link key={idx} to={url}>
                  <img src={logoUrl} alt={`Visit ${url}`} width={34} />
                </Link>
              ))}
              <div className={styles.base__line}></div>
            </div>
            <div className={styles.partners__xp_info}>
              I have worked in various industries over the past 7 years. From
              IOT to Artifical Intelligent to Insurance. Doesn't matter the
              industry or niche, I am always excited about the adventure that
              lies there.
            </div>
            <div ref={circleRef} className={styles.circle__gradient}></div>

            <div
              className={styles.role__desc}
              // onMouseMove={handleDescMouseMove}
              // onMouseLeave={handleDescMouseleave}
              // onMouseOver={handleDescMouseOver}
            >
              <div ref={hoverBlurRef} className={styles.hover__blur}></div>
              <div>
                {jobXp.map(({ company, role, duration, details, url }, idx) => (
                  <div
                    key={idx}
                    className={`slide ${styles.slides__wrapper}`}
                    style={{ top: `${50 + idx * 4}%` }}
                  >
                    <div className={styles.duration__wrapper}>
                      <p>{duration}</p>
                    </div>
                    <div>
                      <Link to={url} className={styles.role__title__wraper}>
                        <Heading as="h4" className={styles.role__title}>
                          {`${role} - ${company}`}
                        </Heading>
                        <div className={styles.visit__arrow}>
                          <div className={styles.arrows__container}>
                            <img
                              src="/img//up-right-arrow-sec.png"
                              alt={`Visit ${company} website`}
                            />
                            <img
                              src="/img//up-right-arrow-pri.png"
                              alt={`Visit ${company} website`}
                            />
                          </div>
                        </div>
                      </Link>
                      {/* <Heading as="h4">{company}</Heading> */}
                      {details.split(". ").map((detail, idx) => (
                        <p key={idx} className={styles.detail__wrapper}>
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
                <div
                  className={`${styles.timeline__wrapper}`}
                  ref={timelineRef}
                ></div>
                <div className={`${styles.timeline__wrapper}`}></div>
              </div>
            </div>
          </div>
        </section>
        <section ref={extraRef} className={styles.extra__space}></section>
      </PageWrapper>
    </div>
  );
}
