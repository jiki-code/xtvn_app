import { apiRequest } from "@/helpers/apiRequest";

const reqGetAllUsers = async (params) => {
  const res = await apiRequest("/user", {
    method: "GET",
    queryParams: {
      page: String(params.page),         
      limit: String(params.limit),
    },

  });
  return res;
}


export const reqCreateUser = async (body) => {
  const res = await apiRequest("/user", {
    method: "POST",
    body,
  });
  return res;
};

export const reqUpdateUser = async (id, body) => {
  const res = await apiRequest(`/user/${id}`, {
    method: "PATCH",
    body,
  });
  return res;
};

export const reqResetPassword = async (id, body) => {
  const res = await apiRequest(`/user/password/${id}`, {
    method: "PATCH",
    body,
  });
  return res;
};

export const reqDeleteUser = async (id) => {
  const res = await apiRequest(`/user/${id}`, {
    method: "DELETE",
  });
  return res;
};


export { reqGetAllUsers, reqUpdateUser, reqCreateUser, reqDeleteUser, reqResetPassword }