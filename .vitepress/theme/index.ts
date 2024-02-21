import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import vitepressBackToTop from "vitepress-plugin-back-to-top";
import "vitepress-plugin-back-to-top/dist/style.css";

console.log("DefaultTheme", DefaultTheme);

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    vitepressBackToTop({
      threshold: 300,
    });
  },
} satisfies Theme;
