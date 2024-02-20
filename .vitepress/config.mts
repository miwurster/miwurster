import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Michael Wurster | Software Engineer",
  description: "Software Engineer with 10+ years at tech giants & startups, 20+ research papers. Skilled in Java, TypeScript, Python, and Kubernetes. Loves continuous delivery!",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: "about.miwurster.com",

    nav: [
      { text: "Home", link: "/" },
      // { text: "Resume", link: "/resume" },
      { text: "Research", link: "/research" },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/miwurster" },
      { icon: "twitter", link: "https://twitter.com/miwurster" },
      { icon: "linkedin", link: "https://www.linkedin.com/in/miwurster" },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>',
        },
        link: "mailto:miwurster@gmail.com",
      },
    ],

    externalLinkIcon: true,
  },
});
