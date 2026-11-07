import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { router } from "./app/routes";
import { isNative } from "./app/native/platform";
import { restoreFromNative } from "./app/native/persistence";
import { applyReminders, listenForReminderTaps } from "./app/native/reminders";
import "./styles/index.css";

async function start() {
  if (isNative) {
    await restoreFromNative();
    const { StatusBar, Style } = await import("@capacitor/status-bar");
    StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
    listenForReminderTaps((route) => router.navigate(route));
    // Re-schedule saved reminders (handles app updates and time zone changes).
    if (localStorage.getItem("daily-brief-reminders-setup")) {
      applyReminders().catch(() => {});
    }
  }

  createRoot(document.getElementById("root")!).render(<App />);

  if (isNative) {
    const { SplashScreen } = await import("@capacitor/splash-screen");
    SplashScreen.hide().catch(() => {});
  }
}

start();
