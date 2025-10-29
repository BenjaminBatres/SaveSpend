import React from "react";
import SignUpImage from "../assets/undraw_secure-login_m11a.svg";
import Image from "next/image";
import SignUpModal from "../components/ui/Modals/SignUpModal";

export default function SignUpPrompt({setIsOpen, isOpen}) {
  return (
    <div className="flex flex-col justify-center items-center mt-10 lg:mt-0">
      <div className="text-3xl font-bold mb-4 text-center text-[#2f4858]">
        Join Us today!
      </div>
      <p className="text-center mb-6 text-[#2f4858]">
        Create your free account and start tracking your finances smarter.
      </p>
      <Image
        src={SignUpImage}
        alt="Sign Up Illustration"
        className="w-[300px] md:w-[40%]  mb-8"
      />
      <button
        onClick={() => setIsOpen(true)}
        className="w-50 py-3 px-4 bg-[#00bf91] text-white rounded-md hover:bg-[#00a47c] transition cursor-pointer"
      >
        Sign Up
      </button>
      {isOpen && <SignUpModal onClose={setIsOpen} />}
    </div>
  );
}
