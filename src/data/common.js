import dayjs from "dayjs";


export const AUTH_ROUTES = ["/auth", "/register", "/404"];

export const roleList = [
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "leader", label: "Leader" },
    { value: "user", label: "User" },
]

export const departmanList = [
    { value: "seo", label: "Seo" },
    { value: "dev", label: "Dev" },
    { value: "social", label: "Social" },
    { value: "sale", label: "Sale" },
]

export const typeDatePicker = [
  { label: "Today", value: [dayjs(), dayjs()] },
  { label: "Yesterday", value: [dayjs().add(-1, "day"), dayjs().add(-1, "day")] },
  { label: "Last 7 Days", value: [dayjs().add(-6, "day"), dayjs()] },
  { label: "This Month", value: [dayjs().startOf("month"), dayjs().endOf("month")] },
];

