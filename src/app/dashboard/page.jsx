"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Button, Modal, Radio, Input } from "antd";

export default function HomePage() {
  // ---- State ----
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [missedTime, setMissedTime] = useState(0);
  const [startCounting, setStartCounting] = useState(false);
  const [nextPopupTime, setNextPopupTime] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);


  const [isBreakModalVisible, setIsBreakModalVisible] = useState(false);
  const [breakType, setBreakType] = useState(""); 
  const [breakReason, setBreakReason] = useState("");
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakStartTime, setBreakStartTime] = useState(null);

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
      //onOk: hideModal,
      onOk: () => {
        setIsCheckedIn(true);
        hideModal();
        scheduleNextPopup();
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
  const handleCheckOut = () => {
    // Close modal
    hideModal();

    // Reset states
    setIsCheckedIn(false);
    setShowPopup(false);
    setMissedTime(0);
    setStartCounting(false);
    popupCountRef.current = 0;
    if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    if (missedTimerRef.current) clearInterval(missedTimerRef.current);

    // Show a success modal
    showModal({
      type: "checkoutSuccess",
      title: "Success",
      onOk: hideModal
    });
  };


  const handleBreakOk = () => {
    if (!breakType) return; 
    const now = new Date();
    setBreakStartTime(now);

    hideModal();
    // Show success modal
    showModal({
      type: "breakSuccess",
      title: "Break Started",
      onOk: () => {
        setIsOnBreak(true); // toggle to break mode
        hideModal();
        setBreakType(""); 
        setBreakReason("");
      },
      extraData: { startTime: now }
    });
  };

  const handleBreakOut = () => {
    // User ends break
    setIsOnBreak(false);
  };

  const handleOk = () => setIsModalVisible(false);

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

    if (startCounting) {
      alert(`You missed ${missedTime} seconds!`);
    } else {
      alert("Checked in on time!");
    }

    if (missedTimerRef.current) clearInterval(missedTimerRef.current);

    setMissedTime(0);
    setStartCounting(false);

    if (popupCountRef.current < 2) scheduleNextPopup();
  };

  // const handleBreakOk = () => {
  //   console.log("Selected:", breakType, "Reason:", breakReason);
  //   setIsBreakModalVisible(false);
  //   setBreakType("");
  //   setBreakReason("");
  // };

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
          </div>
        );
      case "checkoutSuccess":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "#000" }}>
            <Image src="/icon/v-icon.png" alt="Success" width={90} height={90} style={{ marginBottom: 10 }} />
            <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold" }}>Success!</h2>
            <p>You have successfully checked out.</p>
          </div>
        );  
      case "break":
        return (
          <Radio.Group
            onChange={(e) => setBreakType(e.target.value)}
            value={breakType}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <Radio value="break">Break</Radio>
            {breakType === "break" && (
              <Input
                placeholder="Enter reason"
                value={breakReason}
                onChange={(e) => setBreakReason(e.target.value)}
                style={{ marginTop: 8, width: "100%" }}
              />
            )}
            <Radio value="toilet">Toilet</Radio>
          </Radio.Group>
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
          </div>
        );

      case "popup":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <h3>{modalConfig.extraData?.message || popupMessage}</h3>
            {startCounting && <p>Missed time: {missedTime}s</p>}
            <Button onClick={handlePopupClick} style={{ marginTop: 16 }}>OK</Button>
          </div>
        );
      case "breakSuccess":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "#000" }}>
            <Image src="/icon/v-icon.png" alt="Success" width={90} height={90} style={{ marginBottom: 10 }} />
            <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold" }}>Success!</h2>
            <p>Your break start time has been saved: {modalConfig.extraData?.startTime.toLocaleTimeString()}</p>
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

    popupTimerRef.current = setTimeout(() => {
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
    }, delay);

    return () => {
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    };
  }, [nextPopupTime, isCheckedIn]);

  // Schedule first popup on mount
  useEffect(() => {
    scheduleNextPopup();
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
          background: "linear-gradient(85deg, #3C6CBA, #151345)",
          border: "1px solid #fff",
          color: "#FFEA1D",
          fontWeight: "bold",
          padding: "20px 0",
          fontSize: "1.2rem",
          marginBottom: "15px",
          width: "220px",
          textAlign: "center",
        }}
        onClick={handleCheckIn}
         disabled={isCheckedIn}
      >
        Check In
      </Button>

      <Button
        style={{
          background: isOnBreak
            ? "linear-gradient(75deg, #EC1C24, #5E0000)" 
            : "linear-gradient(75deg, #EBD97F, #9F8144)", 
          border: "1px solid #fff",
          color: "#000",
          fontWeight: "bold",
          padding: "20px 0",
          fontSize: "1.2rem",
          marginBottom: "15px",
          width: "220px",
          textAlign: "center",
        }}
        onClick={() => {
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
        disabled={!isCheckedIn} 
      >
        {isOnBreak ? "Break Out" : "Break In"}
      </Button>

      <Button
        style={{
          background: "linear-gradient(75deg, #E5E5E5, #9E9E9E)",
          border: "1px solid #fff",
          color: "#000",
          fontWeight: "bold",
          padding: "20px 60px",
          fontSize: "1.2rem",
        }}
        onClick={handleCheckOutClick}
        disabled={!isCheckedIn || isOnBreak}
      >
        Check Out
      </Button>

      {/* <Modal
        open={modalConfig.visible}
        title={modalConfig.title}
        onCancel={hideModal}
        onOk={() => {
          if (modalConfig.onOk) modalConfig.onOk();
        }}
        centered
      >
        {renderModalContent()}
      </Modal> */}

      <Modal
        open={modalConfig.visible}
        title={modalConfig.title}
        onCancel={hideModal}
        centered
        footer={
          modalConfig.type === "break" ? (
            <Button type="primary" onClick={handleBreakOk} disabled={!breakType}>
              OK
            </Button>
          ) : modalConfig.onOk ? (
            undefined 
          ) : null
        }
        onOk={() => {
          if (modalConfig.onOk) modalConfig.onOk();
        }}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}
