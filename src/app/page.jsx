"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    setCurrentDate(date.toLocaleDateString(undefined, options));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 32,
        width: "100%",
      }}
    >
      {/* Top center logo */}
      <Image
        src="/icon/X Team - logo.png"
        alt="Dashboard Icon"
        width={100}
        height={100}
      />

      {/* Current day with background */}
      <div
        style={{
          width: "90%",
          maxWidth: "450px",
          aspectRatio: "3/1", // ensures container height scales with width
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <Image
          src="/icon/bg-date.png"
          alt="Date Background"
          fill
          style={{ objectFit: "contain" }}
        />

        {/* Overlay text */}
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#FFF100",
            fontWeight: "600",
            fontSize: "clamp(16px, 4vw, 28px)",
            textAlign: "center",
            padding: "0 1rem",
            whiteSpace: "nowrap", 
          }}
        >
          {currentDate}
        </span>
      </div>

      {/* Content card */}
      <div
        className="app-card mt-6"
        style={{
          maxWidth: 600,
          width: "100%",
          textAlign: "left",
        }}
      >
        {/* Your card content */}
      </div>
    </div>
  );
}
