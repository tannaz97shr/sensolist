"use client";

import { RootState } from "@/lib/store";
import { INotificationAlert } from "@/types/general";
import { TickCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Alert() {
  const { alerts } = useSelector(
    (state: RootState) => state.notificationReducer
  );

  const [alert, setAlert] = useState<INotificationAlert>({
    type: "success",
    message: "",
  });
  const [show, setShow] = useState<boolean>(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(0);
    if (show) {
      if (percent >= 100) return;
      const interval = setInterval(() => {
        setPercent((prev) => prev + 1);
      }, 30);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  useEffect(() => {
    if (alerts.length > 0) {
      setAlert(alerts[alerts.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [alerts]);

  const onClose = () => {
    setShow(false);
  };

  return (
    <div
      className={`fixed transition-all left-8 top-8 z-50
      rounded-lg overflow-hidden flex shadow pl-[42px] 
      ${show ? "ml-0" : " ml-[-480px] "}
      w-[300px] md:w-[440px] min-h-[70px] md:min-h-[90px] ${
        alert.type === "error" ? "bg-error-light" : "bg-bg-success"
      }`}
    >
      <div className="flex flex-row items-center">
        {alert.type === "success" && <TickCircle color="#343434" />}
        <div className="flex flex-col text-neutral-8 ml-2">
          <div className=" text-lg md:text-2xl">
            {alert.type === "error" ? "Error" : "succes"}
          </div>
          <div>{alert.message}</div>
        </div>
      </div>
      <div
        className={`h-[6px] ${
          alert.type === "error" ? "bg-error" : "bg-success"
        } absolute left-0 bottom-0`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
