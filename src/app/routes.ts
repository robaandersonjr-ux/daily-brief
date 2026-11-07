import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { TitlePage } from "./components/TitlePage";
import { Dashboard } from "./components/Dashboard";
import { MorningIntentions } from "./components/MorningIntentions";
import { MiddayCheckIn } from "./components/MiddayCheckIn";
import { EveningReflection } from "./components/EveningReflection";
import { History } from "./components/History";
import { LogoPreview } from "./components/LogoPreview";
import { Progression } from "./components/Progression";
import { Reminders } from "./components/Reminders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: TitlePage,
  },
  {
    Component: Layout,
    children: [
      { path: "/dashboard", Component: Dashboard },
      { path: "/intentions", Component: MorningIntentions },
      { path: "/checkin", Component: MiddayCheckIn },
      { path: "/progression", Component: Progression },
      { path: "/reflection", Component: EveningReflection },
      { path: "/history", Component: History },
      { path: "/reminders", Component: Reminders },
    ],
  },
  {
    path: "/logo",
    Component: LogoPreview,
  },
]);