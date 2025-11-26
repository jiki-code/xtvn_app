import {
  reqCreateUserCheckIn,
  reqCreateUserCheckOut,
  reqCreateUserBreakIn,
  reqCreateUserBreakOut
} from "@/feautures/api/attendance";

export const attendanceService = {
  async checkIn() {
    return await reqCreateUserCheckIn();
  },

  async checkOut() {
    return await reqCreateUserCheckOut();
  },

  async breakIn(data) {
    return await reqCreateUserBreakIn(data);
  },

  async breakOut(data) {
    return await reqCreateUserBreakOut(data);
  }
};
