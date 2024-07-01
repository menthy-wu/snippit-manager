import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        sidebar: "./src/pages/sidebar.html",
        editor: "./src/pages/editor.html",
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: (assetInfo) => {
          console.log(assetInfo.name);
          if (assetInfo.name?.endsWith(".css")) return "assets/style.css";
          return `assets/[name].js`;
        },
      },
    },
  },
});
