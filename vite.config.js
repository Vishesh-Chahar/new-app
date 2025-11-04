import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// replace `your-repo-name` below with your GitHub repo name
export default defineConfig({
  base: "/new-app/",
  plugins: [react()],
});
