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
import {
  blogPosts,
  blurbs,
  breakpoints,
  cards,
  contacts,
  jobXp,
} from "./__data/data";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import useAnimateBackground from "../hooks/useAnimateBackground";
import useAnimateContent from "../hooks/useAnimateContent";
import useAnimateAxis from "../hooks/useAnimateAxis";
import Button from "../components/Button/button";
import Link from "@docusaurus/Link";
import CodeSnippets from "../components/Code-Snippets";
import { LargeCard } from "../components/Large-Card";
import LinkBtn from "../components/LinkButton";
import SmallCard from "../components/Small-Card";
import BlogCard from "../components/Blog-Card";

export default function Home(): ReactNode {
  gsap.registerPlugin(useGSAP);
  const headingWrapper = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const headingDesc = useRef<HTMLDivElement>(null);
  const todo = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const workXpRef = useRef(null);
  const extraRef = useRef(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const hoverBlurRef = useRef<HTMLDivElement>(null);

  const [handleMouseMove, handleMouseLeave] = useAnimateAxis({
    headingWrapper,
    title,
    headingDesc,
  });
  useAnimateContent(pinRef, timelineRef);
  useAnimateBackground(containerRef, workXpRef, extraRef);

  const circleRef = useRef<HTMLDivElement>(null);

  function moveCircle(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const rect = circleRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.context((self) => {
      gsap.to(circleRef.current, {
        background: `radial-gradient(600px at ${x}px ${y}px, rgba(var(--main-bg-color-light-rgb), 0.15), transparent 80%)`,
        duration: 0.05,
      });
    });
  }

  const handleMouseBgOver = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      gsap.to(circleRef.current, { scale: 1, autoAlpha: 1, duration: 0.25 });
    },
    [circleRef]
  );

  const handleMouseBgTravel = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      moveCircle(e);
    },
    [moveCircle, circleRef]
  );

  const handleMouseBgleave = useCallback(() => {
    gsap.context((self) => {
      gsap.to(circleRef.current, { scale: 0.1, autoAlpha: 0, duration: 0.25 });
    });
  }, [circleRef]);

  return (
    <div
      ref={containerRef}
      style={{ transition: "background-color 0.3s linear" }}
    >
      <div ref={circleRef} className={styles.circle__gradient}></div>
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
                <div className={styles.blurb__space}>
                  <em className={styles.blurb__hide}>{blurbs[0]}</em>
                  <div ref={todo} className={styles.cubespinner}>
                    {blurbs.map((blurb, idx) => (
                      <em key={idx}>{blurb}</em>
                    ))}
                  </div>
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
          <div className={styles.social__wrapper}>
            {contacts.map(({ url, logoUrl }, idx) => (
              <Link key={idx} to={url}>
                <img src={logoUrl} alt={`Visit ${url}`} width={34} />
              </Link>
            ))}
            <div className={styles.base__line}></div>
          </div>
        </main>

        <section className={styles.completed__features__section}>
          <div className={styles.features__section}>
            <div className={styles.project__exec}>
              <Heading as="h2" className={styles.h2__heading}>
                /completed_features
              </Heading>
              <Heading as="h3" className={styles.h3__heading}>
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
        <div className={`${styles.partners__workxp}`} ref={workXpRef}>
          <div
            className={styles.partner__info__wrapper}
            ref={pinRef}
            onMouseOver={handleMouseBgOver}
            onMouseMove={handleMouseBgTravel}
            // onMouseLeave={handleMouseBgleave}
          >
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

            <div className={styles.role__desc}>
              <div ref={hoverBlurRef} className={styles.hover__blur}></div>
              <div>
                {jobXp.map((xp, idx) => (
                  <div
                    key={idx}
                    className={`slide ${styles.slides__wrapper}`}
                    style={{ top: `${45 + idx * 2}%` }}
                  >
                    {xp.isSlide ? (
                      <CodeSnippets />
                    ) : (
                      <LargeCard cardEl={{ ...xp, idx: idx }} />
                    )}
                    <div className={styles.work__tech__title}>{xp.tag}</div>
                  </div>
                ))}
                <div
                  className={`${styles.timeline__wrapper}`}
                  ref={timelineRef}
                ></div>
              </div>
            </div>
          </div>
        </div>
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
        <div ref={extraRef} className={styles.extra__space}></div>
=======
>>>>>>> Stashed changes
        <div
          ref={extraRef}
          className={`${styles.container__wrapper} ${styles.extra__space}`}
        >
          <h2 className={styles.philosophy__title}>
            /My working philosophy as a Software Engineer
          </h2>
          <p className={styles.philosophy__body}>
            Understanding the primary concept and fundamentals and not the
<<<<<<< Updated upstream
            tools. Then, migrating to and adopting whatever tool is not only
            efficiently done but also quite easy.
=======
            tools. Now, migrating to and adopting whatever tool becomes
            efficiently done and quite easy.
>>>>>>> Stashed changes
          </p>
          <LinkBtn to={"https://medium.com/@charles-ikulayo"} isExternalLink>
            Explore Blog Overview
          </LinkBtn>
          {/* <div className={styles.divider__}></div> */}
          {/* <div className={styles.blog__section__wrapper}>
            {blogPosts.map((blog, idx) => (
              <div key={idx} className={styles[blog.classname]}>
                <BlogCard cardEl={blog} />
              </div>
            ))}
          </div> */}
          <div className={styles.blog__section__wrapper}>
            <Swiper
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              slidesPerView={1}
              loop={true}
              modules={[FreeMode]}
              breakpoints={breakpoints}
              grabCursor={true}
            >
              {blogPosts.map((blog, idx) => (
                <SwiperSlide key={idx}>
                  <BlogCard cardEl={blog} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* <div className={styles.fundamental__phi}>
            {philosophy.map((card, idx) => (
              <div key={idx}>
                <SmallCard cardEl={card} />
              </div>
            ))}
          </div> */}
        </div>
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
      </PageWrapper>
    </div>
  );
}
