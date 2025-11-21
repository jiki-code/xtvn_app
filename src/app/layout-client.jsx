"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AppShell from "@/components/layouts/AppShell";
import {ToastProvider} from "@/components/providers/ToastProvider";
import {AUTH_ROUTES} from "@/data/common"

export default function LayoutClient({ children }) {
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  const isAuth = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  return isAuth ? (
    <>
      {children}
    </>
  ) : (
    <>
      <ToastProvider />
      <AppShell>{children}</AppShell>
    </>
  );
}
