import React, { FC, useCallback, useState } from "react";
import styles from "./styles.module.css";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";

interface Props {
  children: React.ReactNode;
}
export default function PageWrapper({ children }: Props) {
  const { siteConfig } = useDocusaurusContext();
  const { title, tagline } = siteConfig;
  const [isRevealed, setIsRevealed] = useState(false);

  const handleRevealBtn = useCallback(() => {
    setIsRevealed((isRevealed) => !isRevealed);
  }, []);

  return (
    <Layout title={title} description={tagline}>
      <>{children}</>
      <div className={styles.footer__inner}>
        <div className={styles.reveal__outer}>
          <div
            className={`${styles.reveal__inner} ${
              isRevealed && styles.reveal__inner__isopen
            }`}
          >
            <span
              className={`${styles.contact__email} ${
                isRevealed && styles.contact__email__isopen
              }`}
            >
              <Link href="mailto:charlesikulayo@gmail.com">
                charlesikulayo@gmail.com
              </Link>
            </span>
            <div className={styles.button__container}>
              <div
                className={`${styles.reveal__wrapper} ${
                  isRevealed && styles.reveal__wrapper__isopen
                }`}
              >
                <div
                  className={`${styles.reveal__btn__container} ${
                    isRevealed && styles.reveal__btn__container__isright
                  }`}
                >
                  <div
                    className={`${styles.reveal__btn} ${
                      isRevealed && styles.reveal__btn__isopen
                    }`}
                    onClick={handleRevealBtn}
                  ></div>
                  <p
                    className={`${styles.email__address} ${
                      isRevealed && styles.email__address__isopen
                    }`}
                  >
                    Reveal <br />
                    email address
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.about__me__wrapper}>
        <div className={styles.about__me}>
          <p className={styles.about__}>
            Since 2017, I have been working with brands and businesses to build
            identities that stand out. I started out as a UI/UX designer and
            worked in the space for 3 years. Every project was intentional and
            unique and build with purpose. It was vision over volume for me. And
            starting from this "base" was the perfect{" "}
            <em> "start of journey"</em> for me. As it gave me a solid
            foundation to later become a proficient Frontend Developer before
            making one more transition into Software Engineering.
          </p>
          <p className={styles.about__}>
            In 2021, I transition into Frontend Development because I already
            saw all there was to see for me in UI/UX. And since then, I have
            worked with various companies in various industries from iot to AI
            to Insurance.
          </p>
        </div>
      </div>
    </Layout>
  );
}
