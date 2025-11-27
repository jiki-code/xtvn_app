"use client";

import { Layout, Menu, Switch } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { Earth, Calendar1, Users, FileCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const { Sider } = Layout;

const items = [
  {
    key: "/dashboard",
    icon: <HomeOutlined className="h-4 w-4" />,
    label: <Link href="/dashboard">Home</Link>,
  },
  {
    key: "/website",
    icon: <Earth className="h-4 w-4" />,
    label: <Link href="/activity">Website</Link>,
  },
  {
    key: "group",
    label: "Attendances",
    icon: <Calendar1 className="h-4 w-4" />,
    children: [
      { key: "5", label: "Attendance Report" },
      { key: "6", label: "Spot Check" },
      { key: "7", label: <Link href="/attendance">Break Report</Link> },
    ],
  },
  {
    key: "/user2",
    icon: <Users className="h-4 w-4" />,
    label: <Link href="/staff">Staff</Link>,
  },
  {
    key: "/user3",
    icon: <FileCheck className="h-4 w-4" />,
    label: <Link href="/policies">Company Policies</Link>,
  },
  {
    key: "/setting",
    icon: <SettingOutlined />,
    label: <Link href="/setting">Settings</Link>,
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
  const { user } = useAuth();
  return (
    <Sider
      //collapsible
      // collapsed={collapsed}
      collapsedWidth={66}
      trigger={null}
      width={200}
      style={{
        position: "fixed",
        top: 50, // below header
        left: 0,
        height: "calc(100vh - 50px)",
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
          {user?.name}
        </div>
        <div
          style={{
            color: isDark ? "#fff" : "#ffffff",
            marginTop: 2,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {user?.user_id}
        </div>
      </div>
      {/* Menu */}
      <Menu
        defaultSelectedKeys={[selectedKey]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
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
