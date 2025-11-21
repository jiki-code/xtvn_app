"use client";

import { Form, Input, Button, Typography, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

export function SignInCard () {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Login values:", values);
   
  };

  return (
     <div className="flex items-center justify-center bg-slate-100 rounded-xl">
      <Card className="w-full max-w-md shadow-lg border border-slate-200">
        <div className="mb-4 text-center">
          <Title level={3} className="!mb-1">
            Sign in to XTVN
          </Title>
          <Text type="secondary">
            Please sign in to continue to the dashboard.
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          {/* EMAIL / USERNAME */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Email is not valid" },
            ]}
          >
              <Typography level={5}>Email</Typography>
            <Input
              prefix={<UserOutlined className="text-slate-500" />}
              placeholder="enter your password"
              size="large"
            />
          </Form.Item>

          {/* PASSWORD */}
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
             <Typography level={3}>Password</Typography>
            <Input.Password
              prefix={<LockOutlined className="text-slate-500" />}
              placeholder="enter your password"
              size="large"
            />
          </Form.Item>

          {/* SUBMIT BUTTON */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>

        {/* FOOTER */}
        <div className="mt-2 text-center">
          <Text type="secondary" className="text-xs">
            By continuing, you agree to our Terms & Privacy Policy.
          </Text>
        </div>
      </Card>
    </div>
  );
}
