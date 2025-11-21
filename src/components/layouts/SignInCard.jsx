"use client";

import { Form, Input, Button, Typography, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const SignInCard = ({ setState }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Sign in values:", values);
    // TODO: call API / dispatch redux / toast...
  };

  return (
    <div className=" flex items-center justify-center bg-slate-100 rounded-xl">
      <Card className="w-full max-w-md shadow-xl border border-slate-200">
        <div className="mb-2 text-center">
          <Title level={3} className="!mb-1">
            Sign in to XTVN
          </Title>
          <Text type="secondary">
            Enter your credentials to access the dashboard.
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Email is not valid" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-slate-500" />}
              placeholder="you@example.com"
              size="large"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-slate-500" />}
              placeholder="••••••••"
              size="large"
            />
          </Form.Item>

          {/* Submit */}
          <Form.Item className="mt-3">
            <Button color="cyan" variant="solid" className="w-full py-2">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
