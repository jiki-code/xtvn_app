"use client";

import React, { useState } from "react";
import {
  Card,
  Typography,
  Space,
  Input,
  Button,
  Form,
  Tooltip,
  Divider,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "../setting.module.css";

export function DepartmentSettings({ form, departments, onAdd, onDelete, onEdit }) {
  const [newDept, setNewDept] = useState("");
  const [editable, setEditable] = useState(false);
  const handleAddClick = () => {
    const trimmed = newDept.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setNewDept("");
  };
    const website = form.getFieldValue("website");

  return (
    <Card title="Department" className={styles.containerCard}>
      <Divider className="border-t-gray-200/70! border mt-[-25px]!" />

      <div className="flex w-full flex-col mt-[-10px]">
        <span className="text-gray-400! pb-4">
          Add, delete or edit system part name
        </span>

        {departments.map((dept, index) => (
          <Space.Compact className="w-1/4 pb-3" key={index}>
            <Input
              value={dept}
              className="border border-gray-400/65!"
              disabled={!editable}
              onChange={(e) => onEdit(index, e.target.value)}
              suffix={
                <div className="flex items-center gap-2 pr-1">
                  <Tooltip title="Edit">
                    <EditOutlined
                      onClick={() => setEditable(!editable)}
                      className={`cursor-pointer text-lg hover:text-blue-200! ${
                        editable ? "text-blue-500! " : "text-gray-500! "
                      }`}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <DeleteOutlined
                      onClick={() => onDelete(index)}
                      className="text-red-500! text-lg hover:text-red-200! cursor-pointer"
                    />
                  </Tooltip>
                </div>
              }
            />
          </Space.Compact>
        ))}
        <Space className="w-full pb-3">
          <Input
            style={{ width: "270px" }}
            placeholder="Add new department"
            value={newDept}
            onChange={(e) => setNewDept(e.target.value)}
          />
          <Button
            className="!h-[33px]"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddClick}
          >
            Add parts
          </Button>
        </Space>
      </div>

      <div className="w-full flex items-center">
        <label className="w-[90px] text-md font-semibold">Link website</label>
        <Input value={website} className="!w-[180]" />
      </div>
    </Card>
  );
}
