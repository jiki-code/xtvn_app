"use client";

import { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { roleList } from "@/data/common";
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
          username: initialValues.username,
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
      title={initialValues ? "Update user" : "Add new user"}
      onCancel={onCancel}
      onOk={handleOk}
      okText={initialValues ? "Update" : "Create"}
      confirmLoading={confirmLoading}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="username"
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
        <Form.Item name="password" label="Password">
          <Input placeholder="Enter role" />
        </Form.Item>

        <Form.Item name="role" label="Role">
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
