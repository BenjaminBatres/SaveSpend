"use client";
import { useEffect, useState } from "react";
// Compontents
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import CollapsibleSpentCard from "../../components/CollapsibleSpentCard";
import CollapsibleIncome from "../../components/CollapsibleIncome";
import MonthlySpendsCard from "../../components/MonthlySpendsCard";
import PlannedSpendingCard from "../../components/PlannedSendingCard";
import AddExpenseModal from "../../components/ui/Modals/AddExpensesModal";
import FinancePieChart from "../../components/FinancePieChart";
// Firebase
import { auth, db } from "../../firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
// Icons
import { FcCalculator } from "react-icons/fc";
import { LuCirclePlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
export default function page() {
  const [selectedCard, setSelectedCard] = useState("income");
  const [selected, setSelected] = useState("Category");
  const [userExpenses, setUserExpenses] = useState([]);
  const [usersBills, setUsersBills] = useState([]);
  const [usersSubscriptions, setUsersSubscriptions] = useState([]);
  const [usersGoals, setUsersGoals] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserDisplayName, setIsUserDisplayName] = useState(true);
  const [userIncome, setUserIncome] = useState([]);
  const [expense, setExpense] = useState({
    title: "",
    amount: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
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
      userIncome.map((item) => item.income) -
      totalExpenses(usersBills) -
      totalExpenses(usersSubscriptions) -
      totalExpenses(usersGoals)
    );
  }

  function formatMoney(amount) {
    const abs = Math.abs(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
    return amount < 0 ? `-$${abs}` : `$${abs}`;
  }

  async function handleSubmit() {
    try {
      if (!expense.title) {
        setErrorMessage("Choose a category");
        return;
      } else if (expense.amount <= 0) {
        setErrorMessage("Monthly amount can't be 0");
        return;
      }
      const user = auth.currentUser;
      const docRef = await addDoc(
        collection(db, "users", user.uid, "expenses"),
        expense
      );
      setIsOpen(false);
      setSelected("Category");
      setExpense({ title: "", amount: 0 });
    } catch (err) {
      console.error("Firestore error:", err);
    }
  }
  async function listenToCollection(user, collectionName) {
    const expensesRef = collection(db, "users", user.uid, collectionName);
    const unsubscribe = onSnapshot(expensesRef, (snapshot) => {
      if (collectionName === "bills") {
        const billsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          cost: doc.data().cost,
        }));
        setUsersBills(billsList);
      } else if (collectionName === "subscriptions") {
        const subscriptionsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          cost: doc.data().cost,
        }));

        setUsersSubscriptions(subscriptionsList);
      } else if (collectionName === "expenses") {
        setUserExpenses(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              title: doc.data().title,
              amount: doc.data().amount,
              spent: doc.data().spent,
            };
          })
        );
      } else if (collectionName === "income") {
        const incomeList = snapshot.docs.map((doc) => ({
          id: doc.id,
          income: doc.data().income,
        }));
        setUserIncome(incomeList);
      } else if (collectionName === "goals") {
        const goalList = snapshot.docs.map((doc) => ({
          id: doc.id,
          savedSoFar: doc.data().savedSoFar,
          goalIcon: doc.data().goalIcon,
          name: doc.data().name,
          targetDate: doc.data().targetDate,
          goalAmout: doc.data().goalAmout,
        }));
        setUsersGoals(goalList);
      }
    });
    return unsubscribe;
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.displayName) {
          router.push("/get-started");
        } else {
          listenToCollection(user, "expenses");
          listenToCollection(user, "bills");
          listenToCollection(user, "subscriptions");
          listenToCollection(user, "income");
          listenToCollection(user, "goals");
          setIsLoading(false);
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

          <header className="ml-[70px] lg:h-[65px] lg:border-b border-b-gray-200  flex items-center px-6">
            <div className="text-2xl font-semibold">Spending Plan</div>
          </header>
          <main className="bg-[#f1f5f9] md:h-screen px-4 py-10 mt-5 lg:mt-0 lg:ml-[70px] transition-all duration-500">
            <div className="flex flex-col-reverse md:flex-row gap-4 space-x-4">
              <div className="md:w-[40%] lg:w-[20%] flex items-center flex-col space-y-6">
                <MonthlySpendsCard
                  title={"Income after bills & savings"}
                  incomeAfter={incomeAfter()}
                  active={selectedCard === "income"}
                  onClick={() => setSelectedCard("income")}
                />

                <MonthlySpendsCard
                  title={"Planned spendings"}
                  incomeAfter={totalSpendings(userExpenses)}
                  active={selectedCard === "planned"}
                  onClick={() => setSelectedCard("planned")}
                />
                <div>
                  <div
                    className={`text-xl font-semibold ${
                      totalSpendings(userExpenses) >
                      formatMoney(incomeAfter() + totalSpendings(userExpenses))
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {formatMoney(incomeAfter() + totalSpendings(userExpenses))}
                  </div>
                  <div className="text-center">avaliable</div>
                </div>
                <FinancePieChart
                  income={userIncome.map((item) => item.income)}
                  incomeAfter={incomeAfter}
                  totalSpendings={totalSpendings}
                  userExpenses={userExpenses}
                  isLoading={isLoading}
                />
              </div>
              {/* Income tab */}
              {selectedCard === "income" && (
                <div className="border-2 rounded-2xl border-gray-200 md:w-[60%] lg:w-[80%] py-5 px-3">
                  <CollapsibleIncome
                    isLoading={isLoading}
                    income={userIncome.map((item) => item.income)}
                    userIncomeId={userIncome.map((item) => item.id)}
                  />

                  <CollapsibleSpentCard
                    title="Bills"
                    subTitle={"List your bills"}
                    items={usersBills}
                    modalTitle={"Delete Bill"}
                    collectionName={"bills"}
                  />
                  <CollapsibleSpentCard
                    title="Subscriptions"
                    subTitle={"List your subscriptions"}
                    modalTitle={"Delete Subscriptions"}
                    collectionName={"subscriptions"}
                    items={usersSubscriptions}
                  />
                  <CollapsibleSpentCard
                    title="Savings Goal"
                    subTitle={"Goal"}
                    modalTitle={"Delete Goal"}
                    collectionName={"goals"}
                    items={usersGoals}
                  />

                  <div className="mt-6 border-t-3 border-gray-200 pt-3 flex justify-between pr-3">
                    <div className="md:text-lg font-semibold">
                      Income after bills & savings
                    </div>
                    <div className="md:text-lg font-semibold">
                      ${incomeAfter().toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
              {/* Planned spending */}
              {selectedCard === "planned" && (
                <div
                  className={`border-2 rounded-2xl border-gray-200 md:w-[60%] lg:w-[80%] py-5 px-3 ${
                    userExpenses.length >= 5
                      ? "h-[700px] overflow-y-scroll"
                      : ""
                  }`}
                >
                  <div className="text-xl font-semibold mb-6">
                    Planned spendings
                  </div>
                  {userExpenses.map((expense) => (
                    <PlannedSpendingCard key={expense.id} expense={expense} />
                  ))}

                  <div
                    className="border-2 border-gray-300 rounded-[10px] my-2 py-5 px-2 sm:px-4 flex items-center gap-2 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <div className="text-3xl text-[#00afa7]">
                      <LuCirclePlus />
                    </div>
                    <div className="uppercase font-semibold text-[#00afa7]">
                      Add expense
                    </div>
                  </div>

                  {isOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-71">
                      <div className="relative max-w-[550px] w-[95%] mx-auto bg-white rounded-xl animate-slide-up -translate-y-30">
                        <div className="flex justify-between items-center p-4 bg-gray-200 rounded-t-xl">
                          <div className="text-lg">Add expense</div>
                          <button
                            className="rounded-full text-2xl cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            <IoMdClose />
                          </button>
                        </div>
                        <div className="flex py-6">
                          <div className="w-[20%] flex justify-center">
                            <FcCalculator className="text-5xl" />
                          </div>
                          <div className="w-[80%]">
                            <AddExpenseModal
                              selected={selected}
                              setExpense={setExpense}
                              expense={expense}
                              open={open}
                              setOpen={setOpen}
                              setSelected={setSelected}
                              errorMessage={errorMessage}
                              handleSubmit={handleSubmit}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
}
