"use client";

import { usePathname } from "next/navigation";
import AppShell from "@/components/layouts/AppShell";
import {ToastProvider} from "@/components/providers/ToastProvider";
import {AUTH_ROUTES} from "@/data/common"

export default function LayoutClient({ children }) {
  const pathname = usePathname() || "/";

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isAuthRoute) {
    return (
      <>
        <ToastProvider />
        {children}
      </>
    );
  }

  return (
    <>
      <ToastProvider />
      <AppShell>{children}</AppShell>
    </>
  );
}
