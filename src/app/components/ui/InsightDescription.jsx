import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Image1 from "../../assets/pexels-artempodrez-5716001.jpg";
import Image2 from "../../assets/istockphoto-1125578452-612x612.jpg";
import Image3 from "../../assets/pexels-mikhail-nilov-6964107.jpg";
import Image4 from "../../assets/pexels-karolina-grabowska-5900251.jpg";

export default function InsightDescription({
  active,
  index,
  setActive,
  insight,
}) {
  const images = [Image1, Image2, Image3, Image4];
  return (
    <div
      onClick={() => setActive(index)}
      className="cursor-pointer pb-[35px] flex"
    >
      <div
        className={`hidden lg:block w-[5px] rounded-2xl mr-8 ${
          active === index ? "bg-[#00bf91]" : "bg-[#eaecf7]"
        }`}
      ></div>
      <div className="w-full lg:w-fit">
        <div className="flex items-center justify-between">
          <div
            className={`text-[26px] mb-6 ${
              active === index ? "text-[#00bf91] mb-6" : "lg:mb-0"
            }`}
          >
            {insight.title}
          </div>
          <IoIosArrowDown
            className={
              active == index
                ? "rotate-180 h-6 w-6 max-w-6 transform transition-all duration-[0.3s]"
                : "h-6 w-6 max-w-6"
            }
          />
        </div>
        <div
          className={`lg:hidden w-full h-[3px] rounded-2xl mr-8 ${
            active === index ? "bg-[#00bf91]" : "bg-[#eaecf7]"
          }`}
        ></div>
        <div className="lg:hidden my-6">
          {active === index ? (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5 }}
                key={active}
              >
                <Image
                  src={images[index]}
                  alt="image"
                  className="rounded-2xl border-5 border-[#00bf91]"
                ></Image>
              </motion.div>
            </AnimatePresence>
          ) : null}
        </div>
        <div
          className={`relative h-0 overflow-hidden transform transition-[height] duration-[.35s] ease lg:max-w-[450px] ${
            active === index ? "h-[70px] sm:h-[50px]" : "h-0"
          }`}
        >
          {insight.description}
        </div>
      </div>
    </div>
  );
}
