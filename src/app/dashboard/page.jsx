"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Button, Modal, Radio, Input } from "antd";

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

  const ModalOkButton = ({ onOk }) => (
    <Button
      style={{
        marginTop: 16,
        backgroundColor: hover ? "#0045A6" : "#0162E8",
        borderColor: hover ? "#0045A6" : "#0162E8",   
        color: "#FFFFFF",           
        fontWeight: "bold",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onOk}
    >
      Confirm
    </Button>
  );

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
    if (!breakId) return alert("No active break found");
    const now = new Date();

    try {
      // Call Break Out API
      const res = await reqCreateUserBreakOut({
        breakId,
      });

      console.log("Break Out API Response:", res);

      // Clear breakId since break is ended
      setBreakId(null);

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

  // ---- Render Modal Content Dynamically ----
  const renderModalContent = () => {
    switch (modalConfig.type) {
      case "checkin":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "#000" }}>
            <Image src="/icon/v-icon.png" alt="Success" width={90} height={90} style={{ marginBottom: 10 }} />
            <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold" }}>Success!</h2>
            <p>You have successfully checked in.</p>
            <ModalOkButton onOk={modalConfig.onOk} />
          </div>
        );
      case "checkoutSuccess":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "#000" }}>
            <Image src="/icon/v-icon.png" alt="Success" width={90} height={90} style={{ marginBottom: 10 }} />
            <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold" }}>Success!</h2>
            <p>You have successfully checked out.</p>
            <ModalOkButton onOk={modalConfig.onOk} />
          </div>
        );  
      case "break":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            <Radio.Group
              onChange={(e) => setBreakType(e.target.value)}
              value={breakType}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <Radio 
                value="personal"
                className="custom-radio"
              >Break</Radio>
              {breakType === "personal" && (
                <Input
                  placeholder="Enter reason"
                  value={breakReason}
                  onChange={(e) => setBreakReason(e.target.value)}
                  style={{ marginTop: 8, width: "100%" }}
                />
              )}
              <Radio value="toilet" className="custom-radio">Toilet</Radio>
            </Radio.Group>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <ModalOkButton
                onOk={() => {
                  if (!breakType) return; 
                  handleBreakOk();
                }}
              />
            </div>
          </div>
        );
      case "confirmCheckout":
        return (
          <div 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              gap: 20, 
              textAlign: "center", 
              color: "#000" 
            }}
          >
            {/* Icon */}
            {modalConfig.extraData?.icon && (
              <Image 
                src={modalConfig.extraData.icon} 
                alt="Icon" 
                width={65}   
                height={65} 
              />
            )}

            {/* Message with multiple lines */}
            <div style={{ 
              fontWeight: "bold", 
              textAlign: "center", 
              fontSize: "2rem", 
            }}>
              Confirm
            </div>

            <div style={{ fontSize: "1rem", fontWeight: "bold", margin: 0 }}>
              Are you sure you want to check-out?
            </div>
            <ModalOkButton onOk={modalConfig.onOk} />
          </div>
        );

      case "popup":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <h3 style={{ color: "red" }}>{modalConfig.extraData?.message || popupMessage}</h3>
            {startCounting && <p style={{ color: "#000" }}>Missed time: {missedTime}s</p>}
            <ModalOkButton onOk={modalConfig.onOk} />
          </div>
        );

      case "breakSuccess":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "#000" }}>
            <Image src="/icon/v-icon.png" alt="Success" width={90} height={90} style={{ marginBottom: 10 }} />
            <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold" }}>Success!</h2>
            <p>Your break start time has been saved: {modalConfig.extraData?.startTime.toLocaleTimeString()}</p>
            <ModalOkButton onOk={modalConfig.onOk} />
          </div>
        );

      case "breakEndSuccess":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "#000" }}>
            <Image src="/icon/v-icon.png" alt="Success" width={90} height={90} style={{ marginBottom: 10 }} />
            <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold" }}>Success!</h2>
            <p>
              You have successfully ended your {modalConfig.extraData?.breakType || "break"} at:{" "}
              {modalConfig.extraData?.endTime.toLocaleTimeString()}
            </p>
            <ModalOkButton onOk={modalConfig.onOk} />
          </div>
        );
  
      default:
        return null;
    }
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
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <Image
        src="/icon/X Team - logo.png"
        alt="Logo"
        width={100}
        height={100}
        style={{ marginBottom: 35, marginTop: 35 }}
      />

      {/* Date Box */}
      <div
        style={{
          width: "90%",
          maxWidth: "450px",
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: 15,
        }}
      >
        <Image
          src="/icon/bg-date.png"
          alt="Date Background"
          width={450}
          height={150}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#FFF100",
            fontWeight: "bold",
            fontSize: "clamp(16px, 4vw, 26px)",
            whiteSpace: "nowrap",
          }}
        >
          {currentDate}
        </div>
      </div>

      {/* Time Box */}
      <div
        style={{
          width: "90%",
          maxWidth: "450px",
          aspectRatio: "2 / 1",
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          backgroundImage: "url('/icon/bg-clock.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px",
          color: "white",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        {/* Day Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "0 45px",
          }}
        >
          {day.map((d, i) => (
            <span
              key={i}
              style={{
                fontSize: 16,
                fontWeight: i === currentDay ? "bold" : "normal",
                color: "#000",
              }}
            >
              {d}
            </span>
          ))}
        </div>

        {/* Time */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            fontSize: "4.3rem",
            fontFamily: "'Roboto Mono', monospace",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          <span>{currentTime.split(" ")[0]}</span>
          <span
            style={{
              fontSize: "1rem",
              fontWeight: "normal",
              marginLeft: "4px",
              marginBottom: "10px",
            }}
          >
            {currentTime.split(" ")[1]}
          </span>
        </div>

        {/* Timezone */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "1rem",
            fontWeight: "500",
            color: "#333",
            marginTop: "2px",
          }}
        >
          <Image src="/icon/vietnam-flat.png" alt="VN Flag" width={45} height={25} />
          <span>(UTC+07:00) Asia/VietNam </span>
        </div>
      </div>

      {/* Buttons */}
      <Button
        style={{
          background: isCheckedIn
            ? "linear-gradient(85deg, rgba(60,108,186, 0), rgba(60, 108, 186, 0))"  
            : checkInHover
            ? "linear-gradient(85deg, #151345, #151345)" 
            : "linear-gradient(85deg, #3C6CBA, #151345)",
          border: "1px solid #fff",
          color: isCheckedIn ? "rgba(255, 234, 29, 0.5)" : "#FFEA1D",
          fontWeight: "bold",
          padding: "20px 0",
          fontSize: "1.2rem",
          marginBottom: "15px",
          width: "220px",
          textAlign: "center",
          cursor: isCheckedIn ? "auto" : "pointer",
        }}
        onMouseEnter={() => setCheckInHover(true)}
        onMouseLeave={() => setCheckInHover(false)}
        onClick={() => {
          if (!isCheckedIn) handleCheckIn(); 
        }}
      >
        Check In
      </Button>

      <Button
        style={{
          background: isOnBreak
            ? breakInHover
            ? "linear-gradient(75deg, #5E0000, #5E0000)" 
            : "linear-gradient(75deg, #EC1C24, #5E0000)"
            : breakInHover
            ? "linear-gradient(85deg, #9F8144, #9F8144)" 
            : "linear-gradient(75deg, #EBD97F, #9F8144)", 
          border: "1px solid #fff",
          color: isOnBreak ? "#FFFFFF" : "#000000",
          fontWeight: "bold",
          padding: "20px 0",
          fontSize: "1.2rem",
          marginBottom: "15px",
          width: "220px",
          textAlign: "center",
          cursor: !isCheckedIn ? "auto" : "pointer",
        }}
        onMouseEnter={() => {
          if (isCheckedIn) setBreakInHover(true); 
        }}
        onMouseLeave={() => setBreakInHover(false)}
        onClick={() => {
          if (!isCheckedIn) return;
          if (isOnBreak) {
            handleBreakOut(); 
          } else {
            showModal({
              type: "break",
              title: "Break In Detail",
              onOk: handleBreakOk,
            });
          }
        }}
      >
        {isOnBreak ? "Break Out" : "Break In"}
      </Button>
      
      <Button
        style={{
          background: checkOutHover
              ? "linear-gradient(75deg, #9E9E9E, #9E9E9E)" 
              : "linear-gradient(75deg, #E5E5E5, #9E9E9E)", 
          border: "1px solid #fff",
          color: !isCheckedIn || isOnBreak ? "rgba(0,0,0,0.7)" : "#000",
          fontWeight: "bold",
          padding: "20px 60px",
          fontSize: "1.2rem",
          cursor: !isCheckedIn || isOnBreak ? "auto" : "pointer",
        }}
        onMouseEnter={() => {
          if (isCheckedIn && !isOnBreak) setCheckOutHover(true);
        }}
        onMouseLeave={() => setCheckOutHover(false)}
        onClick={() => {
          if (!isCheckedIn || isOnBreak) return; 
          handleCheckOutClick();
        }}
      >
        Check Out
      </Button>

      <Modal
        open={modalConfig.visible}
        title={modalConfig.title}
        onCancel={hideModal}
        centered
        // footer={
        //   modalConfig.type === "break" ? (
        //     <Button type="primary" onClick={handleBreakOk} disabled={!breakType}>
        //       OK
        //     </Button>
        //   ) : modalConfig.onOk ? (
        //     undefined 
        //   ) : null
        // }
        // onOk={() => {
        //   if (modalConfig.onOk) modalConfig.onOk();
        // }}
        footer={null}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}
