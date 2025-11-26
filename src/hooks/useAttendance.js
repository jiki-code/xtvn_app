import { useState, useEffect } from "react";
import { attendanceService } from "@/services/attendanceService";

export default function useAttendance({ showModal, hideModal, scheduleNextPopup }) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakId, setBreakId] = useState(null);
  const [userId, setUserId] = useState(null);

  // Initialize isCheckedIn from localStorage
  useEffect(() => {
    const checkedIn = localStorage.getItem("checkedIn");
    if (checkedIn === "true") {
      setIsCheckedIn(true);
    }
  }, []);

  const handleCheckIn = () => {
    showModal({
      type: "checkinConfirm",
      title: "Check In",
      onOk: async () => {
        try {
          const res = await attendanceService.checkIn();
          console.log("Check In API Response:", res);

          setIsCheckedIn(true);
          localStorage.setItem("checkedIn", "true");

          showModal({
            type: "checkinSuccess",
            title: "Success",
            onOk: hideModal,
          });

          scheduleNextPopup?.();
        } catch (error) {
          console.error("Check In API Error:", error);
          alert("Failed to check in. Please try again.");
        }
      },
    });
  };

  const handleCheckOut = () => {
    showModal({
      type: "confirmCheckout",
      title: "Checkout",
      onOk: async () => {
        try {
          await attendanceService.checkOut();
          setIsCheckedIn(false);
          localStorage.removeItem("checkedIn");

          showModal({
            type: "checkoutSuccess",
            title: "Success",
            onOk: hideModal,
          });
        } catch (err) {
          console.error(err);
          alert("Failed to check out. Please try again.");
        }
      },
    });
  };

  const handleBreakIn = async (breakType, breakReason) => {
    if (!breakType) return alert("Please select a break type");

    try {
      const res = await attendanceService.breakIn({ breakType, note: breakReason });
      console.log("Break In API Response:", res);

      // Save API returned IDs
      setBreakId(res.data.breakId);
      setUserId(res.data.attendanceDay.user_id);

      // Set break state
      setIsOnBreak(true);

      // Close break selection modal
      hideModal?.();

      // Show break started success modal
      showModal?.({
        type: "breakSuccess",
        title: "Break Started",
        onOk: hideModal,
        extraData: { startTime: new Date() },
      });

    } catch (err) {
      console.error("Break In API Error:", err);
      alert("Failed to start break. Please try again.");
    }
  };

  const handleBreakOut = async () => {
    if (!breakId || !userId) return alert("No active break found");

    try {
      await attendanceService.breakOut({ breakId, userId });

      setIsOnBreak(false);
      setBreakId(null);
      setUserId(null);

      showModal({
        type: "breakEndSuccess",
        title: "Break Ended",
        onOk: hideModal,
      });
    } catch (err) {
      console.error("Break Out API Error:", err);
      alert("Failed to end break. Please try again.");
    }
  };

  return {
    isCheckedIn,
    isOnBreak,
    handleCheckIn,
    handleCheckOut,
    handleBreakIn,
    handleBreakOut,
  };
}
