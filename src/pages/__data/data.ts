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
  "ship high quality web apps.",
  "implement scalable software solutions.",
  "plan and implement robust designs.",
  "build high performance products.",
];

const jobXp = [
  { isSlide: true, details: "" },
  {
    company: "Tata Consultancy Services",
    role: "Senior Software Engineer",
    duration: "Nov 2022 - current",
    details:
      "Complete migration of a large scale insurance product from Java based GUI to React, implementing test, security features, cross platform integration and compatibility and analytics metrics. Maintenance and improvement of previously developed features and implementation of new features. Collaborating with the product owners to create the product vision, analyze and define requirements, translating business needs into clear technical specs and with testers to implement features on-demand. Incremental improvement of code quality through peer reviews, mentoring, and enforcing clean architecture principles.",
    url: "https://www.tcs.com/",
  },
  {
    company: "Brainbox GmbH (CK Holdings GmbH subs.)",
    role: "Frontend Developer",
    duration: "Dec 2021 - October 2022",
    details:
      "Responsible for building and testing React-based interfaces for three AI-driven products. Worked directly on developing the frontend features and coordinated extensively with the backend team, to ensure seamless integration between the frontend and backend systems. Daily meeting with other stakeholders working on the products and having ideation, brainstorming sessions. Maintained existing features and integrated with new features, APIs on the frontend, frontend design, testing and code improvement.",
    url: "https://www.ck-holding.de/",
  },
  {
    company: "Livello GmbH",
    role: "UI/UX/Frontend developer",
    duration: "September 2021 - December 2021",
    details:
      "Coordinated and collaborated daily with the BE team and other FE engineers to implement new features within the sprints. Modified the design approach, including side by side sittings with team members for hands on implementation of features to improve the design workflow. Maintained existing designs and user interface. Worked closely with the product manager to improve the product based on users' feedback.",
    url: "https://www.livello.com/",
  },
];

const contacts = [
  {
    url: "https://www.github.com/Ikfreecharles",
    logoUrl: "/img/github-logo.png",
  },
  {
    url: "https://www.linkedin.com/in/charles-ikulayo",
    logoUrl: "/img/linkedin-logo.png",
  },
  {
    url: "mailto:charlesikulayo@gmail.com",
    logoUrl: "/img/envelope-simple.png",
  },
  {
    url: "https://www.charlesikulayo.dev",
    logoUrl: "/img/globe-simple.png",
  },
];
const codeSnippets = [
  { label: "React", content: "/img/react-snippet.png", logo: "/img/React.png" },
  {
    label: "Typescript",
    content: "/img/ts-snippet.png",
    logo: "/img/TypeScript.png",
  },
  { label: "Python", content: "/img/py-snippet.png", logo: "/img/Python.png" },
  { label: "IaC", content: "/img/aws-snippet.png", logo: "/img/AWS.png" },
  { label: "CSS", content: "/img/css-snippet.png", logo: "/img/CSS3.png" },
  {
    label: "CI/CD",
    content: "/img/deploy-snippet.png",
    logo: "/img/GitHub-Actions.png",
  },
  {
    label: "Node.js",
    content: "/img/node-snippet.png",
    logo: "/img/Nodejs.png",
  },
  {
    label: "Monitoring",
    content: "/img/grafana-snippet.png",
    logo: "/img/Grafana.png",
  },
];
export { cards, breakpoints, blurbs, jobXp, contacts, codeSnippets };
