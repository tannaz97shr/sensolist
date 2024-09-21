"use client";

import FlowContent from "@/components/FlowContent";
import Loading from "@/components/UI/Loading";
import { fetchApplet } from "@/lib/features/applet/appletSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { ReactFlowProvider } from "@xyflow/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page({ params }: { params: { slug: string } }) {
  // const [appletDetails, setAppletDetails] = useState<IAppletDetails>();
  // const [loaing, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchApplet(params.slug));
  }, [dispatch, params.slug]);

  const { nodes, connections, loading, error, appletName } = useSelector(
    (state: RootState) => state.appletSlice
  );
  console.log("nnnn", nodes);
  return (
    <div className=" flex flex-row flex-1">
      {loading ? (
        <Loading />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ReactFlowProvider>
          <FlowContent
            nodes={nodes}
            connections={connections}
            appletName={appletName || ""}
            appletId={params.slug}
          />
        </ReactFlowProvider>
      )}
    </div>
  );
}
