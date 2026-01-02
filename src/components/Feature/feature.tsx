import React, { FC } from "react";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";
import CodeBLock from "@theme/CodeBlock";
import Mermaid from "@theme/Mermaid";

interface Props {
  title: string;
  sections: {
    heading: string;
    body: string;
    code?: string;
    diagram?: string;
  }[];
}

export const Feature: FC<Props> = ({ title, sections }: Props) => {
  return (
    <main className={styles.main__wrapper}>
      <Heading as="h1" className={styles.article__title}>
        {title}
      </Heading>
      <>
        {sections.map(({ heading, body, code, diagram }, idx) => (
          <article key={idx}>
            <Heading as="h2" className={styles.sub__title}>
              {heading}
            </Heading>
            <p className={styles.article__body}>
              {body}
              {code && <CodeBLock>{code}</CodeBLock>}
              {diagram && <Mermaid value={diagram} />}
            </p>
          </article>
        ))}
      </>
    </main>
  );
};
