import fs from "node:fs";
import path from "node:path";
import {defineConfig} from "vitepress";
import llmstxt from "vitepress-plugin-llms";

const SITE_HOSTNAME = "https://about.miwurster.com";
const SITE_TITLE = "Michael Wurster | Principal Software Engineer";
const SITE_DESCRIPTION = "Principal Software Engineer with 15+ years building customer-facing distributed systems. Java, TypeScript, Python, Kubernetes. 20+ research papers.";

const PERSON = {
  "@type": "Person",
  name: "Michael Wurster",
  jobTitle: "Principal Software Engineer",
  worksFor: {"@type": "Organization", name: "Kipu Quantum GmbH", url: "https://kipu-quantum.com"},
  image: "https://www.github.com/miwurster.png",
  url: SITE_HOSTNAME,
  sameAs: ["https://github.com/miwurster", "https://www.linkedin.com/in/miwurster"],
};
const PROFILE_PAGES = ["index.md", "resume.md"];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcExclude: ["AGENTS.md", "CLAUDE.md", "CONTEXT.md", "README.md", "docs/**"],

  title: SITE_TITLE,
  description: SITE_DESCRIPTION,

  cleanUrls: true,
  sitemap: {hostname: SITE_HOSTNAME},

  transformPageData(pageData) {
    const canonicalPath = pageData.relativePath
      .replace(/(^|\/)index\.md$/, "$1")
      .replace(/\.md$/, "");
    const canonicalUrl = `${SITE_HOSTNAME}/${canonicalPath}`;
    const title = pageData.title ? `${pageData.title} | ${SITE_TITLE}` : SITE_TITLE;
    const description = pageData.description || SITE_DESCRIPTION;

    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push(
      ["link", {rel: "canonical", href: canonicalUrl}],
      ["meta", {property: "og:type", content: "profile"}],
      ["meta", {property: "og:title", content: title}],
      ["meta", {property: "og:description", content: description}],
      ["meta", {property: "og:url", content: canonicalUrl}],
      ["meta", {property: "og:image", content: PERSON.image}],
      ["meta", {property: "twitter:card", content: "summary"}],
      ["meta", {property: "twitter:title", content: title}],
      ["meta", {property: "twitter:description", content: description}],
    );

    // vitepress-plugin-llms emits a sibling .md for every non-index page.
    // Advertise it so head-parsing agents can fetch the markdown source.
    if (!pageData.relativePath.endsWith("index.md")) {
      pageData.frontmatter.head.push(
        ["link", {rel: "alternate", type: "text/markdown", href: `/${canonicalPath}.md`}],
      );
    }

    if (PROFILE_PAGES.includes(pageData.relativePath)) {
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: title,
        description,
        url: canonicalUrl,
        inLanguage: "en",
        mainEntity: PERSON,
      };
      pageData.frontmatter.head.push(
        ["script", {type: "application/ld+json"}, JSON.stringify(jsonLd)],
      );
    }
  },

  vite: {
    plugins: [
      llmstxt(),
      // Teach agents reading llms.txt the URL convention for per-page markdown.
      {
        name: "annotate-llms-txt",
        closeBundle: () => {
          const llmsPath = path.resolve(__dirname, "dist/llms.txt");
          if (!fs.existsSync(llmsPath)) return;
          const marker = "the markdown source is available at";
          const contents = fs.readFileSync(llmsPath, "utf-8");
          if (contents.includes(marker)) return;
          const note = `For any page at \`${SITE_HOSTNAME}/<path>\`, ${marker} \`${SITE_HOSTNAME}/<path>.md\`.`;
          const lines = contents.split("\n");
          const descIdx = lines.findIndex(line => line.startsWith("> "));
          if (descIdx === -1) return;
          lines.splice(descIdx + 1, 0, "", note);
          fs.writeFileSync(llmsPath, lines.join("\n"));
        },
      },
      // Publish llms.txt at the /.well-known/ prefix for agents that probe there.
      {
        name: "copy-llms-well-known",
        closeBundle: () => {
          const src = path.resolve(__dirname, "dist/llms.txt");
          if (!fs.existsSync(src)) return;
          const dstDir = path.resolve(__dirname, "dist/.well-known");
          fs.mkdirSync(dstDir, {recursive: true});
          fs.copyFileSync(src, path.join(dstDir, "llms.txt"));
        },
      },
    ],
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: "about.miwurster.com",

    nav: [
      {text: "Home", link: "/"},
      {text: "Resume", link: "/resume"},
      {text: "Publications", link: "/publications"},
    ],

    socialLinks: [
      {icon: "github", link: "https://github.com/miwurster"},
      // {icon: "twitter", link: "https://twitter.com/miwurster"},
      {icon: "linkedin", link: "https://www.linkedin.com/in/miwurster"},
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>',
        },
        link: "mailto:miwurster@gmail.com",
      },
    ],

    footer: {
      // message: 'Released under the MIT License.',
      copyright: 'Copyright © 1983-present | Michael Wurster | Principal Software Engineer'
    },

    // lastUpdated: true,
    externalLinkIcon: true,
  },
});
