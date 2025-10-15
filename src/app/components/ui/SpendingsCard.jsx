import ProgressBar from "../ui/ProgressBar";
import Link from "next/link";
export default function SpendingsCard({ expense }) {
  return (
    <Link
      href={"/dashboard/spendingplan"}
      className="p-2 shadow-lg rounded-[5px] border border-gray-200 hover:shadow-md hover:border-[#00afa7] transition-all duration-300 text-[#007787]"
    >
      <div className="font-semibold text-[#2f4858]">{expense.title}</div>
      {expense.spent !== undefined ? (
        <>
          <div>${(expense.amount - expense.spent).toFixed(2)} available</div>
          <ProgressBar value={(expense.spent / expense.amount) * 100} />
          <div className="flex justify-between">
            <div>Spent: ${expense.spent}</div>
            <div>of ${expense.amount}</div>
          </div>
        </>
      ) : (
        <>
          <div>${expense.amount}</div>
          <ProgressBar value={0} />
          <div className="flex justify-between">
            <div>Spent: $0</div>
            <div>of ${expense.amount}</div>
          </div>
        </>
      )}
    </Link>
  );
}
