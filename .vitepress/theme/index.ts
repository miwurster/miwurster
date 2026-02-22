import type {Theme} from "vitepress";
import DefaultTheme from "vitepress/theme";

import vitepressBackToTop from "vitepress-plugin-back-to-top";
import "vitepress-plugin-back-to-top/dist/style.css";
import "./styles/custom.css";

// @ts-ignore
import ResumeItem from "../components/ResumeItem.vue";
// @ts-ignore
import CollapsibleResumeItem from "../components/CollapsibleResumeItem.vue";
// @ts-ignore
import Skills from "../components/Skills.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({app}) {
    vitepressBackToTop({
      threshold: 300,
    });
    app.component('ResumeItem', ResumeItem)
    app.component('CollapsibleResumeItem', CollapsibleResumeItem)
    app.component('Skills', Skills)
  },
} satisfies Theme;
