import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { isNative } from "./platform";

/** Haptic feedback. Does nothing on the website. */
export const haptic = {
  tap() {
    if (isNative) Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
  },
  success() {
    if (isNative) Haptics.notification({ type: NotificationType.Success }).catch(() => {});
  },
};
