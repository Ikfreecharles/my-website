import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import { FC } from "react";
import styles from "./styles.module.css";

interface CardElement {
  index: number;
  title: string;
  tags: string[];
  to: string;
  groupLength: number;
  specialClass?: string[];
  isTagLight?: boolean;
  isButtonLight?: boolean;
  icon?: string;
}

type ICard = Record<string, CardElement>;

export const Card: FC<ICard> = ({ cardEl }) => {
  const {
    index,
    title,
    tags,
    to,
    groupLength,
    specialClass,
    isTagLight,
    isButtonLight,
    icon,
  } = cardEl;

  return (
    <article
      className={styles.carousel__slide}
      role="group"
      aria-label={`${index + 1} of ${groupLength}`}
      aria-roledescription="slide"
      id="carousel__slide"
    >
      <div
        className={`${styles.solution__container} ${
          specialClass && specialClass.map((el) => styles[el])
        }`.replace(",", " ")}
      >
        <div className={styles.solution__box}>
          <div>
            <Heading as="h3" className={styles.card__title}>
              {title}
            </Heading>
            <div id={styles.tags}>
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`${styles.tag} ${
                    isTagLight && styles.tag__inverse
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {/* <div className={styles.icon__wrapper}>
            <img src={icon} alt={icon} width="150" />
          </div> */}
          <div>
            <div className={styles.full__article__wrapper}>
              <div className={styles.full__article__container}>
                <Link
                  to={to}
                  className={`${styles.full__article} ${
                    isButtonLight && styles.full__article_light
                  }`}
                  aria-label="button"
                  role="button"
                >
                  <span>Full article</span>
                </Link>
                <div
                  className={`${styles.underline__link} ${
                    styles.underline__link__first
                  } ${isButtonLight && styles.underline__link_light}`}
                ></div>
                <div
                  className={`${styles.underline__link} ${
                    styles.underline__link__second
                  } ${isButtonLight && styles.underline__link_light}`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
