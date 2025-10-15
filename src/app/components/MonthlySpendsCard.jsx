export default function MonthlySpendsCard({
  title,
  incomeAfter,
  active,
  onClick,
}) {
  function formatMoney(amount) {
    const abs = Math.abs(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
    return amount < 0 ? `-$${abs}` : `$${abs}`;
  }
  return (
    <div
      className={`rounded-2xl py-3 w-full text-center transition-all duration-300 ${
        active
          ? "border-2 border-[#00afa7] scale-103 lg:scale-105"
          : "border-2 border-gray-300"
      }`}
      onClick={onClick}
    >
      <div className="font-semibold text-2xl">{formatMoney(incomeAfter)}</div>
      <div>{title}</div>
    </div>
  );
}
