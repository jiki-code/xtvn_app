"use client";

import { Form, Input, Button, Typography, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { reqLogin } from "@/feautures/api/auth";
import { toast } from "react-toastify";
const { Title, Text } = Typography;
import { useDispatch } from "react-redux";
import { storeUser } from "@/redux/store/authSlice";
import { useState } from "react";
export function SignInCard() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    try {
       setLoading(true);
      const res = await reqLogin({
        email: values.email,
        password: values.password,
      });

      const data = res?.data || res;
      const accessToken =
        data?.accessToken ?? data?.token ?? data?.data?.accessToken;
      const refreshToken =
        data?.refreshToken ?? data?.data?.refreshToken ?? null;

      if (typeof window !== "undefined") {
        if (accessToken) localStorage.setItem("authToken", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
      }

      const user = {
        id: data?.user?.id ?? 0,
        name: data?.user?.name ?? "",
        email: data?.user?.email ?? "",
        role: data?.user?.role ?? "",
        accessToken: data?.accessToken ?? "",
        refreshToken: data?.refreshToken ?? "",
        createdAt: data?.user?.createdAt ?? "",
        updatedAt: data?.user?.updatedAt ?? "",

      };
      if (user) localStorage.setItem("user_profile", JSON.stringify(user));
      dispatch(storeUser(user));
      toast.success("Signed in successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
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
          onFinish={onSubmit}
          requiredMark={false}
        >
          {/* EMAIL */}
          <Form.Item
            label={<Text>Email</Text>}
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Email is not valid" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-slate-500" />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          {/* PASSWORD */}
          <Form.Item
            label={<Text>Password</Text>}
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-slate-500" />}
              placeholder="Enter your password"
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
              loading={loading}
              style={{
                backgroundColor: "#151345",
                borderColor: "#151345",
                color: "#fff",
              }}
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
