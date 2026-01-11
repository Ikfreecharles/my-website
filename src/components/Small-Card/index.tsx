import React from "react";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

interface Props {
  title: string;
  body: string;
}

type ICard = Record<string, Props>;
export default function SmallCard({ cardEl }: ICard) {
  const { title, body } = cardEl;
  return (
    <div>
      <Heading as="h4" className={styles.role__title}>
        {title}
      </Heading>
      <p className={styles.card__body}>{body}</p>
    </div>
  );
}
