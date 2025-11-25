"use client";

import { Card, Divider } from "antd";
import React, { useState } from "react";
import styles from "../setting.module.css";

export function RandomCheckSettings() {
  const [randomCheckTime, setRandomCheckTime] = useState(360);
  const [randomCheckCount, setRandomCheckCount] = useState(2);

  const handleChange = (e, type = "type_1", maxLength) => {
    let value = e.target.value;
      if (value.length > maxLength) value = value.slice(0, maxLength);
    if (type === "type_1") {
      setRandomCheckTime(value);
    } else {
      setRandomCheckCount(value);
    }
  };

  return (
    <Card title="Random roll up" className={styles.containerCard}>
      <Divider className="border-t-gray-200/70! border mt-[-25px]!" />
      <div className="w-full px-3 space-y-4">
        {/* Count down time */}
        <div className="space-x-3 flex w-full items-center">
          <label className="w-1/6 text-sm font-semibold text-black">
            Count down time
          </label>
          <div className="flex">
            <input
              name="randomCheckTime"
              value={randomCheckTime}
              onChange={(e) => handleChange(e, "type_1", 3)}
              type="number"
              min={0}
              className="w-[100px] rounded-lg text-black! border-gray-400 border text-sm px-3 py-2 focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <span className="text-gray-500 pl-1">minute</span>
        </div>

        {/* Number of attendance */}
        <div className="space-x-3 flex w-full items-center">
          <label className="w-1/6 text-sm font-semibold text-black">
            Number of attendance during the day
          </label>
          <div className="flex gap-2">
            <input
              name="randomCheckCount"
              value={randomCheckCount}
              onChange={(e) => handleChange(e, "type_2", 2)}
              type="number"
              min={0}
              className="w-[100px] rounded-lg text-black! border-gray-400 border text-sm px-3 py-2 focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <span className="text-gray-500 pl-1">time</span>
        </div>
      </div>
    </Card>
  );
}
