"use client";

import { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { roleList, departmanList } from "@/data/common";
const UserFormModal = ({
  open,
  initialValues,
  onCancel,
  onSubmit,
  confirmLoading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
      if (initialValues) {
        form.setFieldsValue({
          name: initialValues.name,
          email: initialValues.email,
          role: initialValues.role,
          password: initialValues.password,
          department: initialValues.department,
          user_id: initialValues.user_id
        });
      }
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
    } catch (err) {
      if (err?.errorFields) return;
      console.error(err);
    }
  };

  return (
    <Modal
      open={open}
      title="Create new staff"
      onCancel={onCancel}
      onOk={handleOk}
      okText="Create"
      confirmLoading={confirmLoading}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Enter user name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter mail" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item name="user_id" label="Employee ID">
          <Input placeholder="Enter Employee ID" />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input.Password
            placeholder="Enter password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item name="department" label="Department">
          <Select
            placeholder="Select Department"
            className="w-full"
            onChange={(value) => console.log("Selected:", value)}
            options={departmanList}
          ></Select>
        </Form.Item>
        <Form.Item name="role" label="Position">
          <Select
            placeholder="Select Role"
            className="w-full"
            onChange={(value) => console.log("Selected:", value)}
            options={roleList}
          ></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormModal;
