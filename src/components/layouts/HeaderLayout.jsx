import Image from "next/image";
import { Layout } from "antd";
import {UserProfile} from "../ui/UserProfile";

const { Header } = Layout;
const HeaderApp = () => {
  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 50,
        zIndex: 100,
        background: "#151345",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 24px 0 50px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      {/* Left: Logo */}
      <div>
        {/* MyLogo */}
        <Image
          src="/icon/logo-1.png"
          alt="Language"
          width={80}
          height={50}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Right: Theme toggle + Language + Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Theme toggle switch */}
        {/* <Switch
                checked={isDark}
                onChange={toggleTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
              /> */}
        <Image
          src="/icon/i-1.png"
          alt="Language"
          width={36}
          height={36}
          style={{ cursor: "pointer" }}
        />
  
        <UserProfile />
      </div>
    </Header>
  );
};

export { HeaderApp };
