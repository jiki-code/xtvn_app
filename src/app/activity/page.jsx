"use client";

import { Card, List } from "antd";
import { useState } from "react";
const data = [
  "User A vừa đăng nhập",
  "User B tạo mới 1 bài viết",
  "System chạy cron job xong",
];

export default function ActivityPage() {
const [user, setUser] = useState([])

  return (
    <div>
      <h1 className="page-title">Activity</h1>
      <p className="page-subtitle">
        Log activity, v.v.
      </p>

      <Card className="app-card">
        <h2 className="app-card-title mb-4">Recent Activity</h2>
        <List
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Card>
    </div>
  );
}
