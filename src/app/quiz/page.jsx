"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiChatAiLine } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";

import SavingImage from "../assets/undraw_savings_uwjn.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/ui/SkeletonState/LoadingSpinner";
import BottomImage from "../assets/undraw_reading_c1xl.svg";
import QuestionStep from "../components/ui/Quiz/QuestionStep";

export default function page() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    income: "",
    bill: "",
    billCost: "",
    subscription: "",
    subscriptionCost: "",
    goal: "",
    goalCost: "",
    expense: "",
    expenseCost: "",
  });

  const progress =
    step === 1
      ? (1 / 9) * 100
      : step === 2
      ? (2 / 9) * 100
      : step === 3
      ? (3 / 9) * 100
      : step === 4
      ? (4 / 9) * 100
      : step === 5
      ? (5 / 9) * 100
      : step === 6
      ? (6 / 9) * 100
      : step === 7
      ? (7 / 9) * 100
      : step === 8 
      ? (8 / 9) * 100
      : 100;

  const steps = [
    {
      title: "What's your monthly income?",
      options: [
        { label: "$2000", value: 2000 },
        { label: "$2500", value: 2500 },
        { label: "$3500", value: 3500 },
        { label: "$4000", value: 4000 },
      ],
      key: "income",
    },
    {
      title: "Which is your monthly recurring payment?",
      options: [
        { label: "Utilities", value: "Utilities", emoji: "🛠️" },
        { label: "Gas", value: "Gas", emoji: "⛽" },
        { label: "Groceries", value: "Groceries", emoji: "🛍️" },
        { label: "Internet & Cable", value: "Internet & Cable", emoji: "🛜" },
        { label: "Travel", value: "Travel", emoji: "✈️" },
        { label: "Phone", value: "Phone", emoji: "📱" },
      ],
      key: "expense",
    },
    {
      title: "Monthly recurring cost.",
      options: [
        { label: "$50", value: 50 },
        { label: "$100", value: 100 },
        { label: "$300", value: 300 },
        { label: "$500", value: 500 },
        { label: "$1000", value: 1000 },
      ],
      key: "expenseCost",
    },
    {
      title: "Select a bill that you may have to pay.",
      options: [
        { label: "Car Insurance", value: "Car Insurance", emoji: "💰" },
        { label: "Student Loan", value: "Student Loan", emoji: "🏛️" },
        {
          label: "Homeowner Insurance",
          value: "Homeowner Insurance",
          emoji: "🔑",
        },
        { label: "Rent", value: "Rent", emoji: "💵" },
      ],
      key: "bill",
    },
    {
      title: "Bill Cost.",
      options: [
        { label: "$100", value: 100 },
        { label: "$500", value: 500 },
        { label: "$800", value: 800 },
        { label: "$1000", value: 1000 },
      ],
      key: "billCost",
    },
    {
      title: "Select a subscription that you may have to pay.",
      options: [
        { label: "Netflix", value: "Netflix", emoji: "🍿" },
        { label: "Music", value: "Music", emoji: "🎵" },
        { label: "Gym", value: "Gym", emoji: "💪🏼" },
        { label: "Sports", value: "Sports", emoji: "🏈" },
      ],
      key: "subscription",
    },
    {
      title: "Subscription Cost.",
      options: [
        { label: "$10.00", value: 10 },
        { label: "$15.00", value: 15 },
        { label: "$20.00", value: 20 },
        { label: "$30.00", value: 30 },
      ],
      key: "subscriptionCost",
    },
    {
      title: "Select a goal that may work for you.",
      options: [
        { label: "Car", value: "Car", emoji: "🚗" },
        { label: "Home", value: "Home", emoji: "🏡" },
        { label: "Vacation", value: "Vacation", emoji: "🌴" },
        { label: "Emergency Fund", value: "Emergency Fund", emoji: "🚨" },
      ],
      key: "goal",
    },
    {
      title: "Goal cost.",
      options: [
        { label: "$5,000", value: 5000 },
        { label: "$10,000", value: 10000 },
        { label: "$20,000", value: 20000 },
        { label: "$30,000", value: 30000 },
      ],
      key: "goalCost",
    },
  ];
  const prevStep = () => setStep((s) => s - 1);
  if (step === 0) {
    window.location.href = "/get-started/quote";
  }
  if (step === 10) {
    localStorage.setItem("budgetSetup", JSON.stringify(form))
    window.location.href = "/quiz/completion";
  }

  const nextQuestion = (value) => {
    const currentKey = steps[step - 1].key;
    setForm((prev) => ({ ...prev, [currentKey]: value }));
    let num = 0;
    const stopTimer = setInterval(timer, 500);
    function timer() {
      num++;
      if (num >= 2) {
        clearInterval(stopTimer);
        setStep((s) => s + 1);
      }
    }
    timer();
  };

  return (
    <>
      {step === 0 && <LoadingSpinner />}
      <div className="mx-auto max-w-100 min-h-full h-full w-full xs:max-w-full flex flex-col pb-[104px]">
        <header className="h-20 flex items-center justify-between px-6 sm:py-11 ">
          <IoMdArrowBack className="h-6 w-6" onClick={prevStep} />
          <Link
            href={"/"}
            className="text-4xl sm:text-6xl text-[#00bf91] tracking-tighter "
          >
            SaveSpend
          </Link>
          <div className="text-sm font-semibold text-[#2f4858]">
            <span className="text-[#00bf91]">{step}</span>
            /9
          </div>
        </header>
        <div className="px-6 pt-1">
          <div className="w-full h-1 bg-[#F0F5FA] flex">
            <div
              className="bg-[#00bf91] h-1 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col h-full gap-5">
          {steps[step - 1] && (
            <QuestionStep
              title={steps[step - 1].title}
              options={steps[step - 1].options}
              nextQuestion={nextQuestion}
            />
          )}
        </div>
      </div>
      {steps[step - 1]?.key !== "expense" && (
        <div className="hidden sm:block -z-20 fixed bottom-0 right-0 ">
          <Image
            src={BottomImage}
            alt=""
            className="-scale-x-100 -z-10 w-70 xs:w-82 lg:w-full"
          />
        </div>
      )}
      {step === 10 && <LoadingSpinner />}
    </>
  );
}
