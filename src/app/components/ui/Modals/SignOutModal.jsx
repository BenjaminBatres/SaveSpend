import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

export default function SignOutModal({ setIsOpen }) {
  const [loading, setLoading] = useState(false);
  async function handleSignOut() {
    try {
      await signOut(auth);
      window.location.href = "/get-started";
      setLoading(true);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-73 ">
      <div className="relative bg-white rounded-2xl shadow-lg w-[90%] max-w-sm p-6 animate-fade-in -translate-y-20">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          disabled={loading}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 transition cursor-pointer"
        >
          <IoMdClose />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Sign Out</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to sign out of your account?
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            <button
              disabled={loading}
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
            >
              Cancel
            </button>
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="h-11 rounded-lg bg-[#00afa7] text-white hover:bg-[#00988f] transition cursor-pointer relative w-[30%] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center z-50">
                  <div className="w-8 h-8 border-4 border-white border-dashed rounded-full animate-spin"></div>
                </div>
              ) : (
                <div>Sign Out</div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
