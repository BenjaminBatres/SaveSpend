"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import Header from "../../components/Header";
import { motion } from "framer-motion";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import SkeletonBox from "../../components/ui/SkeletonState/SkeletonBox";
import toast, { Toaster } from "react-hot-toast";
import DeleteAccountModal from "../../components/ui/Modals/DeleteAccountModal"

export default function page() {
    const user = auth.currentUser
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [error, setError] = useState('')

  const updateDisplayName = async () => {
    setLoading(true)
    setError('')
    if (displayName.length < 3) {
  setError("Display name must be at least 3 characters long.");

  setLoading(false);
  return;
} else if (displayName.length > 20) {
setError("Display name cannot exceed 20 characters.");
setLoading(false);
return;
}
    const promise = new Promise(async (resolve, reject) => {
      try {
          setLoading(true);
        await updateProfile(user, { displayName });
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        setLoading(false);
      }
    });

    toast.promise(promise, {
      loading: "Saving changes...",
      success: "Display name updated successfully 🎉",
      error: "Failed to update display name. Please try again.",
    });
  
  }



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.displayName) {
          router.push("/get-started");
        } else {
          setCurrentUser(user);
          setIsLoading(false);
        }
      }
    });
  }, []);
  return (
    <>
      <Sidebar />
      <Header title={"Settings"} />
      <main className="bg-[#f1f5f9] min-h-screen px-4 pt-10 lg:ml-[70px]">
        <div className="max-w-2xl mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-[#2f4858] mb-8">
            Account Settings
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#2f4858]">
                Email
              </label>
              {isLoading ? (
                <SkeletonBox
                  height={42}
                  width={"100%"}
                  borderRadius={8}
                  marginTop={4}
                />
              ) : (
                <input
                  type="email"
                  value={currentUser.email}
                  disabled
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-gray-700"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2f4858]">
                Display Name
              </label>
              {isLoading ? (
                <SkeletonBox
                  height={42}
                  width={"100%"}
                  borderRadius={8}
                  marginTop={4}
                />
              ) : (
                <input
                  type="text"
                  placeholder={currentUser.displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-[#00bf91] outline-none"
                />
              )}
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            <Toaster />
            {isLoading ? (
              <div className="flex flex-col sm:flex-row gap-2">
                <SkeletonBox height={42} width={"100%"} borderRadius={12} />
                <SkeletonBox height={42} width={"100%"} borderRadius={12} />
              </div>
            ) : (
              <div className={`flex flex-col justify-between sm:flex-row gap-3 ${error ? 'mt-0' : 'mt-6'}`}>
                <button onClick={updateDisplayName} className="h-10 w-full bg-[#00bf91] text-white py-2 rounded-xl font-medium hover:bg-[#00a47c] transition duration-300 relative">
                  {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center z-50">
                <div className="w-8 h-8 border-4 border-white border-dashed rounded-full animate-spin"></div>
              </div>
                  ) : "Save Changes"}
                </button>

                <button onClick={() => setIsModalOpen(true)} className="w-full border border-red-400 text-red-500 py-2 rounded-xl font-medium hover:bg-red-50 transition duration-300">
                  Delete Account
                </button>
                {isModalOpen && <DeleteAccountModal setIsModalOpen={setIsModalOpen} user={user}/>}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
