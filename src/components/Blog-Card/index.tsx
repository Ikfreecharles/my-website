import React from "react";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Tag from "../Tag";
import Link from "@docusaurus/Link";

interface Props {
  title: string;
  coverImg: string;
  postedPlatform: string[];
  postUrl: Record<string, string>[];
  categories: string[];
}

type ICard = Record<string, Props>;
export default function BlogCard({ cardEl }: ICard) {
  const { title, coverImg, postUrl, categories } = cardEl;
  return (
    <div className={styles.card__wrapper}>
      <img src={coverImg} alt={title} className={styles.image__} />
      <div className={styles.body__wrapper}>
        <Heading as="h4" className={styles.role__subtitle}>
          {categories.map((category) => (
            <span>{category}</span>
          ))}
        </Heading>
        <Heading as="h5" className={styles.role__title}>
          {title}
        </Heading>
        <div className={styles.sfooter__}>
          {postUrl.map((post, idx) => (
            <Link key={idx} to={post.url}>
              <img
                src={`/img/${post.name}.png`}
                className={styles.platform__icon}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
