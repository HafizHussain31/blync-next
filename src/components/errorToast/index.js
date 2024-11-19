import { NotificationManager } from "react-notifications";

export const ErrorToast = (message) => {
  NotificationManager["error"](message, "", 4000);
};