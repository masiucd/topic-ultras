import type {Config} from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // Prerender pages SSG static site generation
  async prerender() {
    return ["/", "/about"];
  },
} satisfies Config;
