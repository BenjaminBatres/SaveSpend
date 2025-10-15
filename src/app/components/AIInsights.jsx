export default function AiInsights() {
  return (
    <div>
      <div className="text-5xl font-semibold text-[#2f4858] mb-6">Your AI Insights</div>

      <div className="space-y-4">
        <div className="bg-white shadow-sm rounded-2xl p-4">
          <h3 className="font-medium text-[#00bf91] mb-2">💸 Spending Trend</h3>
          <p className="text-gray-600">
            You spent 12% less than last month — great job staying consistent!
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-2xl p-4">
          <h3 className="font-medium text-[#00bf91] mb-2">📅 Upcoming Bills</h3>
          <p className="text-gray-600">
            Your internet bill is due in 3 days. Don’t forget to schedule it.
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-2xl p-4">
          <h3 className="font-medium text-[#00bf91] mb-2">💡 Suggestion</h3>
          <p className="text-gray-600">
            Consider moving $100 to your emergency fund this week — small steps add up.
          </p>
        </div>
      </div>
    </div>
  );
}
