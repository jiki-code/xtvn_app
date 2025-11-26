"use client";

import React, { useEffect, useState } from "react";
import { Form, Button } from "antd";
import { WorkingTimeSettings } from "./components/WorkingTimeSettings";
import { RandomCheckSettings } from "./components/RandomCheckSettings";
import { DepartmentSettings } from "./components/DepartmentSettings";
import { PolicyEditor } from "./components/PolicyEditor";
import { defaultPolicyHtml, departmanList } from "@/data/common";
import styles from "./setting.module.css";
const formValues = {
  randomCheckTime: 2,
  randomCheckCount: 2,
  shiftDuration: 2,
  actualWorkingTime: 2,
  maxBreakTime: 2,
  departments: ["Seo", "Social", "Dev"],
  website: "https://dgasigroup.com/",
};
export function SettingList() {
  const [form] = Form.useForm();
  const [policy, setPolicy] = useState(defaultPolicyHtml);
  const [departments, setDepartments] = useState(formValues.departments);
  const [formSubmit, setFormSubmit] = useState(formValues);
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

  useEffect(() => {
    form.setFieldsValue(formSubmit);
  }, [formSubmit, form]);

  const handleChangeValue = (field, value) => {
    setFormSubmit((prev) => ({
      ...prev,
      [field]: value,
    }));

    form.setFieldsValue({ [field]: value });
  };

  return (
    <div className={styles.pageWrapper}>
      {/* <Title level={4}>Setting</Title> */}

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={formValues}
      >
        <RandomCheckSettings form={form} onRandomChange={handleChangeValue} />

        <WorkingTimeSettings form={form} onWorkingChange={handleChangeValue} />
        <DepartmentSettings
          form={form}
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
