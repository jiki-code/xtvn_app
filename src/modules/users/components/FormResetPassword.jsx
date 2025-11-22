"use client";

import { useState } from "react";
import { Modal, Input } from "antd";
const FormResetPassword = ({ open, onCancel, onSubmit }) => {
  const [input, setInput] = useState("");
  const handleOk = async () => {
    if (!input) return;
    await onSubmit(input);
  };

  return (
    <Modal
      open={open}
      width={320}
      centered
      title="Reset Password"
      onCancel={onCancel}
      onOk={handleOk}
      okText={"Save"}
      classNames="bg-white"
    >
      <div className="px-3 py-2">
        <Input
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          placeholder="Enter New Password"
        />
      </div>
    </Modal>
  );
};

export default FormResetPassword;
