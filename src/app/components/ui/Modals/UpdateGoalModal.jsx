import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { auth, db } from "../../../firebase";

export default function UpdateGoalModal({ isOpen, setIsOpen, selectedGoal }) {
  const [savedSoFar, setSavedSoFar] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;
  async function handleSave() {
    const saved = Number(savedSoFar);
    const goal = Number(selectedGoal.goalAmount);

    if (isNaN(saved) || saved < 0 || saved > goal) {
      setError(
        "Amount saved must be at least 0 and not exceed the goal amount."
      );
      setLoading(false);
      return;
    }
    try {
      setError("");
      setLoading(true);
      const goalRef = doc(db, "users", user.uid, "goals", selectedGoal.id);
      await updateDoc(goalRef, {
        savedSoFar: Number(savedSoFar), // Make sure it's a number
      });
      setIsOpen(false);
      setLoading(false);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  }

  async function handleDelete() {
    try {
      await deleteDoc(doc(db, "users", user.uid, "goals", selectedGoal.id));
      setIsOpen(false);
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  }

  function closeModal() {
    setIsOpen(false);
    setError("");
  }

  if (!isOpen) return null; // Don't render when modal is closed
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-100">
      <div
        className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 animate-slide-up -translate-y-30"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-6 right-3 text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <IoMdClose />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Update {selectedGoal.name}
        </h2>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-gray-700">
            Edit saved so far
          </span>
          <div className="space-y-1.5">
            <input
              type="number"
              min={0}
              placeholder="0.00"
              onChange={(e) => setSavedSoFar(e.target.value)}
              className={`w-24 float-right text-right border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 ${
                error ? "border-2 border-red-500" : "focus:ring-[#00afa7]"
              }`}
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="h-10 w-[20%] bg-[#00afa7] text-white rounded-lg shadow hover:bg-[#009c95] transition cursor-pointer relative"
          >
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center z-50">
                <div className="w-8 h-8 border-4 border-white border-dashed rounded-full animate-spin"></div>
              </div>
            ) : (
              <div>Save</div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
