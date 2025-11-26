"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Button, Modal, Radio, Input } from "antd";
import TimeBox from "@/components/dashboard/TimeBox";
import DateBox from "@/components/dashboard/DateBox";
import styles from "./HomePage.module.css";
import AppModal from "@/components/dashboard/AppModal";
import DashboardButton from "@/components/dashboard/DashboardButton";

import {
  reqCreateUserCheckIn,
  reqCreateUserCheckOut,
  reqCreateUserBreakIn,
  reqCreateUserBreakOut
} from "@/feautures/api/attendance";

export default function HomePage() {
  // ---- State ----
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  const [popupMessage, setPopupMessage] = useState("");
  const [missedTime, setMissedTime] = useState(0);
  const [startCounting, setStartCounting] = useState(false);
  const [nextPopupTime, setNextPopupTime] = useState(null);

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [breakType, setBreakType] = useState(""); 
  const [breakReason, setBreakReason] = useState("");
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakStartTime, setBreakStartTime] = useState(null);

  const [checkOutHover, setCheckOutHover] = useState(false);
  const [checkInHover, setCheckInHover] = useState(false);
  const [breakInHover, setBreakInHover] = useState(false);
  const [hover, setHover] = useState(false);
  const [breakId, setBreakId] = useState(null);
  const [userId, setUserId] = useState(null);

  // ---- Refs ----
  const popupTimerRef = useRef(null);
  const missedTimerRef = useRef(null);
  const popupCountRef = useRef(0);

  const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // ---- Functions ----
  const handleCheckIn = () => {
    showModal({
      type: "checkin",
      title: "Check In",
      onOk: async () => {
        try {
          const res = await reqCreateUserCheckIn();   
          console.log("Check In API Response:", res);
          setIsCheckedIn(true);
          localStorage.setItem("checkedIn", "true");
          hideModal();
          scheduleNextPopup();
        } catch (error) {
          console.error("Check In API Error:", error);
        }
      },
    });
  };

  // Open confirm modal
  const handleCheckOutClick = () => {
    showModal({
      type: "confirmCheckout",
      title: "Checkout",
      extraData: { icon: "/icon/close.png" },
      onOk: handleCheckOut 
    });
  };

  // Actual check-out logic
  const handleCheckOut = async () => {
    hideModal(); 
    try {
      // Call Checkout API
      const res = await reqCreateUserCheckOut();
      console.log("Checkout API Response:", res);

      // Reset states
      setIsCheckedIn(false);
      //setShowPopup(false);
      setMissedTime(0);
      setStartCounting(false);
      popupCountRef.current = 0;
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
      if (missedTimerRef.current) clearInterval(missedTimerRef.current);

      // Remove localStorage flag
      localStorage.removeItem("checkedIn");

      // Show success modal
      showModal({
        type: "checkoutSuccess",
        title: "Success",
        onOk: hideModal
      });
    } catch (error) {
      console.error("Checkout API Error:", error);
      alert("Failed to check out. Please try again.");
    }
  };

  const handleBreakOk = async () => {
    if (!breakType) return;
    const now = new Date();

    try {
      // Call Break In API
      const res = await reqCreateUserBreakIn({
        breakType,
        note: breakReason,
      });

      console.log("Break In API Response:", res);

      // Store the breakId
      setBreakId(res.data.breakId);
      setUserId(res.data.attendanceDay.user_id);

      setBreakStartTime(now);
      hideModal();

      // Show success modal
      showModal({
        type: "breakSuccess",
        title: "Break Started",
        onOk: () => {
          setIsOnBreak(true);
          hideModal();
          setBreakType("");
          setBreakReason("");
        },
        extraData: { startTime: now }
      });
    } catch (error) {
      console.error("Break In API Error:", error);
      alert("Failed to start break. Please try again.");
    }
  };

  const handleBreakOut = async () => {
    if (!breakId || !userId) return alert("No active break found");
    const now = new Date();

    try {
      // Call Break Out API
      const res = await reqCreateUserBreakOut({
        breakId: breakId,
        userId: userId, 
      });

      console.log("Break Out API Response:", res);

      // Clear breakId since break is ended
      setBreakId(null);
      setUserId(null);

      // Show success modal
      showModal({
        type: "breakEndSuccess",
        title: "Break Ended",
        onOk: () => {
          setIsOnBreak(false);
          hideModal();
        },
        extraData: {
          endTime: now,
          breakType,
        }
      });
    } catch (error) {
      console.error("Break Out API Error:", error);
      alert("Failed to end break. Please try again.");
    }
  };

  const [modalConfig, setModalConfig] = useState({
    visible: false,
    type: "",
    title: "",
    content: null,
    onOk: null,
    extraData: null,
  });

  const showModal = ({ type, title, onOk, extraData }) => {
    setModalConfig({
      visible: true,
      type,
      title,
      onOk,
      extraData: extraData || null,
    });
  };

  const hideModal = () => {
    setModalConfig((prev) => ({ ...prev, visible: false }));
    setBreakType(""); 
    setBreakReason("");
  };

  const generateRandomPopup = () => {
    const now = new Date();
    const startDate = new Date();
    startDate.setHours(9, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(19, 0, 0, 0); 

    const effectiveStart = now > startDate ? now : startDate;
    if (effectiveStart >= endDate) return null;

    return new Date(
      effectiveStart.getTime() + Math.random() * (endDate.getTime() - effectiveStart.getTime())
    );

    // return new Date(now.getTime() + Math.random() * 60_000 + 30_000); 
  };

  const scheduleNextPopup = () => {
    if (!isCheckedIn || popupCountRef.current >= 2) return;

    const next = generateRandomPopup();
    if (next) {
      setNextPopupTime(next);
      console.log("Next popup scheduled at:", next.toLocaleTimeString());
    }
  };

  const handlePopupClick = () => {
    setShowPopup(false);

    if (missedTimerRef.current) clearInterval(missedTimerRef.current);

    // Show a popup instead of alert
    if (startCounting) {
      showModal({
        type: "popup",
        title: "Missed Time",
        extraData: { message: `You missed ${missedTime} seconds!` },
        onOk: () => {
          hideModal();
          setMissedTime(0);
          setStartCounting(false);
          if (popupCountRef.current < 2) scheduleNextPopup();
        }
      });
    } else {
      showModal({
        type: "popup",
        title: "On Time",
        extraData: { message: "Checked in on time!" },
        onOk: () => {
          hideModal(); 
          if (popupCountRef.current < 2) scheduleNextPopup();
        }
      });
    }

    setMissedTime(0);
    setStartCounting(false);

    if (popupCountRef.current < 2) scheduleNextPopup();
  };

  const handleBreakCancel = () => {
    //setIsBreakModalVisible(false);
    setBreakType("");
    setBreakReason("");
  };

  // Clock and Date update
  useEffect(() => {
    const date = new Date();
    setCurrentDay(date.getDay());

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(date.toLocaleDateString(undefined, options));

    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Trigger popup at scheduled time
  useEffect(() => {
    if (!nextPopupTime || popupCountRef.current >= 2 || !isCheckedIn) return;

    const now = new Date();
    const delay = Math.max(nextPopupTime.getTime() - now.getTime(), 0);

    if (popupTimerRef.current) clearTimeout(popupTimerRef.current);

    /*popupTimerRef.current = setTimeout(() => {
      setPopupMessage(`Random popup at ${new Date().toLocaleTimeString()}`);
      setShowPopup(true);
      popupCountRef.current += 1;

      // Start counting missed time after 60s
      setTimeout(() => {
        setStartCounting(true);
        missedTimerRef.current = setInterval(() => {
          setMissedTime((prev) => prev + 1);
        }, 1000);
      }, 60000);
    }, delay);*/

    popupTimerRef.current = setTimeout(() => {
      popupCountRef.current += 1;

      const message = `Random popup at ${new Date().toLocaleTimeString()}`;

      showModal({
        type: "popup",
        title: "Reminder",
        extraData: { message },
        onOk: () => {
          hideModal();
          setMissedTime(0);
          setStartCounting(false);
          if (popupCountRef.current < 2) scheduleNextPopup();
        },
      });

      // Start counting missed time after 60s
      setTimeout(() => {
        setStartCounting(true);
        missedTimerRef.current = setInterval(() => {
          setMissedTime((prev) => prev + 1);
        }, 1000);
      }, 60000);

    }, delay);

    return () => {
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    };
  }, [nextPopupTime, isCheckedIn]);

  // Schedule first popup on mount
  // useEffect(() => {
  //   scheduleNextPopup();
  // }, []);

  useEffect(() => {
    if (isCheckedIn) {
      scheduleNextPopup();
    }
  }, [isCheckedIn]);

  useEffect(() => {
    const saved = localStorage.getItem("checkedIn");
    if (saved === "true") {
      setIsCheckedIn(true);
    }
  }, []);


  // ---- Render ----
  return (
    <div
      className={`${styles.dashboardd}`}
    >
      {/* Logo */}
      <Image
        src="/icon/X Team - logo.png"
        alt="Logo"
        width={100}
        height={100}
        className={`${styles.dashboarddlogo}`}
      />

      {/* Date Box */}
      <DateBox currentDate={currentDate} />
      {/* Time Box */}
      <TimeBox currentDay={currentDay} dayList={day} currentTime={currentTime} />
      {/* Buttons */}
      <DashboardButton
        type="checkin"
        onClick={() => !isCheckedIn && handleCheckIn()}
        isActive={isCheckedIn}
        disabled={isCheckedIn}
      >
        Check In
      </DashboardButton>


      <DashboardButton
        type="break"
        onClick={() => {
          isOnBreak
            ? handleBreakOut()
            : showModal({ type: "break", title: "Break In Detail", onOk: handleBreakOk });
        }}
        isActive={isOnBreak}
        disabled={!isCheckedIn} // disabled if not checked in
      >
        {isOnBreak ? "Break Out" : "Break In"}
      </DashboardButton>

      <DashboardButton
        type="checkout"
        onClick={() => {
          if (!isCheckedIn || isOnBreak) return;
          handleCheckOutClick();
        }}
        isActive={isCheckedIn && !isOnBreak}
        disabled={!isCheckedIn || isOnBreak}   
      >
        Check Out
      </DashboardButton>


      <AppModal
        visible={modalConfig.visible}
        type={modalConfig.type}
        title={modalConfig.title}
        extraData={modalConfig.extraData}
        onOk={modalConfig.onOk}
        onCancel={hideModal}
        breakType={breakType}
        breakReason={breakReason}
        setBreakType={setBreakType}
        setBreakReason={setBreakReason}
        handleBreakOk={handleBreakOk}
      />
    </div>
  );
}
