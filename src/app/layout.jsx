import "./globals.css";
import "antd/dist/reset.css";
import LayoutClient from "./layout-client";
import {ToastProvider} from "@/components/providers/ToastProvider";
export const metadata = {
  title: "XTVN",
  description: "Next.js + Tailwind + Ant Design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="page-container">
         <ToastProvider />
      <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
