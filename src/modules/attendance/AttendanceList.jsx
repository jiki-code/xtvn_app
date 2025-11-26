"use client";

import { useState } from "react";
import { Table, Card, Button, Select, Divider, Spin } from "antd";
import { columnsAttendance } from "./tables/_comlums";
import { toast } from "react-toastify";
import { roleList, pageSizeList } from "@/data/common";
import styles from "./style/attendanceList.module.css";
import { cn } from "@/lib/utils";
import { CustomSwitch } from "@/components/ui/CustomSwitch";
import { FormSearch } from "./tables/FormSearch";
import { CustomPagination } from "@/components/ui/CustomPagination";
import { Toolbar } from "./components/ToolBar";
import { RecentBreaksBox } from "./components/RecentBreaksBox";
import { getDataAttendance } from "./tables/getDataAttendance";
import dayjs from "dayjs";
const AttendanceList = () => {
  // --- formSearch ---
  const initialFilters = {
    name: "",
    department: "",
    note: "",
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
    fetchUsersBreakReport,
    filters,
    setFilters,
    loading,
    data,
  } = getDataAttendance(initialFilters);

  const handleTableChange = (pag) => {
    setPage(pag.current);
    setPageSize(pag.pageSize);
  };

  const handleClear = () => {
    setFilters(initialFilters);
    fetchUsersBreakReport(pagination.current, pagination.pageSize);
  };

  const handleSearch = (params) => {
    const { name, department, note, dates } = params || {};
    const [start, end] = dates || [];

    const filtered = data.filter((item) => {
      const matchName =
        !name || item.name.toLowerCase().includes(name.toLowerCase());

      const matchDepartment =
        !department ||
        item.department.toLowerCase() === department.toLowerCase();

      const matchNote =
        !note ||
        (Array.isArray(note)
          ? note.some(
              (n) => n && item.note?.toLowerCase().includes(n.toLowerCase())
            )
          : item.note?.toLowerCase().includes(note.toLowerCase()));

      let matchDate = true;
      if (start && end) {
        const itemDate = dayjs(item.created_at);

        const startDate = dayjs(start).startOf("day");
        const endDate = dayjs(end).endOf("day");

        matchDate =
          itemDate.isSame(startDate, "day") ||
          itemDate.isSame(endDate, "day") ||
          (itemDate.isAfter(startDate) && itemDate.isBefore(endDate));
      }

      return matchName && matchDepartment && matchNote && matchDate;
    });

    setListDataFilter(filtered);
  };

  const handleFormChange = (paramsFromForm) => {
    setFilters(paramsFromForm);
  };

  const columns = [
    ...columnsAttendance,
    {
      title: "View",
      key: "view",
      width: 110,
      align: "center",
      render: () => <p className=" hover:text-blue-500">View</p>,
    },
  ];

  return (
    <div>
      {/* ---- Recent Breaks Card ---- */}
      <Card className={styles.smallCard}>
        <RecentBreaksBox />
      </Card>
      <Card className={styles.card} style={{ marginTop: 16 }}>  
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
                fetchUsersBreakReport(page, pageSize); // gọi API theo page
              }}
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default AttendanceList;