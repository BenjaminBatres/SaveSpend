import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Image1 from "../../assets/undraw_send-money_4qc7.svg";
import Image2 from "../../assets/undraw_notify_rnwe.svg";
import Image3 from "../../assets/undraw_focused_m9bj.svg";
import Image4 from "../../assets/undraw_confident_9v38.svg";
export default function InsightImages({ active }) {
  const images = [Image1, Image2, Image3, Image4];
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={images[active]}
        alt="image"
        className="rounded-2xl border-4 border-[#00bf91] max-h-[430px] object-cover object-top"
      ></Image>
    </motion.div>
  );
}
