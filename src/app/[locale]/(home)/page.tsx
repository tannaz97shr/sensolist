"use client";

import HomeMyThings from "@/components/HomeMythings";
import HomePinnedAppletes from "@/components/HomePinnedApplets";
import HomePinnedDashboardes from "@/components/HomePinnedDashboards";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  // const router = useRouter();
  // if (!session) {
  //   router.push("authentication/login");
  // }
  return (
    <main className="flex flex-1">
      <div className="flex flex-col px-4 gap-4 flex-1 max-w-[1000px] mx-auto w-full">
        <HomeMyThings />
        <HomePinnedDashboardes />
        <HomePinnedAppletes />
      </div>
    </main>
  );
}
