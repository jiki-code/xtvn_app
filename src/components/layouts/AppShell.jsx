"use client";

import { useEffect, useState } from "react";
import { Layout, ConfigProvider, theme as antdTheme } from "antd";
import AppSidebar from "./AppSidebar";
import UnsupportedDevice from "@/components/layouts/UnsupportedDevice";
import "@/styles/app-shell.css";
import Image from "next/image";

const { Content, Header } = Layout;

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
        token: {
          colorBgBase: "#151345",
          colorBgContainer: "#151345",
          colorBgLayout: "#151345",
          colorText: "#ffffff",
        },
      }}
    >
      {/* Nếu KHÔNG phải desktop → show Unsupported full page */}
      {!isDesktop ? (
        <UnsupportedDevice />
      ) : (
        <Layout className="min-h-screen" style={{ minHeight: "100vh" }}>
          <Header
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: 64,
              zIndex: 1000,
              background: "#151345",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            {/* Left: Logo */}
            <div>
              {/* MyLogo */}
              <Image
                src="/icon/logo-1.png"
                alt="Language"
                width={80}
                height={50}
                style={{ cursor: "pointer" }}
              />
            </div>

            {/* Right: Theme toggle + Language + Profile */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Theme toggle switch */}
              {/* <Switch
                checked={isDark}
                onChange={toggleTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
              /> */}
              <Image
                src="/icon/i-1.png"
                alt="Language"
                width={36}
                height={36}
                style={{ cursor: "pointer" }}
              />
              <Image
                src="/icon/i-2.png"
                alt="Profile"
                width={32}
                height={32}
                style={{ borderRadius: "50%", cursor: "pointer" }}
              />
            </div>
          </Header>

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
