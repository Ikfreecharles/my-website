import { type ReactNode } from "react";
import Heading from "@theme/Heading";
import styles from "./index.module.css";
import { Card } from "../components/Card/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, FreeMode } from "swiper/modules";
import { PageWrapper } from "../components/Layout/layout";

export default function Home(): ReactNode {
  const breakpoints = {
    720: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
    1920: {
      slidesPerView: 5,
    },
  };

  return (
    <PageWrapper>
      <>
        <main className={styles.main__container}>
          <div className={styles.heading__wrapperstyles}>
            <Heading as="h1" className={styles.title}>
              Senior Software Engineer and{" "}
              <em id={styles.spec__char}>architect*</em>
            </Heading>
            <Heading as="h2" className={styles.heading__desc}>
              Over the last seven years, I have worked <br />
              with a variety of companies and clients to <br />
              <em id={styles.spec__char} className={styles.todo}>
                build scalable software solutions.
              </em>
            </Heading>
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

const cards = [
  {
    title:
      "Data Rehydration and Persistence across different app environment and instances",
    tags: ["Frontend"],
    to: "/data-rehydration-and-persistence",
    specialClass: ["color__pri"],
    isTagLight: true,
    isButtonLight: true,
  },
  {
    title: "Internal and External dependencies version updates",
    tags: ["Frontend"],
    to: "/dependencies-version-updates",
    specialClass: ["height__75"],
  },
  {
    title: " How did we handle rendering of large dataset on the DOM?",
    tags: ["Frontend", "Machine learning"],
    to: "/rendering-of-large-dataset-on-dom",
    specialClass: ["color__sec"],
  },
  {
    title:
      "Application state management design and architecture for a stateless end to end design",
    tags: ["Frontend", "Enterprise"],
    to: "/state-management-design",
    specialClass: ["height__50", "color__ter"],
    isTagLight: true,
    isButtonLight: true,
  },
  {
    title: "Product and Data Architecture",
    tags: ["Fullstack", "Architecture", "AWS"],
    to: "/product-and-data-architecture",
  },
];
