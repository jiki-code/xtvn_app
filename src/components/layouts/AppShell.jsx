"use client";

import { useEffect, useState } from "react";
import { Layout, ConfigProvider, theme as antdTheme } from "antd";
import AppSidebar from "./AppSidebar";
import UnsupportedDevice from "@/components/layouts/UnsupportedDevice";

const { Content } = Layout;

// Hook nhỏ để check desktop hay không
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 1024px)"); // lg breakpoint

    const update = (e) => {
      setIsDesktop(e.matches);
    };

    // set lần đầu
    update(mq);

    // listen thay đổi
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export default function AppShell({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const isDesktop = useIsDesktop();

  // Load từ localStorage lúc đầu
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme");
    const savedCollapsed = localStorage.getItem("sidebar-collapsed");

    if (savedTheme === "dark") setIsDark(true);
    if (savedCollapsed === "true") setCollapsed(true);
  }, []);

  // Lưu + set class dark cho html
  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  // Lưu trạng thái collapsed
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
      }}
    >
      {/* Nếu KHÔNG phải desktop → show Unsupported full page */}
      {!isDesktop ? (
        <UnsupportedDevice />
      ) : (
        <Layout className="min-h-screen">
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
        </Layout>
      )}
    </ConfigProvider>
  );
}
