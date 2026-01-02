import React, { FC } from "react";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";

interface Props {
  title: string;
  sections: { heading: string; body: string }[];
}

export const Feature: FC<Props> = ({ title, sections }: Props) => {
  return (
    <main className={styles.main__wrapper}>
      <Heading as="h1" className={styles.article__title}>
        {title}
      </Heading>
      <>
        {sections.map(({ heading, body }, idx) => (
          <article key={idx}>
            <Heading as="h2" className={styles.sub__title}>
              {heading}
            </Heading>
            <p className={styles.article__body}>{body}</p>
          </article>
        ))}
      </>
    </main>
  );
};
