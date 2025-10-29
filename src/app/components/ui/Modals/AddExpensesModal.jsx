import React, { useEffect } from "react";

export default function AddExpensesModal({
  setOpen,
  open,
  expense,
  setExpense,
  selected,
  setSelected,
  errorMessage,
  handleSubmit,
}) {
  const options = [
    "Utilities",
    "Gas",
    "Internet & Cable",
    "Travel",
    "Phone",
    "Groceries",
    "Other",
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <>
      <div className="text-sm mb-2">List a monthly recurring payment</div>
      <button
        className="border border-gray-300 rounded-md px-3 py-2 text-left bg-gray-200 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {selected}
        <span className="ml-2 text-sm text-gray-500">▼</span>
      </button>
      {open && (
        <ul className="absolute mt-1 w-[70%] bg-white border border-gray-300 rounded-md shadow-lg z-9">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
                setExpense({ ...expense, title: opt });
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
          onChange={(e) =>
            setExpense({
              ...expense,
              amount: parseFloat(e.target.value),
            })
          }
          placeholder="$0.00"
          className="rounded-md border border-gray-600 w-[70%] px-3 py-2 placeholder-gray-500 focus:border-[#00afa7] focus:outline-none focus:ring-1 focus:ring-[#00afa7] mb-3"
        />

        <label
          htmlFor="expense"
          className="text-xs absolute bg-white px-1 -top-2 left-2 group-focus-within:text-[#00afa7]"
        >
          Monthly amount
        </label>
      </div>
      <div className="text-sm text-pink-500 mb-4">{errorMessage}</div>
      <button
        className="uppercase px-4 py-3 bg-[#00afa7] cursor-pointer rounded-2xl text-white hover:bg-[#007a73] transition-all duration-300"
        onClick={handleSubmit}
      >
        Create
      </button>

    </>
  );
}
