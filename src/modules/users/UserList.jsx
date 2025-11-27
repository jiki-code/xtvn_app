"use client";

import { useState } from "react";
import { Table, Card, Button, Select, Divider, Spin } from "antd";
import {
  reqCreateUser,
  reqUpdateUser,
  reqResetPassword,
} from "@/feautures/api/users";
import { columnsUser } from "./tables/_comlums";
import UserFormModal from "./components/FormAdd";
import FormResetPassword from "./components/FormResetPassword";
import { toast } from "react-toastify";
import { roleList, pageSizeList } from "@/data/common";
import styles from "./style/userList.module.css";
import { cn } from "@/lib/utils";
import { CustomSwitch } from "@/components/ui/CustomSwitch";
import { FormSearch } from "./tables/FormSearch";
import { CustomPagination } from "@/components/ui/CustomPagination";
import { Toolbar } from "./components/ToolBar";
import { getDataUser } from "./tables/getDataUser";
import dayjs from "dayjs";
const UserList = () => {
  // --- formSearch ---
  const initialFilters = {
    name: "",
    department: "",
    role: "",
    dates: [],
  };
  const [page, setPage] = useState(1); // current page
  const [pageSize, setPageSize] = useState(10); // page size

  const [mode, setMode] = useState("filter");
  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [IdUser, setIdUser] = useState(0);

  const [editingUser, setEditingUser] = useState(null); // null
  const [submitLoading, setSubmitLoading] = useState(false);

  const {
    listDataFilter,
    setListDataFilter,
    pagination,
    setPagination,
    fetchUsers,
    filters,
    setFilters,
    loading,
    data,
  } = getDataUser(initialFilters);

  const handleTableChange = (pag) => {
    setPage(pag.current);
    setPageSize(pag.pageSize);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };
  // submit add
  const handleSubmitUser = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
      role: values.role,
      name: values.name,
      status:  values.status,
      department:  values.department,
      position: values.department,
      user_id: values.user_id,
      status: 'active',

    };
    try {
      setSubmitLoading(true);

      setIsModalOpen(false);
      await reqCreateUser(payload);
      toast.success("Added user succesfully");
      fetchUsers(page, pageSize);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleResetPassword = async (value) => {
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

  const onResetPassword = (id) => {
    setIsReset(true);
    setIdUser(id);
  };

  const handleClear = () => {
    setFilters(initialFilters);
    fetchUsers(pagination.current, pagination.pageSize);
  };

  const handleSearch = (params) => {
    const { name, department, role, dates } = params || {};
    const [start, end] = dates || [];

    const filtered = data.filter((item) => {
      const matchName =
        !name || item.name.toLowerCase().includes(name.toLowerCase());

      const matchDepartment =
        !department ||
        item.department.toLowerCase() === department.toLowerCase();

      const matchRole = !role || item.role.toLowerCase() === role.toLowerCase();

      let matchDate = true;
      if (start && end) {
        const itemDate = dayjs(item.createdAt);

        const startDate = dayjs(start).startOf("day");
        const endDate = dayjs(end).endOf("day");

        matchDate =
          itemDate.isSame(startDate, "day") ||
          itemDate.isSame(endDate, "day") ||
          (itemDate.isAfter(startDate) && itemDate.isBefore(endDate));
      }

      return matchName && matchDepartment && matchRole && matchDate;
    });

    setListDataFilter(filtered);
  };

  const handleFormChange = (paramsFromForm) => {
    setFilters(paramsFromForm);
  };

  const columns = [
    ...columnsUser,
    {
      title: "Role",
      key: "role",
      width: 130,
      align: "center",
      render: (_, record) => {
        const handleRoleChange = async (newRole) => {
          try {
            await reqUpdateUser(record.id, { role: newRole });
            toast.success(`User ${record.name} updated to ${newRole}`);
            fetchUsers(page, pageSize);
          } catch (err) {
            toast.error("Failed to update role");
          }
        };

        return (
          <Select
            className={cn("w-full", styles.customSelect)}
            value={record.role}
            onChange={handleRoleChange}
            options={roleList}
          ></Select>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      width: 130,
      align: "center",
      render: (_, record) => {
        const onChangeStatus = async (record) => {
          let newValue = "";
          if (record.status === "active") {
            newValue = "inactive";
          } else {
            newValue = "active";
          }
          try {
            await reqUpdateUser(record.id, { status: newValue });
            toast.success(`User ${record.name} updated to ${newValue}`);
            fetchUsers(page, pageSize);
          } catch (err) {
            toast.error("Failed to update role");
          }
        };
        return (
          <CustomSwitch
            value={record.status}
            onChange={() => onChangeStatus(record)}
          />
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 110,
      align: "center",
      render: (_, record) => (
        <Button
          onClick={() => onResetPassword(record.id)}
          className="text-black! bg-white!  border-gray-300! hover:border-blue-600! "
        >
          Reset password
        </Button>
      ),
    },
    {
      title: "View Deail",
      key: "view",
      width: 110,
      align: "center",
      render: () => <p className=" hover:text-blue-500">View</p>,
    },
  ];

  return (
    <div>
      <Card className={styles.card}>
        {/* form search */}
        <FormSearch onChange={handleFormChange} formSearch={filters} />
        {/* group button */}
        <Toolbar
          mode={mode}
          setMode={setMode}
          pageSize={pagination.pageSize}
          setPageSize={(ps) => setPagination({ ...pagination, pageSize: ps })}
          onFilter={() => handleSearch(filters)}
          onClear={handleClear}
          onAdd={handleAdd}
          pageSizeList={pageSizeList}
        />
        <Divider className="border-t-gray-200/70! border-1.5! my-3!" />
        {/* table */}
        {loading ? (
          <div className="flex justify-center">
            <Spin tip="Loading" size="large"></Spin>
          </div>
        ) : (
          <>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={Array.isArray(listDataFilter) ? listDataFilter : []}
              loading={loading}
              className={styles.customTable}
              pagination={false}
              onChange={handleTableChange}
            />
            <CustomPagination
              pagination={pagination}
              onChange={(page, pageSize) => {
                setPagination((prev) => ({ ...prev, current: page, pageSize }));
                fetchUsers(page, pageSize);
              }}
            />
          </>
        )}
        {/* add modal */}
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
        {/* reset modal */}
        <FormResetPassword
          open={isReset}
          onCancel={() => {
            setIsReset(false);
          }}
          onSubmit={handleResetPassword}
          confirmLoading={submitLoading}
        />
      </Card>
    </div>
  );
};

export default UserList;
