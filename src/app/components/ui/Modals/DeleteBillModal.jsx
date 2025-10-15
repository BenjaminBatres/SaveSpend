import React from "react";
import { IoMdClose } from "react-icons/io";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";

export default function DeleteBillModal({
  isOpen,
  setIsOpen,
  selectedSpending,
  modalTitle,
  collectionName,
}) {
  const formatName = (name) => {
    return name.length > 30 ? name.slice(0, 30) + "..." : name;
  };

  async function handleDelete() {
    const user = auth.currentUser;
    try {
      await deleteDoc(
        doc(db, "users", user.uid, collectionName, selectedSpending.id)
      );
      setIsOpen(false);
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  }

  if (!isOpen) return null; // Don't render when modal is closed
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-73">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 animate-slide-up -translate-y-30">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{modalTitle}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
          >
            <IoMdClose />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">
            {formatName(selectedSpending.name)}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              handleDelete()
            }
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 flex items-center gap-2 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
