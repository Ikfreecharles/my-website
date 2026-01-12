import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Charles Ikulayo - Software Engineer x Solutions Architect",
  tagline:
    "Charles Ikulayo is a seasoned Senior software engineer with 7 years working experience from design to development. Now I'm marching forward into management and architecting as a Solutions Architect to design and develop robust software designs and solutions.",
  favicon: "img/favicon/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://www.charlesikulayo.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Ikfreecharles", // Usually your GitHub org/user name.
  projectName: "my-website", // Usually your repo name.

  onBrokenLinks: "throw",
  trailingSlash: true,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  plugins: [
    [
      "@docusaurus/plugin-pwa",
      {
        debug: true,
        offlineModeActivationStrategies: [
          "appInstalled",
          "standalone",
          "queryString",
        ],
        pwaHead: [
          {
            tagName: "link",
            rel: "icon",
            href: "/img/favicon/favicon-32x32.png",
          },
          {
            tagName: "link",
            rel: "manifest",
            href: "/manifest.json", // your PWA manifest
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "rgb(37, 194, 160)",
          },
          {
            tagName: "meta",
            name: "mobile-web-app-capable",
            content: "yes",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-status-bar-style",
            content: "#000",
          },
          {
            tagName: "link",
            rel: "apple-touch-icon",
            href: "/img/favicon/apple-touch-icon.png",
          },
        ],
      },
    ],
  ],
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://www.charlesikulayo.dev",
      },
    },
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Charles Ikulayo",
        jobTitle: "Senior Software Engineer & Solutions Architect",
        url: "https://www.charlesikulayo.dev",
        sameAs: [
          "https://www.linkedin.com/in/charles-ikulayo",
          "https://github.com/Ikfreecharles",
        ],
        knowsAbout: [
          "Software Engineering",
          "Solutions Architecture",
          "React",
          "TypeScript",
          "AWS",
          "Frontend Development",
          "Full Stack Development",
          "System Design",
          "Scalable Web Applications",
        ],
        email: "charlesikulayo@gmail.com",
        logo: "https://www.charlesikulayo.dev/img/favicon/android-chrome-192x192.png",
        worksFor: [
          {
            "@type": "Organization",
            name: "Tata Consultancy Services",
            description: "Senior Software Engineer",
          },
        ],
        hasOccupation: {
          "@type": "Occupation",
<<<<<<< Updated upstream
          name: "Software Engineer",
=======
          name: "Senior Software Engineer",
>>>>>>> Stashed changes
          occupationLocation: {
            "@type": "Country",
            name: "Germany",
          },
        },
        skills:
          "React, TypeScript, AWS, Python, Node.js, Solutions Architecture",
      }),
    },
  ],
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/IKfreecharles",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  themeConfig: {
    // Replace with your project's social card
    metadata: [
      {
        name: "keywords",
        content: "software, engineering, architect, solutions_architect",
      },
      {
        name: "twitter:card",
        content: "Software_engineer_solutions_architect",
      },
    ],
    image: "img/charles-social-card.png",
    colorMode: {
      disableSwitch: true,
      defaultMode: "light",
      respectPrefersColorScheme: false,
    },
    navbar: {
      logo: {
        alt: "Charles Ikulayo - Software Engineer x Solutions Architect",
        src: "img/favicon/android-chrome-192x192.png",
        target: "_self",
        className: "nav__logo",
      },
      items: [
        {
          type: "html",
          position: "left",
          value:
            '<div class="logo__wrapper"><a href="/" class="logo__href"><div>Charles Ikulayo</div><div>Senior Software Engineer x Architect</div></a></div>',
          className: "navbar__",
        },
        {
          to: "https://charlesikulayo.dev/blog",
          label: "Blog",
          position: "right",
          className: "navbar__",
        },
        {
          href: "https://linkedin.com/in/charles-ikulayo",
          label: "LinkedIn",
          position: "right",
          className: "navbar__",
        },
        {
          href: "https://github.com/Ikfreecharles",
          label: "Github",
          position: "right",
          className: "navbar__",
        },
      ],
    },
    footer: {
      style: "light",
      copyright: `Copyright © ${new Date().getFullYear()} Charles Ikulayo - Software Engineer x Solutions Architect. Built with Docusaurus. <div> Icons made by <a href="https://www.flaticon.com/authors/travisavery" title="TravisAvery"> TravisAvery </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>`,
    },
    prism: {
      theme: prismThemes.nightOwl,
      darkTheme: prismThemes.dracula,
      defaultLanguage: "javascript",
    },
    mermaid: {
      theme: { light: "dark", dark: "forest" },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
