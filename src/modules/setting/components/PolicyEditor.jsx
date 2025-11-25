"use client";

import React, { useState } from "react";
import { QuillEditor } from "@/components/ui/QuillEditor";
import { Card, Divider } from "antd";
import styles from "../setting.module.css";
export function PolicyEditor({
  initialValue = "",
  onChange,
  title = "Company Policies",
}) {
  const [policyContent, setPolicyContent] = useState(initialValue || "");

  const handleChange = (html) => {
    setPolicyContent(html);
    onChange && onChange(html); // nếu cha muốn nhận value
  };

  return (
    <Card title="Working regulations" className={styles.containerCard}>
      <Divider className="border-t-gray-200/70! border mt-[-25px]!" />
      <div className="relative w-full mt-2">
        <QuillEditor
          value={policyContent}
          onChange={handleChange}
          title={title}
        />
      </div>
    </Card>
  );
}
