// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    // visualizer({
    //   filename: "bundle-report.html",
    //   open: true, // si apre in automatico nel browser
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
  ],
});
