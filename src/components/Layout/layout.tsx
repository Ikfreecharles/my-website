import React, { FC, useCallback, useState } from "react";
import styles from "./styles.module.css";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

interface Props {
  children: React.ReactNode;
}
export const PageWrapper: FC<Props> = ({ children }) => {
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
              <a href="mailto:charlesikulayo@gmail.com">
                charlesikulayo@gmail.com
              </a>
            </span>
            <div className={styles.button__container}>
              <div
                className={`${styles.reveal__wrapper} ${
                  isRevealed && styles.reveal__wrapper__isopen
                }`}
              >
                <div className={styles.reveal__btn__container}>
                  <div
                    className={`${styles.reveal__btn} ${
                      isRevealed && styles.reveal__btn__isopen
                    } ${isRevealed && styles.reveal__btn__isright}`}
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
      <div className={styles.about__me}>
        <p>Paragraph about me</p>
      </div>
    </Layout>
  );
};
