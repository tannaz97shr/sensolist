import DashboardWidgets from "@/components/Widgets";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className=" flex flex-col flex-1 md:px-4">
      <DashboardWidgets dashboardId={params.slug} />
    </div>
  );
}
