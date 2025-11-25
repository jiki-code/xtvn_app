import dayjs from "dayjs";


export const AUTH_ROUTES = ["/auth", "/register", "/404"];

export const roleList = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "leader", label: "Leader" },
  { value: "user", label: "User" },
]

export const departmanList = [
  { value: "SEO", label: "SEO" },
  { value: "DEV", label: "DEV" },
  { value: "SOCIAL", label: "SOCIAL" },
  { value: "SALE", label: "SALE" },
]

export const typeDatePicker = [
  { label: "Today", value: [dayjs(), dayjs()] },
  { label: "Yesterday", value: [dayjs().add(-1, "day"), dayjs().add(-1, "day")] },
  { label: "Last 7 Days", value: [dayjs().add(-6, "day"), dayjs()] },
  { label: "This Month", value: [dayjs().startOf("month"), dayjs().endOf("month")] },
];

export const pageSizeList = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "30", value: 30 },
  { label: "50", value: 50 },
];

export const defaultPolicyHtml = `
  <p><strong>1. Employee Conduct Policies</strong></p>
  <p>One of the types of company policy is Employee conduct policies...</p>
`;

