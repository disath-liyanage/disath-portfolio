import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";
import fs from "fs";

export default defineConfig({
  plugins: [
    react(),

    {
      name: "create-dist-folder",
      closeBundle() {
        if (!fs.existsSync("dist")) {
          fs.mkdirSync("dist");
        }
      },
    },

    Sitemap({
      hostname: "https://yourdomain.com",
    }),
  ],
});