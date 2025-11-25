import { formatDateTimeStamp } from "@/lib/utils"
export const columnsAttendance = [
  {
    title: "Date",
    dataIndex: "work_date",
    key: "work_date",
    width: 160,
    align: 'center',
    sorter: (a, b) =>
      new Date(a.work_date).getTime() - new Date(b.work_date).getTime(),
    render: (value) => {
      if (!value) return "-";
      return formatDateTimeStamp(value, true)
    },
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    width: 160,
    align: 'center',
    sorter: (a, b) => a.department.localeCompare(b.department),
  },
  {
    title: "Employee ID",
    dataIndex: "user_id",
    key: "user_id",
    width: 160,
    align: 'center',
    sorter: (a, b) => a.user_id.localeCompare(b.user_id),
  },
  {
    title: "Staff Name",
    dataIndex: "name",
    key: "name",
    width: 160,
    align: 'center',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Check In",
    dataIndex: "check_in",
    key: "check_in",
    width: 160,
    align: 'center',
    sorter: (a, b) =>
      new Date(a.check_in).getTime() - new Date(b.check_in).getTime(),
    render: (value) => {
      if (!value) return "-";
      return formatDateTimeStamp(value, true)
    },
  },
  {
    title: "Break In",
    dataIndex: "check_in",
    key: "check_in",
    width: 180,
    align: 'center',
    sorter: (a, b) => a.check_in.localeCompare(b.check_in),
  },
  {
    title: "Break Out",
    dataIndex: "check_out",
    key: "check_out",
    width: 180,
    align: 'center',
    sorter: (a, b) => a.check_out.localeCompare(b.check_out),
  },
  {
    title: "Check Out",
    dataIndex: "check_out",
    key: "check_out",
    width: 160,
    align: 'center',
    sorter: (a, b) =>
      new Date(a.check_out).getTime() - new Date(b.check_out).getTime(),
    render: (value) => {
      if (!value) return "-";
      return formatDateTimeStamp(value, true)
    },
  },
  {
    title: "Total",
    dataIndex: "total_break_minutes",
    key: "total_break_minutes",
    width: 180,
    align: 'center',
    sorter: (a, b) => a.total_break_minutes.localeCompare(b.total_break_minutes),
  },
  {
    title: "Type",
    dataIndex: "email",
    key: "email",
    width: 180,
    align: 'center',
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: "Employee Note",
    dataIndex: "email",
    key: "email",
    width: 180,
    align: 'center',
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: "Manager Note",
    dataIndex: "email",
    key: "email",
    width: 180,
    align: 'center',
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
];