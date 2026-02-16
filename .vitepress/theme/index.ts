import type {Theme} from "vitepress";
import DefaultTheme from "vitepress/theme";

import vitepressBackToTop from "vitepress-plugin-back-to-top";
import "vitepress-plugin-back-to-top/dist/style.css";
import "./styles/custom.css";

// @ts-ignore
import ResumeItem from "../components/ResumeItem.vue";
// @ts-ignore
import ResumeSection from "../components/ResumeSection.vue";
// @ts-ignore
import CollapsibleResumeItem from "../components/CollapsibleResumeItem.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({app}) {
    vitepressBackToTop({
      threshold: 300,
    });
    app.component('ResumeItem', ResumeItem)
    app.component('ResumeSection', ResumeSection)
    app.component('CollapsibleResumeItem', CollapsibleResumeItem)
  },
} satisfies Theme;
