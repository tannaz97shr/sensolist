"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProtectRouteProps {
  children: React.ReactNode;
}

export default function ProtectRoute({ children }: ProtectRouteProps) {
  const { data: session, status } = useSession();
  console.log("session protect", session);
  const router = useRouter();
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    router.push("/authentication/login");
  }
  const expireDate = new Date(session?.expiresOn || "");
  if (Date.now() > expireDate.getTime()) {
    signOut({ redirect: false });
  }
  return <>{children}</>;
}
