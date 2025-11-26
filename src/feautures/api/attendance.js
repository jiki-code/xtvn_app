import { apiRequest } from "@/helpers/apiRequest";

const reqGetAllUsersBreakSession = async (params) => {
  const res = await apiRequest("/break-session", {
    method: "GET",
    queryParams: {
      page: String(params.page),         
      limit: String(params.limit),
    },

  });
  return res;
}

const reqGetAllUsersBreakSessionReport = async (params) => {
  const res = await apiRequest("/break-session/report", {
    method: "GET",
    queryParams: {
      page: String(params.page),         
      limit: String(params.limit),
    },

  });
  return res;
}


export const reqCreateUserCheckIn = async (params) => {
  const res = await apiRequest("/attendance/checkin", {
    method: "POST",
    params,
  });
  return res;
};


export const reqCreateUserCheckOut = async (params) => {
  const res = await apiRequest("/attendance/checkout", {
    method: "POST",
    params,
  });
  return res;
};

export const reqCreateUserBreakIn = async (body) => {
  const res = await apiRequest("/attendance/break/start", {
    method: "POST",
    body,
  });
  return res;
};

export const reqCreateUserBreakOut = async (body) => {
  const res = await apiRequest("/attendance/break/end", {
    method: "PATCH",
    body,
  });
  return res;
};


export { reqGetAllUsersBreakSessionReport , reqGetAllUsersBreakSession, reqCreateUserCheckIn, reqCreateUserCheckOut, reqCreateUserBreakIn, reqCreateUserBreakOut }