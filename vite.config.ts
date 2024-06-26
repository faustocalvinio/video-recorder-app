import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "video-favicon.png"],
      manifest: {
        name: "Video Recorder App",
        short_name: "Video Recorder",
        description: "Video Recorder App with MediaRecorder JavaScript API",
        theme_color: "#ffffff",
        screenshots: [
          {
           "src": "public/app-screenshot.png",
            "sizes": "3538x2092",
            "type": "image/png",
            "form_factor": "wide",
            "label": "Video Recorder"
          }
      ],
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
