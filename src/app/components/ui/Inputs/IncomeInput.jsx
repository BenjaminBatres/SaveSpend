import React from "react";

export default function IncomeInput({
  title,
  fontSize,
  marginTop,
  setUserIncome,
  userIncome,
}) {
  return (
    <>
      <label
        htmlFor="income"
        className="font-semibold"
        style={{ fontSize: fontSize }}
      >
        {title}
      </label>
      <input
        required
        type="number"
        min={1000}
        onChange={(e) =>
          setUserIncome({
            ...userIncome,
            income: e.target.value,
          })
        }
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00bf91] outline-none"
        style={{ marginTop: marginTop }}
        placeholder="$5,000"
      />
    </>
  );
}
