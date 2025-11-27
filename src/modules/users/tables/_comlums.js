import { formatDateTimeStamp } from "@/lib/utils"
export const columnsUser = [

  {
    title: "User Name",
    dataIndex: "name",
    key: "name",
    width: 150,
    align: 'center',
    sorter: (a, b) => a.name.localeCompare(b.name),
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
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 180,
    align: 'center',
    sorter: (a, b) => a.email.localeCompare(b.email),

  },
  {
    title: "Joined Date",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 160,
    align: 'center',
    sorter: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    render: (value) => {
      if (!value) return "-";
      return formatDateTimeStamp(value, true)
    },
  },

   {
    title: "Position",
    dataIndex: "position",
    key: "position",
    width: 120,
    align: 'center',
    sorter: (a, b) => a.position.localeCompare(b.position),

  },

];