// hooks/usePopupScheduler.js
import { useEffect, useRef, useState } from "react";

export default function usePopupScheduler(isCheckedIn, showModal, hideModal) {
  const popupTimerRef = useRef(null);
  const missedTimerRef = useRef(null);
  const popupCountRef = useRef(0);
  const [nextPopupTime, setNextPopupTime] = useState(null);

  const generateRandomPopup = () => {
    const now = new Date();
    const start = new Date(); start.setHours(9, 0, 0, 0);
    const end = new Date();   end.setHours(19, 0, 0, 0);

    if (now >= end) return null;

    return new Date(now.getTime() + Math.random() * (end - now));
  };

  const scheduleNextPopup = () => {
    if (!isCheckedIn || popupCountRef.current >= 2) return;
    const next = generateRandomPopup();
    if (next) setNextPopupTime(next);
  };

  // trigger popup
  useEffect(() => {
    if (!nextPopupTime || popupCountRef.current >= 2 || !isCheckedIn) return;

    const delay = nextPopupTime - new Date();

    popupTimerRef.current = setTimeout(() => {
      popupCountRef.current++;

      showModal({
        type: "popup",
        title: "Reminder",
        extraData: { message: "Random popup alert" },
        onOk: () => hideModal(),
      });

      scheduleNextPopup();
    }, delay);

    return () => clearTimeout(popupTimerRef.current);
  }, [nextPopupTime, isCheckedIn]);

  useEffect(() => {
    if (isCheckedIn) scheduleNextPopup();
  }, [isCheckedIn]);
}
