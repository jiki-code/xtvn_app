import { apiRequest } from "@/helpers/apiRequest";

const reqGetAllUsers = async () => {
    const res = await apiRequest("/user", { method: "GET" });
    return res;
}


export { reqGetAllUsers }