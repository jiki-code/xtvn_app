"use client";

import { PoliciesPage } from "@/modules/policies/PoliciesPage";
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
        <div className="text-gray-500 text-sm">policies</div>
      </div>

      <Content style={{ padding: 20 }}>
        <PoliciesPage />
      </Content>
    </Layout>
  );
}
