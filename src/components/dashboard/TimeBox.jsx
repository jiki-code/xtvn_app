"use client";

import Image from "next/image";

export default function TimeBox({ currentDay, dayList, currentTime }) {
  return (
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
        {dayList.map((d, i) => (
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
  );
}
