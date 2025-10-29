import { useEffect, useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { IoMdClose } from "react-icons/io";

export default function EditSpentModal({
  isOpen,
  setIsOpen,
  expenseId,
  initialTitle,
  initialSpent,
}) {
  const [spent, setSpent] = useState(initialSpent || 0);
  const user = auth.currentUser;
  async function handleSave() {
    try {
      const expenseRef = doc(db, "users", user.uid, "expenses", expenseId);

      await updateDoc(expenseRef, {
        spent: Number(spent), // Make sure it's a number
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  }

  async function handleDelete() {
    try {
      await deleteDoc(doc(db, "users", user.uid, "expenses", expenseId));
      setIsOpen(false);
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  if (!isOpen) return null; // Don't render when modal is closed

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-73">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 animate-slide-up -translate-y-30">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Edit Spent</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Title + Input */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-gray-700">
            {initialTitle}
          </span>
          <input
            type="number"
            min={0}
            placeholder="0.00"
            onChange={(e) => setSpent(e.target.value)}
            className="w-24 text-right border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#00afa7]"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#00afa7] text-white rounded-lg shadow hover:bg-[#009c95] transition cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
