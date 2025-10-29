import ProgressBar from "../components/ui/ProgressBar";
import EditSpentModal from "./ui/Modals/EditSpentModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import SignUpModal from "../components/ui/Modals/SignUpModal";

export default function PlannedSendingCard({ expense, budgetData, isLogin }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  function handleEditClick(expense) {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  }

  return (
    <>
      <div
        className="border-2 border-gray-300 rounded-[10px] my-2 py-5 px-2 sm:px-4 flex cursor-pointer "
        onClick={() => handleEditClick(expense)}
      >
        <div className="sm:text-lg font-semibold flex-2 sm:w-[50%]">
          {expense?.title || budgetData?.expense}
        </div>
        <div className="flex-3 sm:flex-5 md:flex-3 mr-2 sm:mr-5">
          {expense?.spent !== undefined ? (
            <>
              <ProgressBar value={(expense?.spent / expense?.amount) * 100} />
              <div className="flex justify-between">
                <div className="text-sm">
                  Spent:{" "}
                  <span className="font-semibold">${expense?.spent}</span>
                </div>
                <div className="text-sm">
                  of <span className="font-semibold">${expense?.amount}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <ProgressBar value={0} />
              <div className="flex justify-between">
                <div className="text-sm">
                  Spent: <span className="font-semibold">$0</span>
                </div>
                <div className="text-sm">
                  of{" "}
                  <span className="font-semibold">
                    ${expense?.amount || budgetData.expenseCost}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex-1 border-l-2 border-l-gray-200 px-2 flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-400 mb-2">Avaliable</div>
            {expense?.spent !== undefined ? (
              <>
                {expense?.amount - expense?.spent <= 0 ? (
                  <div className="sm:text-lg font-semibold">Completed</div>
                ) : (
                  <div className="sm:text-lg font-semibold">
                    ${expense?.amount - expense?.spent}
                  </div>
                )}
              </>
            ) : (
              <div className="sm:text-lg font-semibold">
                ${expense?.amount || budgetData.expenseCost}
              </div>
            )}
          </div>
          <BsThreeDotsVertical className="text-xl" />
        </div>
      </div>
      {isLogin ? (
        <>
          {selectedExpense && (
            <EditSpentModal
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              expenseId={selectedExpense.id}
              initialTitle={selectedExpense.title}
              initialSpent={selectedExpense.spent}
            />
          )}
        </>
      ) : (
        <>{isModalOpen && <SignUpModal onClose={setIsModalOpen} />}</>
      )}
    </>
  );
}
