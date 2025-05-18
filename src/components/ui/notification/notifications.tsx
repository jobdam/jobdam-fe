/** @format */

import { useDispatch, useSelector } from "react-redux";
import { Notification } from "./notification";
import { RootState } from "@/store";
import { dismissNotification } from "@/store/slices/notifications";
import { AppDispatch } from "@/store";

export const Notifications = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleDismiss = (id: string) => {
    dispatch(dismissNotification(id));
  };

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-150 flex flex-col items-end space-y-4 px-4 py-6 sm:items-start sm:p-6"
    >
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={handleDismiss}
        />
      ))}
    </div>
  );
};
