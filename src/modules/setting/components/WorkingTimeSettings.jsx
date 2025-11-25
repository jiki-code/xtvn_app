"use client";

import { Card, Divider } from "antd";
import React, { useState } from "react";
import styles from "../setting.module.css";

export function WorkingTimeSettings() {
  const [shiftTime, setShiftTime] = useState(9); // Shift Time
  const [actualWorkingTime, setActualWorkingTime] = useState(8); // Actual working time
  const [actualBreakTime, setActualBreakTime] = useState(1);

  const handleChange = (e, setter, maxLength) => {
    let value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    if (value.length > maxLength) value = value.slice(0, maxLength);
    setter(value === "" ? "" : Number(value));
  };

  return (
   <Card title="Random roll up" className={styles.containerCard}>
      <Divider className="border-t-gray-200/70! border mt-[-25px]!" />
      <div className="w-full px-3 space-y-4">
        {/* Count down time */}
        <div className="space-x-3 flex w-full items-center">
          <label className="w-1/6 text-sm font-semibold text-black">
            Shift Time
          </label>
          <div className="flex">
            <input
              name="shiftTime"
              value={shiftTime}
              onChange={(e) => handleChange(e, setShiftTime, 2)}
              type="number"
              min={0}
              maxLength={5}
              className="w-[100px] rounded-lg text-black! border-gray-400 border text-sm px-3 py-2 focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <span className="text-gray-500 pl-1">hour</span>
        </div>

        {/* Number of attendance */}
        <div className="space-x-3 flex w-full items-center">
          <label className="w-1/6 text-sm font-semibold text-black">
            Actual working time
          </label>
          <div className="flex gap-2">
            <input
              name="actualWorkingTime"
              value={actualWorkingTime}
              onChange={(e) => handleChange(e, setActualWorkingTime, 2)}
              type="number"
              min={0}
              maxLength={5}
              className="w-[100px] rounded-lg text-black! border-gray-400 border text-sm px-3 py-2 focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <span className="text-gray-500 pl-1">hour</span>
        </div>

        <div className="space-x-3 flex w-full items-center">
          <label className="w-1/6 text-sm font-semibold text-black">
            Actual break time
          </label>
          <div className="flex gap-2">
            <input
              name="actualBreakTime"
              value={actualBreakTime}
              onChange={(e) => handleChange(e, setActualBreakTime, 2)}
              type="number"
              min={0}
              maxLength={5}
              className="w-[100px] rounded-lg text-black! border-gray-400 border text-sm px-3 py-2 focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <span className="text-gray-500 pl-1">hour</span>
        </div>
      </div>
    </Card>
  );
}
