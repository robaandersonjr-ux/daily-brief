import { Capacitor } from "@capacitor/core";

/** True when running inside the iOS or Android app (not the website). */
export const isNative = Capacitor.isNativePlatform();
