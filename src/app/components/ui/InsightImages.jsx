import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Image1 from "../../assets/pexels-artempodrez-5716001.jpg";
import Image2 from "../../assets/istockphoto-1125578452-612x612.jpg";
import Image3 from "../../assets/pexels-mikhail-nilov-6964107.jpg";
import Image4 from "../../assets/pexels-karolina-grabowska-5900251.jpg";
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
        className="rounded-2xl border-5 border-[#00bf91]"
      ></Image>
    </motion.div>
  );
}
