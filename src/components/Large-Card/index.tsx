import React, { FC } from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import CustomLink from "../Link";

interface Props {
  role?: string;
  duration?: string;
  url?: string;
  company?: string;
  details?: string;
  isSlide?: boolean;
  tag?: string;
  idx?: number;
}

type ILargeCard = Record<string, Props>;

export const LargeCard: FC<ILargeCard> = ({ cardEl }) => {
  const { duration, url, role, company, details, idx } = cardEl;
  return (
    <>
      <div className={styles.duration__wrapper}>
        <p>{duration}</p>
      </div>
      <div>
        <CustomLink to={url} isLight>
          <div className={styles.role__title__wraper}>
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
          </div>{" "}
        </CustomLink>
        {details.split(". ").map((detail, idx) => (
          <p key={idx} className={styles.detail__wrapper}>
            {detail}
          </p>
        ))}
      </div>
    </>
  );
};
