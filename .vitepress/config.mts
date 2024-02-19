import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "miwurster.com",
  description: "Hi there! 👋",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      // { text: "Resume", link: "/resume" },
      // { text: "Research", link: "/research" },
      // { text: "Contact", link: "/contact" },
    ],

    // sidebar: [
    //   {
    //     text: "Examples",
    //     items: [
    //       { text: "Markdown Examples", link: "/markdown-examples" },
    //       { text: "Runtime API Examples", link: "/api-examples" },
    //     ],
    //   },
    // ],

    socialLinks: [
      { icon: "github", link: "https://github.com/miwurster" },
      { icon: "twitter", link: "https://twitter.com/miwurster" },
      { icon: "linkedin", link: "https://www.linkedin.com/in/miwurster" },
    ],
  },
});
