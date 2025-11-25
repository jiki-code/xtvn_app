"use client";

import { Layout, Typography } from "antd";
import AttendanceList from "@/modules/attendance/AttendanceList";

const { Content } = Layout;

export default function AttendancePage() {
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

      <Content style={{ padding: 20 }}>
        <AttendanceList />
      </Content>
    </Layout>
  );
}
