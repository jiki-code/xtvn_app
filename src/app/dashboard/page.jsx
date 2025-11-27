"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "./HomePage.module.css";
import TimeBox from "@/components/dashboard/TimeBox";
import DateBox from "@/components/dashboard/DateBox";
import AppModal from "@/components/dashboard/AppModal";
import DashboardButton from "@/components/dashboard/DashboardButton";

import useModal from "@/hooks/useModal";
import useAttendance from "@/hooks/useAttendance";
import usePopupScheduler from "@/hooks/usePopupScheduler";

export default function HomePage() {

  const { modalConfig, showModal, hideModal } = useModal();
  const {
    isCheckedIn,
    isOnBreak,
    handleCheckIn,
    handleCheckOut,
    handleBreakIn,
    handleBreakOut,
  } = useAttendance({ showModal, hideModal });

  usePopupScheduler(isCheckedIn, showModal, hideModal);
  // ---- State ----
  const dayList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentDay = new Date().getDay();
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const [breakType, setBreakType] = useState(""); 
  const [breakReason, setBreakReason] = useState("");
  const [currentBreakType, setCurrentBreakType] = useState("");
  const [breakStartTime, setBreakStartTime] = useState(null);

  // Clock and Date update
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // For DateBox (no AM/PM)
      const formattedDate = now.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime24 = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, 
      });
      setCurrentDate(`${formattedDate} ${formattedTime24}`);

      // For TimeBox (with AM/PM)
      const formattedTime12 = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, 
      });
      setCurrentTime(formattedTime12);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBreakButtonClick = () => {
    if (isOnBreak) {
      // User wants Break Out → show confirmation modal
      showModal({ type: "break_out", title: "Break Out Detail", extraData: { breakType: currentBreakType, startTime: breakStartTime } });
    } else {
      // Normal Break In modal
      showModal({ type: "break", title: "Break In Detail" });
    }
  };


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
      <TimeBox dayList={dayList} currentDay={currentDay} currentTime={currentTime} />
      {/* Buttons */}
      <DashboardButton
        type="checkin"
        onClick={handleCheckIn}
        disabled={isCheckedIn}
        isActive={isCheckedIn}
      >
        Check In
      </DashboardButton>


      <DashboardButton
        type="break"
        onClick={handleBreakButtonClick}
        disabled={!isCheckedIn}
        isActive={isOnBreak}
      >
        {isOnBreak ? "Break Out" : "Break In"}
      </DashboardButton>


      <DashboardButton
        type="checkout"
        onClick={handleCheckOut}
        disabled={!isCheckedIn || isOnBreak}   
      >
        Check Out
      </DashboardButton>

      <AppModal
        {...modalConfig}
        onCancel={() => {
          hideModal();
          setBreakType("");
          setBreakReason("");
        }}
        breakType={breakType}
        setBreakType={setBreakType}
        breakReason={breakReason}
        setBreakReason={setBreakReason}
        onConfirmBreak={async () => {
          if (modalConfig.type === "break") {
            const now = new Date();
            await handleBreakIn(breakType, breakReason);
            setCurrentBreakType(breakType); 
            setBreakStartTime(now); 
            setBreakType("");
            setBreakReason("");
            hideModal();
          }
          if (modalConfig.type === "break_out") {
            await handleBreakOut();
            setCurrentBreakType(""); 
            hideModal();
          }
        }}
        extraData={modalConfig.extraData || {}}
      />
    </div>
  );
}
