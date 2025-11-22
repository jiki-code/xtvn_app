import "./globals.css";
import "antd/dist/reset.css";
import LayoutClient from "./layout-client";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { Inter } from "next/font/google";
import StoreProvider from "@/components/providers/StoreProvider";
export const metadata = {
  title: "XTVN",
  description: "App",
};

const inter = Inter({
  weight: ["400"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`} suppressHydrationWarning>
        <StoreProvider>
          <ToastProvider />
          <LayoutClient>{children}</LayoutClient>
        </StoreProvider>
      </body>
    </html>
  );
}
