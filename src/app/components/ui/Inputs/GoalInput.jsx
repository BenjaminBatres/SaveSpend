import React, { useState } from "react";
import { BiCustomize } from "react-icons/bi";
import { BsEmojiSunglasses } from "react-icons/bs";
import { FaUmbrellaBeach, FaCarAlt } from "react-icons/fa";
import { GiLinkedRings } from "react-icons/gi";
import { TbHomeDollar } from "react-icons/tb";
import { auth, db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function GoalInput({ setIsOpen, isGoal, setIsGoal }) {
  const [goalActive, setGoalActive] = useState(0);
  const [value, setValue] = useState("");
  const [goalAmountError, setGoalAmountError] = useState("");
  const [targetDateError, setTargetDateError] = useState("");
  const [savedSoFarError, setSavedSoFarError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userGoal, setUserGoal] = useState({
    name: "",
    goalAmount: 0,
    savedSoFar: 0,
    targetDate: "",
    goalIcon: "",
  });

  const goals = [
    { icon: <FaUmbrellaBeach />, title: "Emergency Fund" },
    { icon: <FaCarAlt />, title: "Car" },
    { icon: <BsEmojiSunglasses />, title: "Vacation" },
    { icon: <TbHomeDollar />, title: "Home" },
    { icon: <GiLinkedRings />, title: "Wedding" },
    { icon: <BiCustomize />, title: "Custom" },
  ];

  const goalsIcon = [
    <FaUmbrellaBeach />,
    <FaCarAlt />,
    <BsEmojiSunglasses />,
    <TbHomeDollar />,
    <GiLinkedRings />,
    <BiCustomize />,
  ];

  const goalsTitle = [
    "Emergency Fund",
    "Car",
    "Vacation",
    "Home",
    "Wedding",
    "Custom",
  ];

  const handleGoal = (id) => {
    setGoalActive(id);
    setIsGoal(true);
    setValue(goalsTitle[id]);
    setUserGoal((prev) => ({
      ...prev,
      goalIcon: goalsTitle[id],
      name: goalsTitle[id],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setGoalAmountError("");
    setTargetDateError("");
    setSavedSoFarError("");
    const { goalAmount, targetDate, savedSoFar } = userGoal;
    const saved = Number(savedSoFar);
    const goal = Number(goalAmount);

    if (isNaN(saved) || saved < 0 || saved > goal) {
      setSavedSoFarError(
        "Amount saved must be at least 0 and not exceed the goal amount."
      );
      setLoading(false);
      return;
    }

    const selectedDate = new Date(targetDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      setTargetDateError("Target date must be after today.");
      setLoading(false);
      return;
    }
    const user = auth.currentUser;
    await addDoc(collection(db, "users", user.uid, "goals"), userGoal);
    setIsOpen(false);
  };
  return (
    <div className="flex flex-wrap justify-center gap-2 my-5">
      {!isGoal ? (
        <>
          {goals.map((item, id) => (
            <div
              className="w-[43%] sm:w-[30%] border border-gray-200 flex flex-col items-center justify-center px-5 py-4 rounded-[10px] cursor-pointer shadow-md hover:bg-gray-200 transition-all duration-300 ease-in"
              key={id}
              onClick={() => handleGoal(id)}
            >
              <div className="text-4xl text-[#00afa7] mb-2">{item.icon}</div>
              <div className="text-[13px] text-center">{item.title}</div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col sm:flex-row">
          <div className="hidden w-[20%] sm:flex justify-center">
            <div className="text-5xl text-[#00afa7]">
              {goalsIcon[goalActive]}
            </div>
          </div>
          <div className="flex flex-col sm:w-[80%]">
            <div className="relative group flex gap-6">
              <input
                type="text"
                id="goal"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value),
                    setUserGoal({ ...userGoal, name: e.target.value });
                }}
                placeholder={goalsTitle[goalActive]}
                className="rounded-md border border-gray-600 w-[70%] px-3 py-2 placeholder-gray-500 focus:border-[#00afa7] focus:outline-none focus:ring-1 focus:ring-[#00afa7] mb-5"
              />
              <label
                htmlFor="goal"
                className="text-xs mb-1 absolute bg-white -top-2 left-2 px-1 group-focus-within:text-[#00afa7]"
              >
                Name you goal
              </label>
              <div className="text-5xl text-[#00afa7] sm:hidden">
                {goalsIcon[goalActive]}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="relative group">
                <input
                  type="number"
                  id="goal"
                  min={0}
                  onChange={(e) =>
                    setUserGoal({
                      ...userGoal,
                      goalAmount: e.target.value,
                    })
                  }
                  placeholder="$0.00"
                  className={`rounded-md border border-gray-600 w-[90%] px-3 py-2 placeholder-gray-500 focus:outline-none  mb-5 ${
                    goalAmountError
                      ? "border-2 border-red-500"
                      : "focus:border-[#00afa7] focus:ring-[#00afa7] focus:ring-1"
                  }`}
                />
                <label
                  htmlFor="goal"
                  className={`text-xs mb-1 absolute bg-white px-1 -top-2 left-2 ${
                    goalAmountError
                      ? "text-red-500"
                      : "group-focus-within:text-[#00afa7]"
                  }`}
                >
                  Goal amount
                </label>
              </div>
              <div className="relative group">
                <input
                  type="number"
                  id="goal"
                  min={0}
                  onChange={(e) =>
                    setUserGoal({
                      ...userGoal,
                      savedSoFar: e.target.value,
                    })
                  }
                  placeholder="$0.00"
                  className={`rounded-md border border-gray-600 w-[90%] px-3 py-2 placeholder-gray-500 focus:outline-none  mb-5 ${
                    savedSoFarError
                      ? "border-2 border-red-500"
                      : "focus:border-[#00afa7] focus:ring-[#00afa7] focus:ring-1"
                  }`}
                />
                <label
                  htmlFor="goal"
                  className={`text-xs mb-1 absolute bg-white px-1 -top-2 left-2 ${
                    savedSoFarError
                      ? "text-red-500"
                      : "group-focus-within:text-[#00afa7]"
                  }`}
                >
                  Saved so far
                </label>
              </div>
              <div className="relative group">
                <input
                  type="date"
                  id="goal"
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setUserGoal({
                      ...userGoal,
                      targetDate: e.target.value,
                    })
                  }
                  placeholder="$0.00"
                  className={`rounded-md border border-gray-600 sm:w-[90%] px-3 py-2 placeholder-gray-500 focus:outline-none mb-5 ${
                    targetDateError
                      ? "border-2 border-red-500"
                      : "focus:border-[#00afa7] focus:ring-[#00afa7] focus:ring-1"
                  }`}
                />
                <label
                  htmlFor="goal"
                  className={`text-xs mb-1 absolute bg-white px-1 -top-2 left-2 ${
                    targetDateError
                      ? "text-red-500"
                      : "group-focus-within:text-[#00afa7]"
                  }`}
                >
                  Target Date
                </label>
              </div>
            </div>
            {goalAmountError && (
              <p className="text-red-500 mb-4">{goalAmountError}</p>
            )}
            {targetDateError && (
              <p className="text-red-500 mb-4">{targetDateError}</p>
            )}
            {savedSoFarError && (
              <p className="text-red-500 mb-4">{savedSoFarError}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={
                !userGoal.name || !userGoal.goalAmount || !userGoal.targetDate
              }
              className={`sm:w-[96%] py-3 h-13 rounded-xl text-white font-medium  transition-all relative ${
                !userGoal.name || !userGoal.goalAmount || !userGoal.targetDate
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#00afa7] hover:bg-[#007a73] cursor-pointer"
              }`}
            >
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center  z-50">
                  <div className="w-10 h-10 border-4 border-white border-dashed rounded-full animate-spin"></div>
                </div>
              ) : (
                <div>Add Goal</div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
