"use client";

import { Layout, Menu, Switch, Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { key: "/", icon: <HomeOutlined />, label: <Link href="/">Home</Link> },
  {
    key: "/activity",
    icon: <ThunderboltOutlined />,
    label: <Link href="/activity">Activity</Link>,
  },
  {
    key: "/users",
    icon: <UserOutlined />,
    label: <Link href="/users">Users</Link>,
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
      collapsible
      collapsed={collapsed}
      collapsedWidth={66}
      trigger={null}
      width={200}
      className="sidebar min-h-screen flex flex-col"
    >
      {/* Header logo + toggle */}
      <div className="sidebar-header">
        <span className="sidebar-text truncate">
          {collapsed ? "" : "XTVN"}
        </span>

        <Button type="text" size="small" onClick={onToggleCollapse}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>

      {/* Menu */}
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={items}
        inlineCollapsed={collapsed}
        className={`${isDark ? "menu-dark" : "menu-light"} flex-1`}
      />

      {/* Theme switch */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
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
      </div>
    </Sider>
  );
}
