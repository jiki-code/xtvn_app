"use client";

import { Card, Divider } from "antd";
import React from "react";
import styles from "../setting.module.css";

export function WorkingTimeSettings({ form, onWorkingChange }) {
  const handleChange = (e, fieldName, maxLength) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");
    if (maxLength && value.length > maxLength) {
      value = value.slice(0, maxLength);
    }

    const numValue = value === "" ? undefined : Number(value);

    form.setFieldsValue({
      [fieldName]: numValue,
    });

    if (onWorkingChange) {
      onWorkingChange(fieldName, numValue);
    }
  };

  const shiftTime = form.getFieldValue("shiftDuration");
  const actualWorkingTime = form.getFieldValue("actualWorkingTime");
  const actualBreakTime = form.getFieldValue("maxBreakTime");

  return (
    <Card title="Working time" className={styles.containerCard}>
      <Divider className="border-t-gray-200/70! border mt-[-25px]!" />
      <div className="w-full px-3 space-y-4">
        {/* Shift Time */}
        <div className="flex items-center space-x-3 w-full">
          <label className="w-1/6 text-sm font-semibold text-black">
            Shift Time
          </label>
          <div className="flex">
            <input
              name="shiftDuration"
              value={shiftTime ?? ""}
              onChange={(e) => handleChange(e, "shiftDuration", 2)}
              type="number"
              min={0}
              className="w-[100px] rounded-lg !text-black border-gray-400 border text-sm px-3 py-2 focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <span className="text-gray-500 pl-1">hour</span>
        </div>

        {/* Actual Working Time */}
        <div className="flex items-center space-x-3 w-full">
          <label className="w-1/6 text-sm font-semibold text-black">
            Actual working time
          </label>
          <div className="flex gap-2">
            <input
              name="actualWorkingTime"
              value={actualWorkingTime ?? ""}
              onChange={(e) => handleChange(e, "actualWorkingTime", 2)}
              type="number"
              min={0}
              className="w-[100px] rounded-lg !text-black border-gray-400 border text-sm px-3 py-2 focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <span className="text-gray-500 pl-1">hour</span>
        </div>

        {/* Break Time */}
        <div className="flex items-center space-x-3 w-full">
          <label className="w-1/6 text-sm font-semibold text-black">
            Actual break time
          </label>
          <div className="flex gap-2">
            <input
              name="maxBreakTime"
              value={actualBreakTime ?? ""}
              onChange={(e) => handleChange(e, "maxBreakTime", 2)}
              type="number"
              min={0}
              className="w-[100px] rounded-lg !text-black border-gray-400 border text-sm px-3 py-2 focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <span className="text-gray-500 pl-1">hour</span>
        </div>
      </div>
    </Card>
  );
}
