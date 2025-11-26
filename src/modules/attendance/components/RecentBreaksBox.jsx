"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { reqGetAllUsersBreakSession } from "@/feautures/api/attendance";
import styles from "../style/attendanceList.module.css";

dayjs.extend(relativeTime);

export const RecentBreaksBox = () => {
  const [breaks, setBreaks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBreaks = async () => {
    try {
      setLoading(true);
      const res = await reqGetAllUsersBreakSession({ page: 1, limit: 10 });
      const dataRes = res.data || res;
      const breaksData = dataRes.breaks || dataRes.data?.breaks || [];

      const formatted = breaksData
        .sort((a, b) => new Date(b.started_at) - new Date(a.started_at)) 
        .map((b) => ({
          id: b.user_id,
          name: b.user_name, 
          type: b.break_type === "personal" ? "Break" : "Toilet",
          started_at: b.started_at,
          note: b.note,
        }));

      setBreaks(formatted);
    } catch (err) {
      toast.error(err.message || "Failed to fetch breaks");
    } finally {
      setLoading(false);
    }
  };

  // Fetch breaks on mount and refresh every minute
  useEffect(() => {
    fetchBreaks();
    const interval = setInterval(fetchBreaks, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute left/right columns
  const leftItems = breaks.filter((_, i) => i % 2 === 0);
  const rightItems = breaks.filter((_, i) => i % 2 !== 0);

  // Function to compute dynamic timeAgo
  const timeAgo = (date) => dayjs().to(dayjs(date));

  return (
    <div className={styles.breakContainer}>
      <h3 className={styles.breaktitle} >RECENT BREAKS</h3>
      <h4 className={styles.breaktitlee}>
        Real-time update of employees' recent breaks
      </h4>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.cont} >
          {/* Left Column */}
          <div className={styles.cont2}>
            {leftItems.map((item) => (
              <div
                key={item.id}
                className={styles.cont3}
              >
                <p className={styles.cont4}>{item.name}</p>
                <div className={styles.cont5} >
                  <div className={styles.cont6}>
                    <span>ID:{item.id}</span>{" "}
                    <span className={styles.cont7}>
                      {item.type}{item.note ? `: ${item.note}` : ""}
                    </span>

                  </div>
                  <div className={styles.cont8}>{timeAgo(item.started_at)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Middle vertical border */}
          <div className={styles.contb}  />

          {/* Right Column */}
          <div className={styles.cont2}>
            {rightItems.map((item) => (
              <div
                key={item.id}
                className={styles.cont3}
              >
                <p className={styles.cont4}>{item.name}</p>
                <div className={styles.cont5}>
                  <div className={styles.cont6}>
                    <span>ID:{item.id}</span>{" "}
                    <span className={styles.cont7}>
                      {item.type}{item.note ? `: ${item.note}` : ""}
                    </span>

                  </div>
                  <div className={styles.cont8}>{timeAgo(item.started_at)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
