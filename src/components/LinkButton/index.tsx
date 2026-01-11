import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode | string;
  to: string;
  isButtonLight?: boolean;
  isExternalLink?: boolean;
}
export default function LinkBtn({
  children,
  to,
  isButtonLight,
  isExternalLink,
}: Props) {
  return (
    <div className={styles.full__article__wrapper}>
      <div className={styles.full__article__container}>
        <Link
          to={to}
          className={`${styles.full__article} ${
            isButtonLight && styles.full__article_light
          } ${isExternalLink && styles.isExternalLink__}`}
          aria-label="button"
          role="button"
        >
          <span>{children}</span>
        </Link>
        <div
          className={`${styles.underline__link} ${
            styles.underline__link__first
          } ${isButtonLight && styles.underline__link_light} `}
        ></div>
        <div
          className={`${styles.underline__link} ${
            styles.underline__link__second
          } ${isButtonLight && styles.underline__link_light} 
          `}
        ></div>
      </div>
    </div>
  );
}
