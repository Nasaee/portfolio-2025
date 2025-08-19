import type { Metadata } from "next";
import { Poppins, Kanit } from "next/font/google";
import "./globals.css";
import LangFontProvider from "@/components/wrappers/LangFontProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  // ผู้ใช้จะเห็น text ทันที (ด้วย fallback font เช่น Arial, system-ui) แล้วพอ Poppins/Kanit โหลดเสร็จ → browser จะ สลับ (swap) ไปใช้ฟอนต์จริง
  display: "swap",
});

const kanit = Kanit({
  variable: "--font-kanit",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["thai"],
  // ผู้ใช้จะเห็น text ทันที (ด้วย fallback font เช่น Arial, system-ui) แล้วพอ Poppins/Kanit โหลดเสร็จ → browser จะ สลับ (swap) ไปใช้ฟอนต์จริง
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nasaee Portfolio",
  description: "A portfolio showcasing my work and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // กัน hydration warning
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${kanit.variable} antialiased`}>
        <LangFontProvider>{children}</LangFontProvider>
      </body>
    </html>
  );
}
