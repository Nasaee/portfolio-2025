import React from "react";
import { motion } from "motion/react";
import { useLangStore } from "@/store/useLangStore";

interface SwitchProps {
  colorOn?: string; // TH
  colorOff?: string; // EN
  width?: number;
}

const SwitchLanguage: React.FC<SwitchProps> = ({
  colorOn = "#7048e8",
  colorOff = "#845ef7",
  width = 60,
}) => {
  const lang = useLangStore((s) => s.lang);
  const setLang = useLangStore((s) => s.setLang);
  const isTH = lang === "th";

  // geometry
  const trackPadding = 4; // px
  const knobSize = 16; // px
  const travel = Math.max(width - (trackPadding * 2 + knobSize), 0);

  return (
    <div
      className="relative inline-block h-[25px] rounded-full select-none cursor-pointer overflow-hidden"
      style={{ width }}
      role="switch"
      aria-checked={isTH}
      aria-label="Toggle language"
    >
      {/* input overlay: คลิกได้ทั้งพื้นที่ */}
      <input
        type="checkbox"
        className="absolute inset-0 z-20 opacity-0 cursor-pointer"
        checked={isTH}
        onChange={(e) => setLang(e.target.checked ? "th" : "en")}
      />

      {/* พื้นหลัง (อย่าให้บังคลิก) */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={false}
        animate={{ backgroundColor: isTH ? colorOn : colorOff }}
        transition={{ type: "tween", duration: 0.25 }}
      />

      {/* ปุ่มกลม */}
      <motion.div
        className="absolute top-1 left-1 z-10 rounded-full bg-white shadow-sm pointer-events-none"
        style={{ width: knobSize, height: knobSize }}
        initial={false}
        animate={{ x: isTH ? travel : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* EN (ซ้าย) */}
        <motion.span
          className="absolute left-7 h-full flex items-center text-white text-[10px] font-semibold"
          initial={false}
          animate={{ opacity: isTH ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
        >
          TH
        </motion.span>

        {/* TH (ขวา) */}
        <motion.span
          className="absolute right-7 h-full flex items-center text-white text-[10px] font-semibold"
          initial={false}
          animate={{ opacity: isTH ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        >
          EN
        </motion.span>
      </motion.div>
    </div>
  );
};

export default SwitchLanguage;
