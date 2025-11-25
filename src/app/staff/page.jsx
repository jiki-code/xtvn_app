"use client";

import { Layout, Typography } from "antd";
import UserList from "@/modules/users/UserList";

const { Content } = Layout;

export default function StaffPage() {
  return (
    <Layout
      style={{
        background: "#ECF0FA",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      <div className="pt-2 pl-5 gap-0">
        <div className="text-2xl text-black">Hi, Admin!</div>
        <div className="text-gray-500 text-sm">Staff</div>
      </div>

      <Content style={{ padding: 16 }}>
        <UserList />
      </Content>
    </Layout>
  );
}
