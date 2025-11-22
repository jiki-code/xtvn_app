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

  const [isBreakModalVisible, setIsBreakModalVisible] = useState(false);
  const [breakType, setBreakType] = useState(""); // "break" or "toilet"
  const [breakReason, setBreakReason] = useState("");

  // ---- Refs ----
  const popupTimerRef = useRef(null);
  const missedTimerRef = useRef(null);
  const popupCountRef = useRef(0);

  const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // ---- Functions ----
  const handleCheckIn = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);

  const generateRandomPopup = () => {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setHours(9, 0, 0, 0);
    const endDate = new Date(now);
    endDate.setHours(17, 0, 0, 0);

    const effectiveStart = now > startDate ? now : startDate;
    if (effectiveStart >= endDate) return null;

    return new Date(
      effectiveStart.getTime() +
        Math.random() * (endDate.getTime() - effectiveStart.getTime())
    );
  };

  /*const generateRandomPopup = () => {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setSeconds(now.getSeconds() + 1); // start 1s from now
    const endDate = new Date(now);
    endDate.setSeconds(now.getSeconds() + 10); // end 10s from now

    const effectiveStart = now > startDate ? now : startDate;
    if (effectiveStart >= endDate) return null;

    return new Date(
      effectiveStart.getTime() + Math.random() * (endDate.getTime() - effectiveStart.getTime())
    );
  };*/


  const scheduleNextPopup = () => {
    if (popupCountRef.current >= 2) return;

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

  const handleBreakOk = () => {
    console.log("Selected:", breakType, "Reason:", breakReason);
    setIsBreakModalVisible(false);
    setBreakType("");
    setBreakReason("");
  };

  const handleBreakCancel = () => {
    setIsBreakModalVisible(false);
    setBreakType("");
    setBreakReason("");
  };

  // ---- Effects ----

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
    if (!nextPopupTime || popupCountRef.current >= 2) return;

    const now = new Date();
    const delay = Math.max(nextPopupTime.getTime() - now.getTime(), 0);

    if (popupTimerRef.current) clearTimeout(popupTimerRef.current);

    popupTimerRef.current = setTimeout(() => {
      setPopupMessage(`Popup at ${new Date().toLocaleTimeString()}`);
      setShowPopup(true);
      popupCountRef.current += 1;

      // Start counting missed time after 60s
      setTimeout(() => {
        setStartCounting(true);
        missedTimerRef.current = setInterval(() => {
          setMissedTime((prev) => prev + 1);
        }, 1000);
      }, 5000);
    }, delay);

    return () => {
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    };
  }, [nextPopupTime]);

  // Schedule first popup on mount
  useEffect(() => {
    scheduleNextPopup();
  }, []);

  // useEffect(() => {
  //   setNextPopupTime(new Date()); // popup appears immediately
  // }, []);


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
      >
        Check In
      </Button>

      {/* Check-in Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleOk}
        footer={null}
        modalRender={() => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              padding: 20,
              borderRadius: 16,
              textAlign: "center",
              color: "#000",
            }}
          >
            <Image src="/icon/v-icon.png" alt="Success" width={90} height={90} style={{ marginBottom: 10 }} />
            <h2 style={{ margin: "0 0 8px 0", fontSize: "1.8rem", fontWeight: "bold" }}>Success!</h2>
            <p style={{ margin: 0 }}>You have successfully checked in.</p>
            <Button onClick={handleOk} style={{ marginTop: 16, width: 100 }}>Confirm</Button>
          </div>
        )}
      />

      {/* Random Popup Modal */}
      <Modal
        open={showPopup}
        footer={null}
        closable={false}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            borderRadius: 16,
            textAlign: "center",
            color: "#000",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>Are you still working?</h1>
          <p style={{ fontSize: "1rem"}}>{popupMessage}</p>
          {startCounting && <p>Missed time: {missedTime}s</p>}
          <Button onClick={handlePopupClick} style={{ marginTop: 16 }}>OK</Button>
        </div>
      </Modal>
      <Button
        style={{
          background: "linear-gradient(75deg, #EBD97F, #9F8144)",
          border: "1px solid #fff",
          color: "#000",
          fontWeight: "bold",
          padding: "20px 0",
          fontSize: "1.2rem",
          marginBottom: "15px",
          width: "220px",
          textAlign: "center",
        }}
        onClick={() => setIsBreakModalVisible(true)}
      >
        Break In
      </Button>

      <Modal
        open={isBreakModalVisible}
        onCancel={handleBreakCancel}
        onOk={handleBreakOk}
        title="Break In Detail"
      >
        <Radio.Group
          onChange={(e) => setBreakType(e.target.value)}
          value={breakType}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          {/* Break radio */}
          <Radio value="break">Break</Radio>

          {/* Input box is separate, shown only when break is selected */}
          {breakType === "break" && (
        <Input
          placeholder="Enter reason"
          value={breakReason}
          onChange={(e) => setBreakReason(e.target.value)}
          style={{ marginTop: 0, width: "100%"}}
        />
      )}

        {/* Toilet radio */}
        <Radio value="toilet">Toilet</Radio>
        </Radio.Group>
      </Modal>

      <Button
        style={{
          background: "linear-gradient(75deg, #E5E5E5, #9E9E9E)",
          border: "1px solid #fff",
          color: "#000",
          fontWeight: "bold",
          padding: "20px 60px",
          fontSize: "1.2rem",
        }}
      >
        Check Out
      </Button>
    </div>
  );
}
