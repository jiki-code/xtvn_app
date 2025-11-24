"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Card,
  Button,
  Select,
  Divider,
  Space,
  Radio,
} from "antd";
import {
  reqGetAllUsers,
  reqCreateUser,
  reqUpdateUser,
  reqResetPassword,
} from "@/feautures/api/users";
import { columnsUser } from "./tables/_comlums";
import UserFormModal from "./components/FormAdd";
import FormResetPassword from "./components/FormResetPassword";
import { toast } from "react-toastify";
import { roleList } from "@/data/common";
import styles from "./userList.module.css";
import { cn } from "@/lib/utils";
import { CustomSwitch } from "@/components/ui/CustomSwitch";
import { FormSearch } from "./tables/FormSearch";
import { FilterOutlined } from "@ant-design/icons";
import { CustomPagination } from "@/components/ui/CustomPagination";


const UserList = () => {
  // --- formSearch ---
  const initialFilters = {
    name: "",
    department: "",
    role: "",
    dates: [],
  };
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // current page
  const [pageSize, setPageSize] = useState(10); // page size
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("filter");
  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [IdUser, setIdUser] = useState(0);

  const [editingUser, setEditingUser] = useState(null); // null
  const [submitLoading, setSubmitLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  const [listDataFilter, setListDataFilter] = useState([]);

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
      setListDataFilter(users);
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
  // submit add
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

  const handleSearch = (params) => {
    const { name, department, role, dates } = params || {};
    const [start, end] = dates || [];

    const filtered = data.filter((item) => {
      const matchName =
        !name || item.name.toLowerCase().includes(name.toLowerCase());

      const matchDepartment = !department || item.department === department;

      const matchRole = !role || item.role === role;

      let matchDate = true;
      if (start && end) {
        const itemDate = dayjs(item.createdAt); 
        matchDate =
          itemDate.isSame(start, "day") ||
          itemDate.isSame(end, "day") ||
          (itemDate.isAfter(start, "day") && itemDate.isBefore(end, "day"));
      }

      return matchName && matchDepartment && matchRole && matchDate;
    });

    setListDataFilter(filtered);
  };

  const handleFormChange = (paramsFromForm) => {
    setFilters(paramsFromForm);
  };

  const onReset = () => {
    setFilters(initialFilters);
    fetchUsers(page, pageSize);
    setMode("clear");
  };

  const handleModeChange = (e) => {
    const value = e.target.value;

    setMode(value);

    if (value === "clear") {
      onReset();
    }
    if (value === "filter") {
      handleSearch(filters);
    }
  };

  const columns = [
    ...columnsUser,
    {
      title: "Position",
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
            newValue = "off";
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
          className="text-black! bg-white!"
        >
          Reset password
        </Button>
      ),
    },
    {
      title: "View Deail",
      key: "view",
      width: 90,
      align: "center",
      render: (_, record) => <p>View</p>,
    },
  ];

  return (
    <div>
      <Card className={styles.card}>
        {/* form search */}
        <FormSearch onChange={handleFormChange} formSearch={filters} />
        {/* group button */}

        <div className="flex justify-between px-2">
          <Button className={styles.createBtn} onClick={handleAdd}>
            Create New Staff
          </Button>
          <Space>
            <Radio.Group
              onChange={handleModeChange}
              value={mode}
              style={{ display: "flex" }}
            >
              <Radio.Button value="filter" className={styles.baseButtonFilter}>
                <FilterOutlined className="mr-1" />
                Filter
              </Radio.Button>

              <Radio.Button
                onChange={onReset}
                className={styles.baseButtonClear}
                value="clear"
              >
                Clear
              </Radio.Button>
            </Radio.Group>
          </Space>
        </div>
        <Divider></Divider>
        {/* table */}
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
            fetchUsers(page, pageSize); // gọi API theo page
          }}
        />

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
