"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Components
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import GoalCard from "../../components/ui/Cards/GoalCard";
import NewGoalModal from "../../components/ui/Modals/NewGoalModal";
import SkeletonGoalCard from "../../components/ui/SkeletonState/SkeletonGoalCard";
// Firebase
import { LuCirclePlus } from "react-icons/lu";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function page() {
  const [isOpen, setIsOpen] = useState(false);
  const [userGoals, setUserGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserDisplayName, setIsUserDisplayName] = useState(true);
  const router = useRouter();

  async function listenToUserGoals(user) {
    const goalsRef = collection(db, "users", user.uid, "goals");
    const unsubscribe = onSnapshot(goalsRef, (snapshot) => {
      const goalsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        savedSoFar: doc.data().savedSoFar,
        name: doc.data().name,
        goalAmount: doc.data().goalAmount,
        targetDate: doc.data().targetDate,
        goalIcon: doc.data().goalIcon,
      }));
      setUserGoals(goalsList);
      setIsLoading(false);
    });
    return unsubscribe;
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.displayName) {
          router.push("/get-started");
        } else {
          listenToUserGoals(user);
          setIsUserDisplayName(false);
        }
      } else {
        router.push("/get-started");
      }
    });
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
          <header className="ml-[70px] lg:h-[65px] lg:border-b border-b-gray-200  flex items-center px-6">
            <div className="text-2xl font-semibold">Goals</div>
          </header>
          <main className="bg-[#f1f5f9] min-h-screen px-4 py-10 mt-0 lg:mt-0 lg:ml-[70px] transition-all duration-500">
            <div className="text-xl font-semibold">Active goals</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              {isLoading ? (
                <SkeletonGoalCard goalCards={6} />
              ) : (
                <>
                  {userGoals.map((goal) => (
                    <GoalCard goal={goal} key={goal.id} />
                  ))}
                  <div
                    className="border border-gray-300 bg-white rounded-lg p-5 lg:p-3 h-[194px] sm:h-[222px] shadow-sm flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <div className="text-3xl text-[#00afa7] mb-3">
                      <LuCirclePlus />
                    </div>
                    <div className="uppercase font-semibold text-[#00afa7]">
                      New Goal
                    </div>
                  </div>
                </>
              )}
              {isOpen && <NewGoalModal setIsOpen={setIsOpen} />}
            </div>
          </main>
        </>
      )}
    </>
  );
}
