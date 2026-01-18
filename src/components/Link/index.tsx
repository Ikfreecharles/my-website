import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.css";

export default function CustomLink({
  children,
  to,
  isLight,
}: {
  children: React.ReactNode;
  to: string;
  isLight?: boolean;
}) {
  return (
    <span className={styles.link__}>
      <Link to={to} style={isLight ? { color: "var(--white)" } : {}}>
        {children}
      </Link>
    </span>
  );
}
