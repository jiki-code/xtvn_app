"use client";

import Image from "next/image";
import { useState } from "react";
import { Radio, Input, Button } from "antd";

export default function AttendanceModal({
  open,
  modalConfig,
  hideModal,
  breakType,
  setBreakType,
  breakReason,
  setBreakReason,
  startCounting,
  missedTime,
  handleBreakOk,
}) {
  // Inline ModalOkButton
  function ModalOkButton({ onOk }) {
    const [hover, setHover] = useState(false);

    return (
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
  }

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
              <Radio value="personal" className="custom-radio">Break</Radio>
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
              <ModalOkButton onOk={() => { if (!breakType) return; handleBreakOk(); }} />
            </div>
          </div>
        );

      case "confirmCheckout":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, textAlign: "center", color: "#000" }}>
            {modalConfig.extraData?.icon && (
              <Image src={modalConfig.extraData.icon} alt="Icon" width={65} height={65} />
            )}
            <div style={{ fontWeight: "bold", textAlign: "center", fontSize: "2rem" }}>Confirm</div>
            <div style={{ fontSize: "1rem", fontWeight: "bold", margin: 0 }}>
              Are you sure you want to check-out?
            </div>
            <ModalOkButton onOk={modalConfig.onOk} />
          </div>
        );

      case "popup":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <h3 style={{ color: "red" }}>{modalConfig.extraData?.message}</h3>
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

  if (!open) return null;

  return <div>{renderModalContent()}</div>;
}
