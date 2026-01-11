import React from "react";
import styles from "./styles.module.css";

interface Props {
  text: string;
  isTagLight?: boolean;
}
export default function Tag({ text, isTagLight }: Props) {
  return (
    <span className={`${styles.tag} ${isTagLight && styles.tag__inverse}`}>
      {text}
    </span>
  );
}
