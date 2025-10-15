import React, { useState } from "react";
import { auth, db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SubscriptionInput({
  subTitle,
  setStep,
  isStep,
  setIsModalOpen,
}) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Handle count change
  const handleCountChange = (e) => {
    let value = e.target.value;

    // If input is empty, set count to 0
    if (value === "") {
      setSubscriptionCount(0);
      setSubscriptions([]);
      setErrors([]);
      setErrorMessage("");
      return;
    }
    const count = parseInt(e.target.value, 10);
    setSubscriptionCount(count);
    setSubscriptions(Array(count).fill({ name: "", cost: "" }));
  };

  // Update specific bill
  const handleSubscriptionChange = (index, field, value) => {
    setErrorMessage("");
    const updatedSubscriptions = subscriptions.map((subscription, i) =>
      i === index ? { ...subscription, [field]: value } : subscription
    );
    setSubscriptions(updatedSubscriptions);
    // Clear error for the specific field being updated
    const updatedErrors = [...errors];
    if (updatedErrors[index]) {
      updatedErrors[index][field] = false;
      setErrors(updatedErrors);
    }
  };

  const validateAndSave = async () => {
    const newErrors = subscriptions.map((subscription) => ({
      name: !subscription.name.trim() || subscription.name.length > 23,
      cost:
        subscription.cost === "" ||
        isNaN(Number(subscription.cost)) ||
        Number(subscription.cost) < 1,
    }));

    setErrors(newErrors);
    setErrorMessage(
      "Name can't be empty or cannot exceed 20 characters & cost must be at least 1"
    );
    const hasErrors = newErrors.some((err) => err.name || err.cost);
    if (hasErrors) return; // Stop if there are validation errors

    // Save only if all fields are valid
    setErrorMessage("");
    const dataToSave = subscriptions;
    const user = auth.currentUser;
    const subscriptionRef = collection(db, "users", user.uid, "subscriptions");
    const promises = dataToSave.map((subscription) =>
      addDoc(subscriptionRef, subscription)
    );
    await Promise.all(promises);
    if (isStep) {
      setStep(5);
      router.push("/dashboard");
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <label htmlFor="income" className="text-sm font-semibold">
        {subTitle || "How many subscriptions do you pay for?"}
      </label>
      <input
        type="number"
        min={0}
        value={subscriptionCount}
        onChange={handleCountChange}
        className={`w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#00bf91] outline-none ${
          subscriptionCount > 0 ? "mb-4" : "mb-0"
        }`}
      />

      {subscriptions.length > 0 && (
        <div
          className={`space-y-4 ${
            subscriptionCount > 2 ? "overflow-y-scroll" : ""
          } ${
            subTitle ? "max-h-[210px]" : "max-h-[150px]"
          } max-w-[420px] mx-auto w-full`}
        >
          {subscriptions.map((subscription, index) => (
            <div
              key={index}
              className="flex items-center gap-1 sm:gap-4 border-2 border-[#00bf91] p-3 rounded-lg"
            >
              <input
                type="text"
                placeholder={`Subscription ${index + 1}`}
                value={subscription.name}
                onChange={(e) =>
                  handleSubscriptionChange(index, "name", e.target.value)
                }
                className={`sm:flex-1 w-[50%] border-b p-2 outline-none ${
                  errors[index]?.name
                    ? "border-red-500"
                    : "focus:border-[#00bf91]"
                }`}
              />
              <input
                type="number"
                placeholder="Cost"
                min={0}
                step={0.01}
                value={subscription.cost}
                onChange={(e) =>
                  handleSubscriptionChange(index, "cost", e.target.value)
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

      {subscriptions.length > 0 && (
        <button
          onClick={validateAndSave}
          className="mt-4 bg-[#00bf91] cursor-pointer text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#009b77] transition"
        >
          Save Subscriptions
        </button>
      )}
    </>
  );
}
