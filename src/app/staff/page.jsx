"use client";

import { Layout, Typography, Breadcrumb, Card } from "antd";
import UserList from "@/modules/users/UserList";

const { Content } = Layout;
const { Title } = Typography;

export default function StaffPage() {
  return (
    <Layout
        style={{
          background: "#ECF0FA",
          borderRadius: 5,               
          overflow: "hidden",  
        }}
      >
        <Breadcrumb
          items={[
            { title: "Home", href: "/" },
            { title: "Staff" },
          ]}
          itemRender={(item, params, items) => {
            const isLast = items.indexOf(item) === items.length - 1; 
            return (
              <span style={{ fontWeight: isLast ? "bold" : "normal", color: isLast ? "#000000" : "#000000", }}>
                {item.title}
              </span>
            );
          }}
          style={{ margin: 24, fontSize: 16 }}
        />


        <Content style={{ padding: 24 }}>
          <Title level={2} style={{ marginBottom: 16, color: "#000000", fontWeight: 700}}>
            Staff Management
          </Title>
          <UserList />
        </Content>
      </Layout>
  );
}
