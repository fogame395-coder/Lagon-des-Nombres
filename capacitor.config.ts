import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.lagondesnombres.app",
  appName: "Lagon des Nombres",
  // Static build output of the web app (npm run build → dist/client).
  webDir: "dist/client",
  android: {
    allowMixedContent: false,
  },
};

export default config;
