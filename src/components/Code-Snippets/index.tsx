import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { codeSnippets } from "@site/src/pages/__data/data";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

export default function CodeSnippets() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const codeFrameRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const swiperRef = useRef<SwiperRef>(null);

  const setDimensions = useCallback(
    (x: number, y: number, width: number, height: number) => {
      indicatorRef.current.style.transform = `translate(${
        x - sectionRef.current.getBoundingClientRect().x
      }px, ${y - sectionRef.current.getBoundingClientRect().y}px )`;
      indicatorRef.current.style.width = `${width}px`;
      indicatorRef.current.style.height = `${height}px`;
    },
    [indicatorRef, sectionRef]
  );
  const handleTab = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>, idx: number) => {
      setCurrentSlide(idx);
      const { x, y, width, height } = e.currentTarget.getBoundingClientRect();

      setDimensions(x, y, width, height);
    },
    [sectionRef, codeFrameRef]
  );

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const slides = swiperRef.current.swiper.slides;
        const { x, y, width, height } =
          slides[currentSlide].getBoundingClientRect();
        setDimensions(x, y, width, height);
      },
      { once: true }
    );
  }, [swiperRef, setDimensions, currentSlide]);

  useEffect(() => {
    const slides = swiperRef.current.swiper.slides;
    const { x, y, width, height } =
      slides[currentSlide].getBoundingClientRect();

    setDimensions(x, y, width, height);
  }, [setDimensions, swiperRef]);

  return (
    <div className={styles.code__frame} ref={codeFrameRef}>
      <div className={styles.inner__frame}>
        <div className={styles.window__btns}>
          <div className={`${styles.close__btn} ${styles.window__btn}`}></div>
          <div className={`${styles.min__btn} ${styles.window__btn}`}></div>
          <div className={`${styles.max__btn} ${styles.window__btn}`}></div>
        </div>
      </div>
      <section className={styles.swiper__wrapper} ref={sectionRef}>
        <span className={styles.indicator__} ref={indicatorRef}></span>
        <Swiper
          slidesPerView={"auto"}
          className={styles.unique__tabs}
          ref={swiperRef}
        >
          {codeSnippets.map(({ label, logo }, idx) => {
            return (
              <SwiperSlide
                key={idx}
                className={styles.slide__swiper}
                onClick={(e) => handleTab(e, idx)}
                style={{
                  background:
                    idx === currentSlide
                      ? "rgba(var(--theme-color-5-rgb), 0.1)"
                      : "",
                }}
              >
                <div className={styles.label__wrapper}>
                  <img src={logo} alt={logo} width={15} />
                  <span>{label}</span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {codeSnippets.map(({ content }, idx) => (
          <div key={idx} className={styles.img__wrapper}>
            <img
              src={content}
              alt={content}
              style={{
                opacity: idx === currentSlide ? 1 : 0,
                transform:
                  idx === currentSlide ? "translateY(0)" : "translateY(2%)",
              }}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
