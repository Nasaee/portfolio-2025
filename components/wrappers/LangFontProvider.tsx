"use client";
import { useLangStore } from "@/store/useLangStore";
import { useEffect } from "react";

export default function LangFontProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = useLangStore((s) => s.lang);

  useEffect(() => {
    // อัปเดต <html lang="..."> เพื่อ SEO + a11y
    document.documentElement.lang = lang;

    // ใส่ class สำหรับเลือกฟอนต์
    document.documentElement.classList.remove("font-poppins", "font-kanit");
    document.documentElement.classList.add(
      lang === "en" ? "font-poppins" : "font-kanit"
    );
  }, [lang]);

  return (
    <div className={lang === "en" ? "font-poppins" : "font-kanit"}>
      {children}
    </div>
  );
}
