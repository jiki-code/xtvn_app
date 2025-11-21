"use client";

import { Card, Table, Tag } from "antd";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "active" ? "green" : "red"}>
        {status.toUpperCase()}
      </Tag>
    ),
  },
];

const dataSource = [
  {
    key: "1",
    id: 1,
    name: "Nguyễn Văn A",
    email: "a@example.com",
    status: "active",
  },
  {
    key: "2",
    id: 2,
    name: "Trần Thị B",
    email: "b@example.com",
    status: "inactive",
  },
];

export default function UsersPage() {
  return (
    <div>
      <h1 className="page-title">Users</h1>

      <Card className="app-card">
        <h2 className="app-card-title mb-4">Users list</h2>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </Card>
    </div>
  );
}
