import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import { FC } from "react";
import styles from "./styles.module.css";
import LinkBtn from "../LinkButton";
import Tag from "../Tag";

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
                <Tag key={idx} text={tag} isTagLight={isTagLight} />
              ))}
            </div>
          </div>
          {/* <div className={styles.icon__wrapper}>
            <img src={icon} alt={icon} width="150" />
          </div> */}
          <div>
            <LinkBtn to={to} isButtonLight={isButtonLight}>
              Full article
            </LinkBtn>
          </div>
        </div>
      </div>
    </article>
  );
};
