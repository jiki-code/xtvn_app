"use client";

import React, { useState } from "react";
import { Form, Button } from "antd";
import { WorkingTimeSettings } from "./components/WorkingTimeSettings";
import { RandomCheckSettings } from "./components/RandomCheckSettings";
import { DepartmentSettings } from "./components/DepartmentSettings";
import { PolicyEditor } from "./components/PolicyEditor";
import { defaultPolicyHtml } from "@/data/common";
import styles from "./setting.module.css";

export function SettingList() {
  const [form] = Form.useForm();
  const [policy, setPolicy] = useState(defaultPolicyHtml);
  const [departments, setDepartments] = useState(["Seo", "Social", "Dev"]);

  const handleAddDept = (name) => {
    setDepartments((prev) => [...prev, name]);
  };

  const handleDeleteDept = (index) => {
    setDepartments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditDept = (index, value) => {
    setDepartments((prev) => prev.map((d, i) => (i === index ? value : d)));
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
    console.log("Departments:", departments);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* <Title level={4}>Setting</Title> */}

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          randomCheckTime: 2,
          randomCheckCount: 2,
          shiftDuration: 2,
          actualWorkingTime: 2,
          maxBreakTime: 2,
          website: "https://dgasigroup.com/",
        }}
      >
        <RandomCheckSettings />

        <WorkingTimeSettings />
        <DepartmentSettings
          departments={departments}
          onAdd={handleAddDept}
          onDelete={handleDeleteDept}
          onEdit={handleEditDept}
        />
        <PolicyEditor
          initialValue={policy}
          onChange={setPolicy}
          title="Company Policies"
        />

        <div className="gap-2 flex justify-center">
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button className="bg-gray-400! border-none!">Cancel</Button>
        </div>
      </Form>
    </div>
  );
}
