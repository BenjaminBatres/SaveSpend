import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import IncomeInput from "../Inputs/IncomeInput";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

export default function UpdateIncomeModal({ setIsModalOpen, userIncomeId }) {
  const [userIncome, setUserIncome] = useState({
    income: 0,
  });
  const [error, setError] = useState("");

  async function updateIncome() {
    if (userIncome.income < 1000) {
      setError("Income must be at least $1,000.");
      return;
    }
    const user = auth.currentUser;
    const incomeRef = doc(db, "users", user.uid, "income", userIncomeId.join());
    try {
      await updateDoc(incomeRef, {
        income: userIncome.income,
      });
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to update income");
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-73">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 animate-slide-up -translate-y-30">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-6 right-3 text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <IoMdClose />
        </button>
        <IncomeInput
          title={"Update Income"}
          fontSize={20}
          marginTop={18}
          setUserIncome={setUserIncome}
          userIncome={userIncome}
        />

        <p className="text-red-500 mt-2 text-sm">{error}</p>
        <button
          className="mt-2 w-full py-3 bg-[#00afa7] rounded-xl text-white font-medium hover:bg-[#007a73] transition-all cursor-pointer"
          onClick={updateIncome}
        >
          Update
        </button>
      </div>
    </div>
  );
}
