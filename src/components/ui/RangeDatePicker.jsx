"use client";

import { DatePicker, } from "antd";
import {

  CalendarOutlined,
} from "@ant-design/icons";
const { RangePicker } = DatePicker;
import {typeDatePicker} from "@/data/common"
import { cn } from "@/lib/utils";

export function RangeDatePicker({
  onChange, 
  className,
  value
  
}) {
    const handleRangeChange = (dates) => {
    onChange?.(dates || []);
  };

  return (
    <RangePicker
      className={cn("rounded-lg", className)}
      format="YYYY-MM-DD"
      value={value || []} 
      onChange={handleRangeChange}
      placeholder={["yyyy-mm-dd", "yyyy-mm-dd"]}
      suffixIcon={<CalendarOutlined className="text-slate-500" />}
      presets={typeDatePicker}
      placement="bottomLeft"
    />
  );
}
