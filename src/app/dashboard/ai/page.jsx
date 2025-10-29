"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from "react";
// Components
import ChatInterface from "../../components/ChatInterface";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import Header from "../../components/Header";
import SignUpPrompt from "../../components/SignUpPrompt";
// Firebase
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ai() {
  const [isUserDisplayName, setIsUserDisplayName] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("budgetSetup"));
    if (!data) {
       onAuthStateChanged(auth, (user) => {
        if (user) {
          if (!user.displayName) {
            router.push("/get-started");
          } else {
            setIsUserDisplayName(false);
            setIsLogin(true)
          }
        } else {
          router.push("/get-started");
        }
      });
    }
  }, []);
  return (
    <>
      {isUserDisplayName ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="w-16 h-16 border-4 border-[#00bf91] border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <Sidebar />
          <Header title={"AI Assistant"} />
          <main className="bg-[#f1f5f9] min-h-screen px-4 pt-10 mt-0 lg:mt-0 lg:ml-[70px] transition-all duration-500">
            {isLogin ? (
              <div className="bg-[#e6efff] mt-10 sm:mt-0 p-3 max-w-[1200px] mx-auto w-full">
                <ChatInterface />
              </div>
            ) : (
              <SignUpPrompt isOpen={isOpen} setIsOpen={setIsOpen} />
            )}
          </main>
        </>
      )}
    </>
  );
}
