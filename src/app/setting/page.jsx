"use client";

import { SettingList } from "@/modules/setting/SettingList";
import { Layout } from "antd";

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
        <div className="text-gray-500 text-sm">setting</div>
      </div>

      <Content style={{ padding: 20 }}>
        <SettingList />
      </Content>
    </Layout>
  );
}
