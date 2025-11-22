"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button, Modal } from "antd";

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCheckIn = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* CENTER LOGO */}
      <Image
        src="/icon/X Team - logo.png"
        alt="Logo"
        width={100}
        height={100}
        style={{ marginBottom: 25, marginTop: 20 }}
      />

      {/* DATE BOX */}
      <div
        style={{
          width: "90%",
          maxWidth: "450px",
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: 15
        }}
      >
        <Image
          src="/icon/bg-date.png"
          alt="Date Background"
          width={450}
          height={150}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />

        {/* Centered Date Text */}
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

      {/* TIME BOX */}
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
            padding: "0 45px 0 45px",
          }}
        >
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d, i) => (
            <span
              key={i}
              style={{
                fontSize: 16,
                color: i === currentDay ? "#000" : "#000",
                fontWeight: i === currentDay ? "bold" : "normal",
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
        {/* Vietnam UTC with small logo */}
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
    
      <Modal
        open={isModalVisible}
        onCancel={handleOk}
        footer={null} 
        modalRender={(modal) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", 
              justifyContent: "center", 
              background: "linear-gradient(120deg, #fff, #fff)",
              padding: 20,
              borderRadius: 16,
              textAlign: "center",
              color: "#000",
            }}
          >
            <Image
              src="/icon/v-icon.png"
              alt="Success"
              width={90}
              height={90}
              style={{ marginBottom: 10 }} 
            />
            <h2 style={{ margin: "0 0 8px 0", fontSize: "1.8rem", fontWeight: "bold" }}>Success!</h2>
            <p style={{ margin: 0 }}>You have successfully checked in.</p>
            <Button
              onClick={handleOk}
              style={{ marginTop: 16, width: 100 }}
            >
              Confirm
            </Button>
          </div>
        )}
      />

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
      >
        Break In
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
      >
        Check Out
      </Button>
      
    </div>
  );
}

