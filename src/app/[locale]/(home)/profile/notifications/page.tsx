import ProfileNotificationsContainer from "@/components/ProfileNotificationsContainer";
import { INotification } from "@/types/general";

export default function Page() {
  const notifications: INotification[] = [
    {
      content:
        "Important Alert: One of your IoT devices is reporting a critical issue. Please log in to your dashboard immediately to view the details and take necessary action to resolve the issue.",
      date: "Sun Jul 07 2024 14:33:59 GMT+0300 (GMT+03:00)",
      new: true,
    },
    {
      content:
        "Important Alert: One of your IoT devices is reporting a critical issue. Please log in to your dashboard immediately to view the details and take necessary action to resolve the issue.",
      date: "Sun Jul 07 2024 14:33:59 GMT+0300 (GMT+03:00)",
      new: false,
    },
    {
      content:
        "Important Alert: One of your IoT devices is reporting a critical issue. Please log in to your dashboard immediately to view the details and take necessary action to resolve the issue.",
      date: "Sun Jul 07 2024 14:33:59 GMT+0300 (GMT+03:00)",
      new: false,
    },
    {
      content:
        "Important Alert: One of your IoT devices is reporting a critical issue. Please log in to your dashboard immediately to view the details and take necessary action to resolve the issue.",
      date: "Sun Jul 07 2024 14:33:59 GMT+0300 (GMT+03:00)",
      new: false,
    },
  ];
  return (
    <div className="p-4 h-full min-h-[calc(100vh-140px)] md:min-h-full flex flex-col">
      <ProfileNotificationsContainer notifications={notifications} />
    </div>
  );
}
