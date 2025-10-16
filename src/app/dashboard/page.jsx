"use client";
import React, { useEffect, useState } from "react";
// Components
import Sidebar from "../components/ui/Sidebar/Sidebar";
import FinancePieChart from "../components/FinancePieChart";
import SeeAllSpendings from "../components/SeeAllSpendings";
// Cards
import SpendingsCard from "../components/ui/SpendingsCard";
import BillsCard from "../components/ui/Cards/SubscriptionsBillsCard";
import SubscriptionsCard from "../components/ui/Cards/SubscriptionsBillsCard";
import DashboardGoalCard from "../components/ui/Cards/DashboardGoalCard";
import CreateGoalCard from "../components/ui/Cards/CreateGoalCard";
import AddSubscriptionBillCard from "../components/ui/Cards/AddSubscripitonBillCard";
import AddPlannedSpendings from "../components/ui/Cards/AddPlannedSpendings";
// Skeleton loading
import SkeletonBox from "../components/ui/SkeletonState/SkeletonBox";
import SkeletonBillCards from "../components/ui/SkeletonState/SkeletonBillCards";
import SkeletonSpendingCards from "../components/ui/SkeletonState/SkeletonSpendingCards";
import SkeletonDashboardGoalCard from "../components/ui/SkeletonState/SkeletonDashboardGoalCard";
// Modal
import SignOutModal from "../components/ui/Modals/SignOutModal";
// Icon
import { BsThreeDotsVertical } from "react-icons/bs";
// Firebase
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
export default function page() {
  const [userDisplayName, setUserDisplayName] = useState("");
  const [userExpenses, setUserExpenses] = useState([]);
  const [usersBills, setUsersBills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserDisplayName, setIsUserDisplayName] = useState(true);
  const [userIncome, setUserIncome] = useState([]);
  const [usersSubscriptions, setUsersSubscriptions] = useState([]);
  const [usersGoals, setUsersGoals] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function totalExpenses(items) {
    const total = items.reduce(
      (acc, item) => acc + parseFloat(item.cost || item.savedSoFar),
      0
    );
    return total;
  }

  function totalSpendings(items) {
    const total = items.reduce((acc, item) => acc - item.amount, 0);
    return total;
  }

  function incomeAfter() {
    return (
      userIncome -
      totalExpenses(usersBills) -
      totalExpenses(usersSubscriptions) -
      totalExpenses(usersGoals)
    );
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.displayName) {
          router.push("/get-started");
        } else {
          async function getAllPosts() {
            try {
              async function getAllUserInfo(collectionName) {
                const { docs } = await getDocs(
                  collection(db, "users", user.uid, collectionName)
                );
                setUserDisplayName(user.displayName);

                if (collectionName === "expenses") {
                  const userExpensesInfo = docs.map((elem) => elem.data());
                  setUserExpenses(userExpensesInfo);
                } else if (collectionName === "income") {
                  const userIncomeInfo = docs.map((elem) => elem.data());
                  setUserIncome(userIncomeInfo.map((item) => item.income));
                } else if (collectionName === "bills") {
                  const usersBillsInfo = docs.map((elem) => elem.data());
                  setUsersBills(usersBillsInfo);
                  setIsLoading(false);
                } else if (collectionName === "subscriptions") {
                  const usersSubscriptionsInfo = docs.map((elem) =>
                    elem.data()
                  );
                  setUsersSubscriptions(usersSubscriptionsInfo);
                  setIsLoading(false);
                } else if (collectionName === "goals") {
                  const usersGoalsInfo = docs.map((elem) => elem.data());
                  setUsersGoals(usersGoalsInfo);
                }
              }
              getAllUserInfo("expenses");
              getAllUserInfo("income");
              getAllUserInfo("bills");
              getAllUserInfo("subscriptions");
              getAllUserInfo("goals");
            } catch (err) {
              console.error("Error fecthing user info", err);
            }
          }
          getAllPosts();
          setIsUserDisplayName(false);
        }
      } else {
        router.push("/get-started");
      }
    });
  }, []);
  return (
    <>
      {isUserDisplayName ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="w-16 h-16 border-4 border-[#00bf91] border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <Sidebar />
          <main className="bg-[#f1f5f9] px-4 pt-10 pb-4 mt-5 lg:mt-0 lg:ml-[70px] transition-all duration-500 min-h-screen">
            <div
              className="
      grid h-auto gap-4
      grid-cols-1           /* mobile: single column */
      md:grid-cols-2        /* tablet: two columns */
      xl:grid-cols-[0.4fr_1fr_1fr]  /* desktop: your original layout */
    "
            >
              {/* Accounts card */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 md:col-span-2 xl:col-span-1 xl:row-span-3 transition-all">
                {isLoading ? (
                  <SkeletonBox height={30} width={"100%"} />
                ) : (
                  <>
                    <div className="flex xl:block 2xl:flex justify-between items-center mb-3">
                      <h2 className="text-lg font-extrabold text-[#2f4858]">
                        Account
                      </h2>
                      <button onClick={() => setIsOpen(true)} className="text-white font-semibold py-2 px-4 bg-[#00afa7] hover:bg-[#00988f] rounded-lg transition-all duration-300 cursor-pointer">Sign Out</button>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                      <p className="text-sm text-gray-500 mb-1">User</p>
                      <h3 className="text-xl font-bold text-[#2f4858] truncate">
                        {userDisplayName}
                      </h3>
                    </div>
                    {isOpen && <SignOutModal setIsOpen={setIsOpen} />}
                  </>
                )}
              </div>

              {/* Spending Plan */}
              <div className="bg-white rounded-3xl py-6 px-5 md:col-span-2 lg:col-span-2">
                <div className="flex flex-col lg:flex-row">
                  <div className="flex-2">
                    <div className="text-2xl text-[#2f4858] font-extrabold">
                      Spending Plan
                    </div>
                    <div className="text-sm">September 2025</div>
                    <div className="flex items-center justify-center">
                      <FinancePieChart
                        income={userIncome}
                        incomeAfter={incomeAfter}
                        totalSpendings={totalSpendings}
                        userExpenses={userExpenses}
                        isLoading={isLoading}
                      />
                      {isLoading ? (
                        <SkeletonBox
                          width={120}
                          height={"3rem"}
                          marginLeft={"2.5rem"}
                        />
                      ) : (
                        <div className="ml-4">
                          <div className="text-xl font-semibold text-[#2f4858]">
                            $
                            {(
                              incomeAfter() + totalSpendings(userExpenses)
                            ).toLocaleString()}
                          </div>
                          <div className="text-sm">Avaliable</div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Planned spending */}
                  <div className="flex-3 mt-4 lg:mt-0 lg:ml-6">
                    <div className="text-lg text-[#2f4858] font-extrabold mb-2">
                      Planned Spending
                    </div>
                    <div className="pl-0 lg:pl-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {isLoading ? (
                        <SkeletonSpendingCards spendingCards={4} />
                      ) : (
                        <>
                          {userExpenses.length < 1 && <AddPlannedSpendings />}

                          {userExpenses.map((expense, id) => (
                            <SpendingsCard expense={expense} key={id} />
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bills */}
              <div className="bg-white rounded-3xl py-6 px-5 md:col-span-2 lg:col-span-1">
                <div className="text-xl text-[#2f4858] font-semibold mb-2">
                  Bills
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {isLoading ? (
                    <SkeletonBillCards billCards={4} />
                  ) : (
                    <>
                      {usersBills.length < 1 && (
                        <AddSubscriptionBillCard title={"Bill"} />
                      )}
                      {usersBills.slice(0, 4).map((bill, id) => (
                        <BillsCard key={id} bill={bill} />
                      ))}
                    </>
                  )}
                </div>
                {usersBills.length >= 5 && <SeeAllSpendings title={"Bills"} />}
              </div>
              {/* Subscriptions */}
              <div className="bg-white rounded-3xl py-6 px-5 md:col-span-2 lg:col-span-1">
                <div className="text-xl text-[#2f4858] font-semibold mb-2">
                  Subscriptions
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {isLoading ? (
                    <SkeletonBillCards billCards={4} />
                  ) : (
                    <>
                      {usersSubscriptions.length < 1 && (
                        <AddSubscriptionBillCard title={"Subscriptions"} />
                      )}
                      {usersSubscriptions
                        .slice(0, 4)
                        .map((subscription, id) => (
                          <SubscriptionsCard
                            key={id}
                            subscription={subscription}
                          />
                        ))}
                    </>
                  )}
                </div>
                {usersSubscriptions.length >= 5 && (
                  <SeeAllSpendings title={"Subscriptions"} />
                )}
              </div>

              {/* Savings Goals */}
              <div className="bg-white rounded-3xl py-4 px-5 md:col-span-2 lg:col-span-2">
                <div className="text-xl font-semibold mb-2">Savings Goals</div>
                <div className="flex flex-col md:flex-row gap-4">
                  {isLoading ? (
                    <SkeletonDashboardGoalCard goalCards={2} />
                  ) : (
                    <>
                      {usersGoals.slice(0, 2).map((goal, id) => (
                        <DashboardGoalCard key={id} goal={goal} />
                      ))}
                      {usersGoals.length < 2 && <CreateGoalCard />}
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}
