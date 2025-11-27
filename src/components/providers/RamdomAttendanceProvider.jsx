"use client";

import React, { useEffect, useRef, useState } from "react";
import { attendanceSettings } from "@/data/attendanceSettings";
import { Modal, Button, Typography } from "antd";
const { Text } = Typography;
export function RamdomAttendanceProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null); // default 3m

  const openModalForSlot = (slot) => {
    let audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        console.log("noti");
      });
    }
    setActiveSlot(slot);
    setTimeout(() => {
      setIsOpen(true);
    }, 500);
    // notification sound

    // set 3 min
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      console.log("No confirmation after 3 minutes → FAIL attendance");
      // TODO:
      closeModal();
      window.localStorage.removeItem("attendanceRandom");
      alert(`You missed the roll call time ${slot.time}!`);
    }, 180000);
  };

  const closeModal = () => {
    setIsOpen(false);
    setActiveSlot(null);

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkTime = () => {
      const now = new Date();
      const todayStr = now.toISOString().slice(0, 10); // "YYYY-MM-DD"

      let map = {};
      try {
        const stored = window.localStorage.getItem("attendanceRandom");
        if (stored) map = JSON.parse(stored) || {};
      } catch {
        map = {};
        window.localStorage.removeItem("attendanceRandom");
      }

      for (const slot of attendanceSettings.slots) {
        const [hStr, mStr] = slot.time.split(":");
        const h = Number(hStr);
        const m = Number(mStr);
        const target = new Date();
        target.setHours(h, m, 0, 0);
        const diffMs = now.getTime() - target.getTime();
        if (diffMs >= 0 && diffMs < 60000) {
          if (map[slot.id] === todayStr) {
            continue;
          }
          map[slot.id] = todayStr;
          openModalForSlot(slot);
          window.localStorage.setItem(
            "attendanceRandom",
            JSON.stringify(map)
          );
          break;
        }
      }
    };

    checkTime();

    const intervalId = window.setInterval(
      checkTime,
      attendanceSettings.checkIntervalMs || 5000
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const handleConfirm = () => {
    console.log("successfull");
    closeModal();
  };

  return (
    <>
      {children}
      {/* sound: sound continuously until the user clicks */}
      <audio ref={audioRef} src="/sounds/noti-check.mp3" preload="auto" loop />
      {/* Modal */}
      {activeSlot && (
        <Modal
          title={activeSlot?.label}
          open={isOpen}
          footer={null}
          centered
          maskClosable={false}
        >
          <p style={{ fontSize: 15, marginBottom: 12, color: "#333" }}>
            The time has come <b>{activeSlot.time}</b>.
          </p>
          <p style={{ fontSize: 15, marginBottom: 12, color: "#333" }}>
            Please confirm attendance within <b>3 minutes</b>, otherwise it will
            be counted as{" "}
            <Text strong type="danger">
              FAIL
            </Text>
            .
          </p>

          <div style={{ textAlign: "right" }}>
            <Button type="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
