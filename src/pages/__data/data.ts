const cards = [
  {
    title:
      "Data Rehydration, consistence and Persistence across different app instances in the portal",
    tags: ["Frontend"],
    to: "/data-rehydration-and-persistence/",
    specialClass: ["color__pri"],
    isTagLight: true,
    isButtonLight: true,
    icon: "https://lottie.host/183ffa1c-be5b-4cde-908c-891118542c4f/5hzG54c3C8.lottie",
  },
  {
    title: "Internal and External dependencies version updates",
    tags: ["Frontend"],
    to: "/dependencies-version-updates/",
    specialClass: ["height__75"],
  },
  {
    title: " How did we handle rendering of large dataset on the DOM?",
    tags: ["Frontend", "Machine learning"],
    to: "/rendering-of-large-dataset-on-dom/",
    specialClass: ["color__sec"],
    icon: "https://lottie.host/0a118817-437c-448b-aedf-abde27630fab/5bPmWu2CIB.lottie",
  },
  {
    title:
      "Application state management design and architecture for a stateless end to end design",
    tags: ["Frontend", "Enterprise"],
    to: "/state-management-design/",
    specialClass: ["height__50", "color__ter"],
    isTagLight: true,
    isButtonLight: true,
  },
  {
    title: "Product and Data Architecture",
    tags: ["Fullstack", "Architecture", "AWS"],
    to: "/product-and-data-architecture/",
    specialClass: ["height__75"],
    icon: "/img/wired-outline.apng",
  },
];

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const breakpoints = {
  720: {
    slidesPerView: 3,
  },
  1100: {
    slidesPerView: 4,
  },
  1920: {
    slidesPerView: 5,
  },
};

const blurbs = [
  "implement robust designs.",
  "high performance products.",
  "build maintainable softwares.",
];

export { cards, breakpoints, blurbs };
