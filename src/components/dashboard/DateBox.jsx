"use client";

import Image from "next/image";

export default function DateBox({ currentDate }) {
  return (
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
  );
}
