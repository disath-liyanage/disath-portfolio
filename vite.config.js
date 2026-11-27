import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";
import fs from "fs";
import path from "path";
import { routeSeo, SITE_URL } from "./src/seo/routes.js";

function escapeHtmlAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeHtmlText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceMetaContent(html, attrName, attrValue, newContent) {
  const escaped = escapeHtmlAttr(newContent);
  const pattern = new RegExp(
    `(<meta\\s+[^>]*${attrName}=["']${attrValue}["'][^>]*\\scontent=["'])[^"']*(["'][^>]*>)`,
    "i"
  );
  return html.replace(pattern, `$1${escaped}$2`);
}

function buildRouteHtml(baseHtml, seo) {
  let html = baseHtml;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtmlText(seo.title)}</title>`
  );
  html = html.replace(
    /(<link\s+rel=["']canonical["']\s+href=["'])[^"']*(["'][^>]*>)/i,
    `$1${escapeHtmlAttr(seo.url)}$2`
  );

  html = replaceMetaContent(html, "name", "description", seo.description);
  html = replaceMetaContent(html, "property", "og:title", seo.title);
  html = replaceMetaContent(html, "property", "og:description", seo.description);
  html = replaceMetaContent(html, "property", "og:url", seo.url);
  html = replaceMetaContent(html, "property", "og:image", seo.image);
  html = replaceMetaContent(html, "property", "og:image:secure_url", seo.image);
  html = replaceMetaContent(html, "property", "og:image:width", seo.imageWidth);
  html = replaceMetaContent(html, "property", "og:image:height", seo.imageHeight);
  html = replaceMetaContent(html, "property", "og:image:alt", seo.imageAlt);
  html = replaceMetaContent(html, "name", "twitter:title", seo.title);
  html = replaceMetaContent(html, "name", "twitter:description", seo.description);
  html = replaceMetaContent(html, "name", "twitter:image", seo.image);
  html = replaceMetaContent(html, "name", "twitter:image:alt", seo.imageAlt);

  if (seo.jsonLd) {
    html = html.replace(
      /<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i,
      `<script type="application/ld+json">\n      ${JSON.stringify(seo.jsonLd)}\n    </script>`
    );
  }

  if (seo.noscript) {
    html = html.replace(
      /<noscript>[\s\S]*?<\/noscript>/i,
      `<noscript>\n      ${seo.noscript.trim()}\n    </noscript>`
    );
  }

  return html;
}

export default defineConfig({
  plugins: [
    react(),

    {
      name: "generate-route-seo-html",
      closeBundle() {
        const distDir = path.resolve("dist");
        if (!fs.existsSync(distDir)) {
          fs.mkdirSync(distDir);
        }

        const indexPath = path.join(distDir, "index.html");
        if (!fs.existsSync(indexPath)) return;

        const baseHtml = fs.readFileSync(indexPath, "utf8");
        for (const seo of Object.values(routeSeo)) {
          const outPath = path.join(distDir, seo.file);
          fs.mkdirSync(path.dirname(outPath), { recursive: true });
          fs.writeFileSync(outPath, buildRouteHtml(baseHtml, seo), "utf8");
        }
      },
    },

    Sitemap({
      hostname: SITE_URL,
    }),
  ],
});