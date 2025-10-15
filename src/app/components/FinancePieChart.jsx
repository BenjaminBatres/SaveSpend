"use client";
import { usePathname } from "next/navigation";
import { PieChart, Pie, Cell } from "recharts";
import FinancePieChartSkeleton from "./ui/SkeletonState/FinancePieChartSkeleton";
export default function FinancePieChart({
  incomeAfter,
  totalSpendings,
  userExpenses,
  income,
  isLoading,
}) {
  const plannedSpending = (totalSpendings(userExpenses) / income) * 100;
  const available = ((incomeAfter() + totalSpendings(userExpenses)) / income) * 100;
  const data = [
    {
      name: "Planned spending",
      value: parseFloat(plannedSpending.toFixed(2)) * -1,
    },
    {
      name: "Available",
      value:
        parseFloat(available.toFixed(2)) > 0
          ? parseFloat(available.toFixed(2))
          : 0,
    },
  ];
  const COLORS = ["#00bf91", "#cafbe7"];
  const pathname = usePathname();
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        pathname === "/dashboard/spendingplan" ? "mt-0" : "mt-8"
      }`}
    >
      {isLoading ? (
        <FinancePieChartSkeleton />
      ) : (
        <PieChart width={200} height={150}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
            // label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      )}
      <div>
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`w-[10px] h-[10px] rounded-full`}
              style={{ backgroundColor: isLoading ? "#e5e7eb" : COLORS[index] }}
            ></div>
            <div className={`text-sm`}>
              {isLoading ? "Loading..." : entry.name}
            </div>
            {/* <div className="text-sm font-semibold">{entry.value}%</div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
