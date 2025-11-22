"use client";

import { Layout, Menu, Switch, Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  HomeOutlined,
  ThunderboltOutlined,
  UserOutlined,
  MoonOutlined,
  SunOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const items = [
  { key: "/dashboard", icon: <HomeOutlined />, label: <Link href="/">Home</Link> },
  {
    key: "/activity",
    icon: <ThunderboltOutlined />,
    label: <Link href="/activity">Website</Link>,
  },
  {
    key: "/users",
    icon: <UserOutlined />,
    label: <Link href="/attendances">Attendances</Link>,
  },
  {
    key: "/users",
    icon: <UserOutlined />,
    label: <Link href="/staff">Staff</Link>,
  },
  {
    key: "/users",
    icon: <UserOutlined />,
    label: <Link href="/policies">Company Policies</Link>,
  },
];

export default function AppSidebar({
  isDark,
  onToggleTheme,
  collapsed,
  onToggleCollapse,
}) {
  const pathname = usePathname() || "/";
  const selectedKey = pathname === "/" ? "/" : `/${pathname.split("/")[1]}`;

  return (
    <Sider
      //collapsible
      // collapsed={collapsed}
      collapsedWidth={66}
      trigger={null}
      width={200}
      style={{
        position: "fixed",
        top: 64, // below header
        left: 0,
        height: "calc(100vh - 64px)",
        overflow: "auto",
      }}
      className="sidebar"
    >
      {/* Header logo + toggle */}
      {/* <div className="sidebar-header">
        <span className="sidebar-text truncate">
          {collapsed ? "" : "XTVN"}
        </span>

        <Button type="text" size="small" onClick={onToggleCollapse}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div> */}

      {/* Profile section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", 
          padding: "45px 0",
        }}
      >
        <Image
          src="/icon/avatar.png"
          alt="Language"
          width={80}
          height={80}
          style={{ cursor: "pointer" }}
        />
        <div
          style={{
            color: isDark ? "#fff" : "#ffffff", 
            fontWeight: "bold",
            marginTop: 12, 
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          Mono
        </div>
        <div
          style={{
            color: isDark ? "#fff" : "#ffffff", 
            marginTop: 2, 
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          XD123456
        </div>
      </div>

      {/* Menu */}
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={items}
        inlineCollapsed={collapsed}
        className={`${isDark ? "menu-dark" : "menu-light"} flex-1`}
        theme={isDark ? "dark" : "light"}
      />

      {/* Theme switch */}
      {/* <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Theme
            </span>
          )}
          <div className="theme-switch">
            <Switch
              checked={isDark}
              onChange={onToggleTheme}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
          </div>
        </div>
      </div> */}
    </Sider>
  );
}
