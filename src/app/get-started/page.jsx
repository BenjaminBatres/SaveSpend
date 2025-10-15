"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Components
import Footer from "../components/Home/Footer";
import BillsInput from "../components/ui/Inputs/BillsInput";
import SubscriptionInput from "../components/ui/Inputs/SubscriptionInput";
import AccountForm from "../components/AccountForm";
// Firbase
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function page() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Category");
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");

  const router = useRouter();

  const [userExpenses, setUserExpenses] = useState({
    title: "",
    amount: 0,
  });
  const [userIncome, setUserIncome] = useState({
    income: 0,
  });
  const [userDisplayName, setUserDisplayName] = useState({});

  const options = [
    "Utilities",
    "Gas",
    "Internet & Cable",
    "Travel",
    "Phone",
    "Groceries",
    "Other",
  ];

  const addToCollection = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (userDisplayName.length < 3) {
      setError("Display name must be at least 3 characters long.");

      setLoading(false);
      return;
    } else if (userDisplayName.length > 20) {
      setError("Display name cannot exceed 20 characters.");
      setLoading(false);
      return;
    }
    await updateProfile(user, {
      displayName: userDisplayName,
    });
    const userExpensesRef = await addDoc(
      collection(db, "users", user.uid, "expenses"),
      userExpenses
    );
    const userIncomeRef = await addDoc(
      collection(db, "users", user.uid, "income"),
      userIncome
    );
    setStep(3);
  };

  const progress =
    step === 1 ? 50 : step === 2 ? 75 : step === 3 ? 85 : step === 4 ? 95 : 100;
  useEffect(() => {
    let num = 0;
    function timer() {
      num++;
      if (num >= 2) {
        clearInterval(stopTimer);
        setIsLoading(false);
      }
    }
    timer();
    const stopTimer = setInterval(timer, 1500);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.displayName) {
          setStep(2);
        } else {
          router.push("/dashboard");
        }
      }
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="w-16 h-16 border-4 border-[#00bf91] border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-[1440px] mx-auto w-full">
          <nav className="h-20 flex items-center justify-between p-5">
            <Link
              href={"/"}
              className="text-4xl sm:text-6xl text-[#00bf91] tracking-tighter"
            >
              SaveSpend
            </Link>
            {step < 2 && (
              <div className="flex items-center gap-5">
                <div className="hidden sm:block">
                  {isLogin ? "Have an account?" : "Login?"}
                </div>
                <button
                  className="cursor-pointer text-[#00bf91] rounded-[20px] border-1 border-[#00bf91] py-2 px-4 font-semibold transition-all duration-300 hover:bg-[#00bf91] hover:text-white"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? <div>Create</div> : <div>Sign In</div>}
                </button>
              </div>
            )}
          </nav>
          <div className="w-full h-[10px] bg-[#F0F5FA] flex">
            <div
              className="bg-[#00bf91] h-[10px] rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {step === 1 && (
            <>
              <AccountForm
                setIsLoading={setIsLoading}
                setStep={setStep}
                setIsLogin={setIsLogin}
                isLogin={isLogin}
              />
            </>
          )}
          {step === 2 && (
            <div className="flex flex-col items-center">
              <div className="pt-20 pb-10 sm:w-[550px]">
                <div className="text-[32px] lg:text-5xl text-center">
                  Let's get started
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-end">
                <div className="flex flex-col w-[90%] gap-4 px-4 sm:px-1">
                  <div>
                    <label htmlFor="income" className="text-sm font-semibold">
                      What is your name?
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setUserDisplayName(e.target.value)}
                      required
                      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00bf91] outline-none"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="income" className="text-sm font-semibold">
                      What is your average income?
                    </label>
                    <input
                      required
                      type="number"
                      min={0}
                      onChange={(e) =>
                        setUserIncome({
                          ...userIncome,
                          income: e.target.value,
                        })
                      }
                      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00bf91] outline-none"
                      placeholder="$5,000"
                    />
                  </div>
                  <div>
                    <label htmlFor="income" className="text-sm font-semibold">
                      List a monthly recurring payment
                    </label>
                    <div
                      className="border border-gray-300 rounded-md px-3 py-2 text-left bg-gray-200 cursor-pointer"
                      onClick={() => setOpen(!open)}
                    >
                      {selected}
                      <span className="ml-2 text-sm text-gray-500">▼</span>
                    </div>
                    {open && (
                      <ul className="absolute mt-1 w-[25%] bg-white border border-gray-300 rounded-md shadow-lg z-9">
                        {options.map((opt) => (
                          <li
                            key={opt}
                            onClick={() => {
                              setSelected(opt);
                              setOpen(false);
                              setUserExpenses({ ...userExpenses, title: opt });
                            }}
                            className="px-3 py-2 hover:bg-[#00afa7] hover:text-white cursor-pointer"
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="relative group mt-7">
                      <input
                        type="number"
                        id="expense"
                        min={0}
                        onChange={(e) => {
                          setUserExpenses({
                            ...userExpenses,
                            amount: parseFloat(e.target.value),
                          });
                          setCount(e.target.value);
                        }}
                        placeholder="$0.00"
                        className="rounded-md border border-gray-600 w-full px-3 py-2 placeholder-gray-500 focus:border-[#00afa7] focus:outline-none focus:ring-1 focus:ring-[#00afa7] mb-3"
                      />

                      <label
                        htmlFor="expense"
                        className="text-xs absolute bg-white px-1 -top-2 left-2 group-focus-within:text-[#00afa7]"
                      >
                        Monthly amount
                      </label>
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  {selected !== "Category" &&
                    count >= 1 &&
                    userDisplayName !== "" &&
                    userIncome.income >= 1 && (
                      <button
                        className="bg-[#00bf91] hover:bg-[#019c78] rounded-2xl text-white cursor-pointer transition relative h-13 disabled:opacity-70 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={loading}
                        onClick={addToCollection}
                      >
                        {loading ? (
                          <div className="absolute inset-0 flex items-center justify-center z-50">
                            <div className="w-10 h-10 border-4 border-white border-dashed rounded-full animate-spin"></div>
                          </div>
                        ) : (
                          <div>Continue</div>
                        )}
                      </button>
                    )}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center mb-6">
              <div className="pt-20 pb-10 sm:w-[550px]">
                <div className="text-[32px] lg:text-5xl text-center">
                  Let's get started
                </div>
              </div>
              <div className="sm:w-[450px] h-[550px]">
                <div className="flex flex-col items-center sm:items-end">
                  <div className="flex flex-col w-[90%] px-4 sm:px-1">
                    <BillsInput setStep={setStep} isStep={true} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="flex flex-col items-center mb-6">
              <div className="pt-20 pb-10 sm:w-[550px]">
                <div className="text-[32px] lg:text-5xl text-center">
                  Let's get started
                </div>
              </div>
              <div className="sm:w-[450px] h-[550px]">
                <div className="flex flex-col items-center sm:items-end">
                  <div className="flex flex-col w-[90%] px-4 sm:px-1">
                    <SubscriptionInput setStep={setStep} isStep={true} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <div className="w-16 h-16 border-4 border-[#00bf91] border-dashed rounded-full animate-spin"></div>
            </div>
          )}
          {step === 1 && <Footer />}
        </div>
      )}
    </>
  );
}
