"use client";

import { Card, Layout } from "antd";
import Image from "next/image";
import { SignInCard } from "./SignInCard";

const { Content } = Layout;

export const AuthScreen = () => {
  return (
    <Layout
      style={{ minHeight: "100vh", position: "relative", backgroundColor: "#151345" }}
    >
      {/* Centered SignIn Card */}
      <Content className="flex justify-center items-center w-full h-full z-10 px-4">
        <Card
          style={{
            width: 420,
            borderRadius: 16,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            backgroundColor: "#fff",
          }}
        >
          <SignInCard />
        </Card>
      </Content>
    </Layout>
  );
};
