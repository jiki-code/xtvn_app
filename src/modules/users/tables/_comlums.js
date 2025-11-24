import {formatDateTimeStamp} from "@/lib/utils"
export const columnsUser = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "User Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value) => {
      if (!value) return "-";
      return formatDateTimeStamp(value, true)
    },
  },
    {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (value) => {
      if (!value) return "-";
      return formatDateTimeStamp(value, true)
    },
  },
];