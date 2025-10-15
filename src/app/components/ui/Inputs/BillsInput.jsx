import React, { useState } from "react";
import { auth, db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function BillsInput({
  subTitle,
  setStep,
  isStep,
  setIsModalOpen,
}) {
  const [bills, setBills] = useState([]);
  const [billCount, setBillCount] = useState(0);
  const [errors, setErrors] = useState([]); // NEW: store validation errors
  const [errorMessage, setErrorMessage] = useState("");

  // Handle count change
  const handleCountChange = (e) => {
    let value = e.target.value;

    if (value === "") {
      setBillCount(0);
      setBills([]);
      setErrors([]);
      return;
    }

    const count = parseInt(value, 10);
    setBillCount(count);

    // Initialize bills + error states
    setBills(Array(count).fill({ name: "", cost: "" }));
    setErrors(Array(count).fill({ name: false, cost: false }));
  };

  // Update specific bill & reset error for that field
  const handleBillChange = (index, field, value) => {
    setErrorMessage("");
    const updatedBills = bills.map((bill, i) =>
      i === index ? { ...bill, [field]: value } : bill
    );
    setBills(updatedBills);

    // Clear error for the specific field being updated
    const updatedErrors = [...errors];
    if (updatedErrors[index]) {
      updatedErrors[index][field] = false;
      setErrors(updatedErrors);
    }
  };

  // Validate before saving
  const validateAndSave = async () => {
    const newErrors = bills.map((bill) => ({
      name: !bill.name.trim() || bill.name.length > 23,
      cost:
        bill.cost === "" || isNaN(Number(bill.cost)) || Number(bill.cost) < 1,
    }));

    setErrors(newErrors);
    setErrorMessage(
      "Name can't be empty or cannot exceed 20 characters & cost must be at least 1"
    );

    const hasErrors = newErrors.some((err) => err.name || err.cost);
    if (hasErrors) return; // Stop if there are validation errors

    // Save only if all fields are valid
    setErrorMessage("");
    const dataToSave = bills;
    const user = auth.currentUser;
    const billsRef = collection(db, "users", user.uid, "bills");
    const promises = dataToSave.map((bill) => addDoc(billsRef, bill));
    await Promise.all(promises);
    if (isStep) {
      setStep(4);
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <label htmlFor="income" className="text-sm font-semibold">
        {subTitle || "How many bills do you pay?"}
      </label>
      <input
        type="number"
        min={0}
        required
        value={billCount}
        onChange={handleCountChange}
        className={`w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#00bf91] outline-none ${
          billCount > 0 ? "mb-4" : "mb-0"
        }`}
      />

      {bills.length > 0 && (
        <div
          className={`space-y-4 ${billCount > 2 ? "overflow-y-scroll" : ""} ${
            subTitle ? "max-h-[210px]" : "max-h-[150px]"
          } max-w-[420px] mx-auto w-full`}
        >
          {bills.map((bill, index) => (
            <div
              key={index}
              className="flex items-center gap-1 sm:gap-4 border-2 border-[#00bf91] p-3 rounded-lg"
            >
              {/* Bill Name Input */}
              <input
                type="text"
                placeholder={`Bill ${index + 1} Name`}
                value={bill.name}
                onChange={(e) =>
                  handleBillChange(index, "name", e.target.value)
                }
                className={`sm:flex-1 w-[50%] border-b p-2 outline-none ${
                  errors[index]?.name
                    ? "border-red-500"
                    : "focus:border-[#00bf91]"
                }`}
              />

              {/* Bill Cost Input */}
              <input
                type="number"
                placeholder="Cost"
                min={1}
                step={0.01}
                value={bill.cost}
                onChange={(e) =>
                  handleBillChange(index, "cost", e.target.value)
                }
                className={`flex-1 sm:flex-0 w-10 sm:w-28 border-b p-2 outline-none text-right ${
                  errors[index]?.cost
                    ? "border-red-500"
                    : "focus:border-[#00bf91]"
                }`}
              />
            </div>
          ))}
        </div>
      )}
      {errorMessage && (
        <p className="text-red-500 mt-4 text-sm">{errorMessage}</p>
      )}
      {/* Save Button */}
      {bills.length > 0 && (
        <button
          onClick={validateAndSave}
          className="mt-4 bg-[#00bf91] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#009b77] transition"
        >
          Save Bills
        </button>
      )}
    </>
  );
}
