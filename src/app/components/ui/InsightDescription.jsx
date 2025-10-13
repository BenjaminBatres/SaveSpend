import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Image1 from "../../assets/undraw_send-money_4qc7.svg";
import Image2 from "../../assets/undraw_notify_rnwe.svg";
import Image3 from "../../assets/undraw_focused_m9bj.svg";
import Image4 from "../../assets/undraw_confident_9v38.svg";

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
            className={`text-[26px] mb-6 mr-4 ${
              active === index ? "text-[#00bf91] mb-6" : "lg:mb-0 text-[#2f4858]"
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
                  className="rounded-2xl border-3 border-[#00bf91] max-h-[500px] w-full "
                ></Image>
              </motion.div>
            </AnimatePresence>
          ) : null}
        </div>
        <div
          className={`relative h-0 overflow-hidden transform transition-[height] duration-[.35s] ease lg:max-w-[450px] text-gray-800 ${
            active === index ? "h-[70px] sm:h-[50px]" : "h-0"
          }`}
        >
          {insight.description}
        </div>
      </div>
    </div>
  );
}
