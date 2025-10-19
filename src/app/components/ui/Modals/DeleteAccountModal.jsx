import { deleteUser } from "firebase/auth";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

export default function DeleteAccountModal({setIsModalOpen, user}) {
    const [loading, setLoading] = useState(false)
  const handleDelete = async () => {
    setLoading(true)
    const promise = new Promise(async (resolve, reject) => {
      try {
        if (!user) throw new Error("No user found");
        await deleteUser(user);
        resolve();
        setLoading(false)
      } catch (error) {
        console.log(error)
        reject(error);
        setLoading(false)
      }
    });

    toast.promise(promise, {
      loading: "Deleting your account...",
      success: "Account deleted 👋",
      error: "Something went wrong while deleting your account.",
    });
  };
  return (
      <div className="fixed inset-0 bg-black/30 z-71 flex justify-center items-center">
        <Toaster />
      <div className="relative max-w-[550px] w-[90%] sm:w-full mx-auto bg-white rounded-xl animate-slide-up -translate-y-20">
        <div className="flex justify-between items-center border-b border-gray-300 p-4">
          <div className="text-lg font-semibold text-[#2f4858]">
            Are you sure?
          </div>
          <IoMdClose className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer" />
        </div>
        <div className="p-4 flex justify-end gap-3">
          <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer">
            Cancel
          </button>
          <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 flex justify-center gap-2 cursor-pointer relative w-20 sm:w-[20%]">
             {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center z-50">
                <div className="w-8 h-8 border-4 border-white border-dashed rounded-full animate-spin"></div>
              </div>
                  ) : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
