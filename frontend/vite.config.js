import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   https: {
  //     key: fs.readFileSync('./.cert/key.pem'),
  //     cert: fs.readFileSync('./.cert/cert.pem'),
  //   },
  // },
  plugins: [
    react(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        "$schema": "https://json.schemastore.org/web-manifest-combined.json",
        short_name: "ChiliLeaves Check!",
        name: "ChiliLeaves Check!",
        start: "/",
        scope: "/",
        orientation: "portrait",
        display: "standalone",
        theme_color: "#fff",
        background_color: "#fff",
      },
    }),
  ],
});
