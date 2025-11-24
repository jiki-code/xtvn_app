"use client";
import Image from "next/image";
import { Dropdown } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { reqLogOut } from "@/feautures/api/auth";
import { toast } from "react-toastify";

const UserProfile = () => {
  const handleLogout = async () => {
    try {
      const data = await reqLogOut();

      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("users");
      }
      if(data){
        toast.success("Logout succesfully")
        window.location.href = "/auth";

      }
    } catch (err) {
    }
  };

  const items = [
    {
      key: "logout",
      label: (
        <span className="flex items-center gap-2 text-white">
          <LogoutOutlined />
          Logout
        </span>
      ),
      danger: true,
    },
  ];

  const onMenuClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
    }
  };

  return (
    <Dropdown
      menu={{ items, onClick: onMenuClick }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <button className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-slate-100">
        <Image
          src="/icon/i-2.png"
          alt="Profile"
          width={32}
          height={32}
          style={{ borderRadius: "50%", cursor: "pointer" }}
        />
      </button>
    </Dropdown>
  );
};

export { UserProfile };
