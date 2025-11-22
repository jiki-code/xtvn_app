"use client";

import { useEffect, useState } from "react";
import { Table, Card, Button, Space, Popconfirm, message, Select } from "antd";
import {
  reqGetAllUsers,
  reqCreateUser,
  reqUpdateUser,
  reqDeleteUser,
  reqResetPassword,
} from "@/feautures/api/users";
import { columnsUser } from "./tables/_comlums";
import UserFormModal from "./components/FormAdd";
import FormResetPassword from "./components/FormResetPassword";

import { toast } from "react-toastify";
import { roleList } from "@/data/common";
const UserList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // current page
  const [pageSize, setPageSize] = useState(10); // page size
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [IdUser, setIdUser] = useState(0);

  const [editingUser, setEditingUser] = useState(null); // null
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchUsers = async (currentPage = 1, currentPageSize = 10) => {
    try {
      setLoading(true);
      const queryParams = {
        page: currentPage,
        limit: currentPageSize,
      };
      const res = await reqGetAllUsers(queryParams);
      const dataRes = res.data || res;
      const users = dataRes.users || dataRes.data?.users || [];
      const pagi = dataRes.pagination || dataRes.data?.pagination || {};

      setData(Array.isArray(users) ? users : []);
      setPagination({
        current: pagi.currentPage || currentPage,
        pageSize: pagi.limit || currentPageSize,
        total: pagi.total || users.length || 0,
      });
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const handleTableChange = (pag) => {
    setPage(pag.current);
    setPageSize(pag.pageSize);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await reqDeleteUser(id);
      message.error("Deleted user");
      fetchUsers(page, pageSize);
    } catch (err) {
      toast.success(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitUser = async (values) => {
    try {
      setSubmitLoading(true);

      values.name = values.username;
      setIsModalOpen(false);
      await reqCreateUser(values);
      toast.success("Added user succesfully");
      fetchUsers(page, pageSize);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleReset = async (value) => {
    const payload = {
      newPassword: value,
    };
    try {
      setSubmitLoading(true);
      await reqResetPassword(IdUser, payload);
      toast.success("Reset password succesfully");
      setIsReset(false);
      fetchUsers(page, pageSize);
      setIdUser(0);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const onReset = (id) => {
    setIsReset(true);
    setIdUser(id);
  };

  const columns = [
    ...columnsUser,
    {
      title: "Role",
      key: "role",
      width: 160,
      render: (_, record) => {
        const handleRoleChange = async (newRole) => {
          try {
            await reqUpdateUser(record.id, { role: newRole });
            toast.success(`User ${record.name} updated to ${newRole}`);
            fetchUsers(page, pageSize);
          } catch (err) {
            console.error(err);
            toast.error("Failed to update role");
          }
        };

        return (
          <Select
            className="w-full border border-white rounded-sm"
            value={record.role}
            onChange={handleRoleChange}
              options={roleList}
          >
          </Select>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 160,
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => onReset(record.id)}
            color="default"
            variant="solid"
          >
            Reset password
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="page-title">User managers</h1>

      <Card
        extra={
          <Button type="primary" onClick={handleAdd}>
            + Add user
          </Button>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={Array.isArray(data) ? data : []}
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
          }}
          onChange={handleTableChange}
        />

        <UserFormModal
          open={isModalOpen}
          centered
          initialValues={editingUser}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
          onSubmit={handleSubmitUser}
          confirmLoading={submitLoading}
        />
        <FormResetPassword
          open={isReset}
          onCancel={() => {
            setIsReset(false);
          }}
          onSubmit={handleReset}
          confirmLoading={submitLoading}
        />
      </Card>
    </div>
  );
};

export default UserList;
