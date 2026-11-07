import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.robertandersonux.dailybrief",
  appName: "Daily Brief",
  webDir: "dist",
  backgroundColor: "#0A1831",
  plugins: {
    SplashScreen: {
      launchShowDuration: 800,
      backgroundColor: "#0A1831",
      showSpinner: false,
    },
    LocalNotifications: {
      smallIcon: "ic_stat_daily_brief",
      iconColor: "#5271FF",
    },
  },
};

export default config;
