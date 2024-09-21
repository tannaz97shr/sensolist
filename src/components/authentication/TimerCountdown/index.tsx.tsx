import { useEffect, useState } from "react";

interface TimerCountDownProps {
  getOtp: () => Promise<void>;
}

export default function TimerCountDown({ getOtp }: TimerCountDownProps) {
  const [seconds, setSeconds] = useState<number>(120);
  const minutes = Math.floor(seconds / 60);

  const displayTime = `${("0" + minutes).slice(-2)}:${(
    "0" +
    (seconds - minutes * 60)
  ).slice(-2)}`;

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="mt-10 dark:text-white">
      {seconds !== 0 ? (
        displayTime
      ) : (
        <button
          onClick={async (event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            await getOtp();
            setSeconds(120);
          }}
          className=" underline"
        >
          Resend OTP
        </button>
      )}
    </div>
  );
}
