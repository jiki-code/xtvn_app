import React, { useEffect, useState } from "react";
import { Input, Select, TimePicker } from "antd";
import { RangeDatePicker } from "@/components/ui/RangeDatePicker";
import { departmanList } from "@/data/common";
import dayjs from "dayjs";

const FormSearch = ({ onChange, formSearch }) => {
  const [form, setForm] = useState(formSearch);
  const departmentOptions = [{ value: "", label: "All" }, ...departmanList];

  useEffect(() => {
    setForm(formSearch);
  }, [formSearch]);

  const emitChange = (nextForm) => {
    setForm(nextForm);
    const cleaned = Object.fromEntries(
      Object.entries(nextForm).filter(
        ([_, v]) => v !== undefined && v !== "" && v !== null
      )
    );
    onChange?.(cleaned);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    emitChange({
      ...form,
      [name]: value,
    });
  };

  const handleSelectChange = (name) => (value) => {
    emitChange({
      ...form,
      [name]: value,
    });
  };

  const handleDateChange = (dates) => {
    emitChange({
      ...form,
      dates: dates || [],
    });
  };

  const handleTimeChange = (time, timeString) => {
    setForm((prev) => ({ ...prev, time: timeString }));
    onChange?.({ ...form, time: timeString });
  };

  return (
    <div className="pb-4">
      <div className="grid grid-cols-4 gap-3 w-full">
        <div className="w-full">
          <RangeDatePicker
            value={form.dates}
            onChange={handleDateChange}
            className="w-full"
          />
        </div>

        <div className="w-full">
          <Select
            placeholder="All"
            className="w-full"
            value={form?.department}
            onChange={handleSelectChange("department")}
            options={departmentOptions}
          />
        </div>

        <div className="w-full">
          <Input
            placeholder="Search by Name"
            value={form?.name}
            name="name"
            allowClear
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div className="w-full">
          <Input
            placeholder="Search Note"
            value={form?.note}
            name="note"
            allowClear
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div className="w-full">
          <TimePicker
            value={form.time ? dayjs(form.time, "HH:mm:ss") : null}
            onChange={handleTimeChange}
            format="HH:mm:ss"
            placeholder="Break time (hh.mm)"
          />
        </div>
      </div>
    </div>
  );
};

export { FormSearch };
