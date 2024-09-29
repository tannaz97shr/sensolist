import { useEffect, useState } from "react";

interface EntityTableProps {
  senderIdList?: string;
  name: string;
}

export default function EntityTable({ senderIdList, name }: EntityTableProps) {
  const [widgetData, setWidgetData] = useState<any>();
  const [seconds, setSeconds] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (seconds === 10) {
      const getData = async () => {
        if (senderIdList?.length) {
          setLoading(true);
          // const response = await getWidgetData(senderId, [
          //   "Longitude",
          //   "Latitude",
          // ]);
          setLoading(false);
          // setWidgetData({
          //   lng: response.Longitude?.data[0].payload,
          //   lat: response.Latitude?.data[0].payload,
          // });
        }
      };
      getData();
    } else if (seconds <= 0) {
      setSeconds(10);
      return;
    }

    const interval = setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(interval);
  }, [senderIdList, seconds]);

  return <></>;
}
