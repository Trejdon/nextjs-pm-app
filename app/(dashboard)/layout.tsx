import "@/styles/global.css";
import { Inter } from "next/font/google";
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  display: "auto",
  subsets: ["latin"],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head />
      <body className="h-screen w-screen candy-mesh p-6">
        <GlassPane className="w-full h-full flex items-center gap-4">
          <Sidebar />
          {children}
        </GlassPane>
        <div id="modal"></div>
      </body>
    </html>
  );
}
