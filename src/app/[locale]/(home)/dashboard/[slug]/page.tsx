import DashboardWidgets from "@/components/Widgets";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className=" flex flex-col flex-1 md:px-4">
      <DashboardWidgets dashboardId={params.slug} />
    </div>
  );
}
