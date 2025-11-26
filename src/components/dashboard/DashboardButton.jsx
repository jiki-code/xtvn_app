import { useState } from "react";
import { Button } from "antd";
import styles from "@/app/dashboard/HomePage.module.css";

export default function DashboardButton({ type, onClick, isActive, disabled, children }) {
  const [hover, setHover] = useState(false);

  let className = "";
  let style = {};

  const actionable = !disabled; // button is actionable if not disabled

  switch (type) {
    case "checkin":
      className = styles.btncheckin;
      style = {
        background: isActive
          ? "linear-gradient(85deg, rgba(60,108,186, 0), rgba(60, 108, 186, 0))"
          : actionable && hover
            ? "linear-gradient(85deg, #151345, #151345)"
            : "linear-gradient(85deg, #3C6CBA, #151345)",
        border: "1px solid #fff",
        color: isActive ? "rgba(255, 234, 29, 0.5)" : "#FFEA1D",
        cursor: actionable ? "pointer" : "auto",
      };
      break;

    case "break":
      className = styles.btnbreak;
      style = {
        background: isActive
          ? actionable && hover
            ? "linear-gradient(75deg, #5E0000, #5E0000)"
            : "linear-gradient(75deg, #EC1C24, #5E0000)"
          : actionable && hover
            ? "linear-gradient(85deg, #9F8144, #9F8144)"
            : "linear-gradient(75deg, #EBD97F, #9F8144)",
        border: "1px solid #fff",
        color: isActive ? "#FFFFFF" : "#000000",
        cursor: actionable ? "pointer" : "auto",
      };
      break;

    case "checkout":
      className = styles.btncheckout;
      style = {
        background: actionable && hover
          ? "linear-gradient(75deg, #9E9E9E, #9E9E9E)"
          : "linear-gradient(75deg, #E5E5E5, #9E9E9E)",
        border: "1px solid #fff",
        color: isActive ? "#000" : "rgba(0,0,0,0.7)",
        cursor: actionable ? "pointer" : "auto",
      };
      break;

    default:
      break;
  }

  return (
    <Button
      className={className}
      style={style}
      onClick={actionable ? onClick : undefined}
      onMouseEnter={() => actionable && setHover(true)}
      onMouseLeave={() => actionable && setHover(false)}
    >
      {children}
    </Button>
  );
}
