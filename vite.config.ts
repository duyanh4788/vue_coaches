import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

const aliases = [
  { find: "src", replacement: "src" },
  { find: "assets", replacement: "src/assets" },
  { find: "utils", replacement: "src/utils" },
  { find: "common", replacement: "src/common" },
  { find: "styles", replacement: "src/styles" },
  { find: "components", replacement: "src/components" },
  { find: "pages", replacement: "src/pages" },
  { find: "routers", replacement: "src/routers" },
  { find: "stores", replacement: "src/stores" },
  { find: "services", replacement: "src/services" },
];

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 4000,
  },
  resolve: {
    alias: aliases.map((alias) => ({
      ...alias,
      replacement: path.resolve(__dirname, alias.replacement),
    })),
  },
});
