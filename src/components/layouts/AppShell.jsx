"use client";

import { useEffect, useState } from "react";
import { Layout, ConfigProvider, theme as antdTheme } from "antd";
import AppSidebar from "./AppSidebar";
import UnsupportedDevice from "@/components/layouts/UnsupportedDevice";
import "@/styles/app-shell.css";
import { HeaderApp } from "./HeaderLayout";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { RamdomAttendanceProvider } from "../providers/RamdomAttendanceProvider";
const { Content } = Layout;

export default function AppShell({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme");
    const savedCollapsed = localStorage.getItem("sidebar-collapsed");

    if (savedTheme === "dark") setIsDark(true);
    if (savedCollapsed === "true") setCollapsed(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("sidebar-collapsed", collapsed ? "true" : "false");
  }, [collapsed]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const toggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        token: {
          colorBgBase: "#151345",
          colorBgContainer: "#151345",
          colorBgLayout: "#151345",
          colorText: "#ffffff",
        },
      }}
    >
      {!isDesktop ? (
        <UnsupportedDevice />
      ) : (
        <Layout className="min-h-screen" style={{ minHeight: "100vh" }}>
          <RamdomAttendanceProvider>
          <HeaderApp />
            <AppSidebar
              isDark={isDark}
              onToggleTheme={toggleTheme}
              collapsed={collapsed}
              onToggleCollapse={toggleCollapse}
            />
            <Layout>
              <Content className="page-content">
                <div className="main-shell">{children}</div>
              </Content>
            </Layout>
          </RamdomAttendanceProvider>
        </Layout>
      )}
    </ConfigProvider>
  );
}
