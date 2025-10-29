import React, { useState } from "react";
// Modal Compontents
import AddBillModal from "./ui/Modals/AddBillModal";
import DeleteBillModal from "../components/ui/Modals/DeleteBillModal";
import SignUpModal from "../components/ui/Modals/SignUpModal"
// Icons
import { AiFillPlusCircle } from "react-icons/ai";
import { BsEmojiSunglasses, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import { BiCustomize } from "react-icons/bi";
import { FaUmbrellaBeach, FaCarAlt } from "react-icons/fa";
import { GiLinkedRings } from "react-icons/gi";
import { TbHomeDollar } from "react-icons/tb";

export default function CollapsibleSpentCard({
  title,
  subTitle,
  items,
  budgetDataBill,
  budgetDataBillCost,
  budgetDataSubscription,
  budgetDataSubscriptionCost,
  budgetDataGoal,
  budgetDataGoalCost,
  isLogin,
  modalTitle,
  collectionName,
}) {
  const total = items.reduce(
    (acc, item) => acc - (item.cost || item.savedSoFar),
    0
  );
  const [active, setActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  function formatMoney(amount) {
    const abs = Math.abs(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
    return amount < 0 ? `-$${abs}` : `$${abs}`;
  }
  function handleEditClick(items) {
    setSelectedBill(items);
    setIsOpen(true);
  }

  const formatName = (name) => {
    return name.length > 30 ? name.slice(0, 30) + "..." : name;
  };

  function displayIcon(id) {
    const goal = items.map((icon) => icon.goalIcon);
    const goalIconName = goal[id];
    if (goalIconName === "Home") {
      return <TbHomeDollar />;
    } else if (goalIconName === "Wedding") {
      return <GiLinkedRings />;
    } else if (goalIconName === "Emergency Fund") {
      return <FaUmbrellaBeach />;
    } else if (goalIconName === "Car") {
      return <FaCarAlt />;
    } else if (goalIconName === "Vacation") {
      return <BsEmojiSunglasses />;
    } else if (goalIconName === "Custom") {
      return <BiCustomize />;
    }
  }

  function displayGoalIcon() {
    const goalIcon = budgetDataGoal;

    if (goalIcon === "Home") {
      return <TbHomeDollar />;
    } else if (goalIcon === "Wedding") {
      return <GiLinkedRings />;
    } else if (goalIcon === "Emergency Fund") {
      return <FaUmbrellaBeach />;
    } else if (goalIcon === "Car") {
      return <FaCarAlt />;
    } else if (goalIcon === "Vacation") {
      return <BsEmojiSunglasses />;
    } else if (goalIcon === "Custom") {
      return <BiCustomize />;
    }
  }

  return (
    <div className="bg-[#00afa7] text-white py-3 rounded-[5px] mb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-[10px]">
        <div
          className={`flex items-center ${
            active && items.length > 0 ? "mb-2" : "mb-0"
          }`}
        >
          <IoMdArrowDropright
            onClick={() => setActive(!active)}
            className={`text-2xl cursor-pointer ${
              active
                ? "rotate-90 h-6 w-6 max-w-6 transform transition-all duration-300"
                : "h-6 w-6 max-w-6 transform transition-all duration-300"
            }`}
          />
          <div
            className="text-lg font-semibold cursor-pointer"
            onClick={() => setActive(!active)}
          >
            {title}
          </div>
          {active && (
            <>
            {isLogin ? (
              <>
              <button
                className="ml-6 text-sm font-semibold text-[#2f4858] hidden lg:flex items-center gap-2 cursor-pointer animate-fade-in"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                <span className="text-lg">
                  <AiFillPlusCircle />
                </span>
                Add {title}
              </button>

              {isModalOpen && (
                <AddBillModal
                  setIsModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
                  subTitle={subTitle}
                  title={title}
                />
              )}
              </>
            ) : (
              <>
              <button
                className="ml-6 text-sm font-semibold text-[#2f4858] hidden lg:flex items-center gap-2 cursor-pointer animate-fade-in"
                onClick={() => setIsSignUpModalOpen(!isSignUpModalOpen)}
              >
                <span className="text-lg">
                  <AiFillPlusCircle />
                </span>
                Add {title}
              </button>

              {isSignUpModalOpen && (
                <SignUpModal onClose={setIsSignUpModalOpen}/>
              )}</>
            )}
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="sm:text-lg font-semibold">
            {formatMoney(
              total ||
                budgetDataBillCost ||
                budgetDataSubscriptionCost ||
                budgetDataGoalCost ||
                0
            )}
          </div>
          <div
            className="text-lg font-semibold cursor-pointer"
            onClick={() => setActive(!active)}
          >
            <BsThreeDotsVertical />
          </div>
        </div>
      </div>
      {/* Collapsible Items */}
      <div
        className={`px-[10px] ${
          items.length >= 4 ? " overflow-y-scroll vertical-scroll " : ""
        } max-h-[225px] `}
      >
        <div
          className={`relative h-0 overflow-hidden transform transition-[height] duration-300 ease cursor-pointer lg:hidden ${
            active ? "h-[55px] mt-3" : "h-0"
          }`}
        >
          {isLogin ? (
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className={`bg-[#2f4858] w-full px-2 py-3 rounded-[5px] cursor-pointer flex items-center gap-2 font-semibold `}
          >
            <div className="text-xl">
              <AiFillPlusCircle />
            </div>
            <div>Add {title}</div>
          </button>

          ) : (
             <button
            onClick={() => setIsSignUpModalOpen(!isSignUpModalOpen)}
            className={`bg-[#2f4858] w-full px-2 py-3 rounded-[5px] cursor-pointer flex items-center gap-2 font-semibold`}
          >
            <div className="text-xl">
              <AiFillPlusCircle />
            </div>
            <div>Add {title}</div>
          </button>
          )}
        </div>
        {isLogin ? (
          <>
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => handleEditClick(item)}
                className={`relative h-0 overflow-hidden transform transition-[height] duration-300 ease cursor-pointer  ${
                  active ? "h-[55px] first:mt-3" : "h-0"
                }`}
              >
                <div className="bg-[#2f4858] w-full px-2 py-3 rounded-[5px] flex justify-between">
                  {displayIcon(index) ? (
                    <div className="flex gap-2 items-center">
                      <div className="text-lg">{displayIcon(index)}</div>
                      <div>{formatName(item.name)}</div>
                    </div>
                  ) : (
                    <div>{formatName(item.name)}</div>
                  )}
                  <div className="flex items-center gap-1">
                    <div className="text-red-400">
                      -${item.cost || item.savedSoFar}
                    </div>
                    <div>
                      <BsThreeDotsVertical />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div
            onClick={() => handleEditClick()}
            className={`relative h-0 overflow-hidden transform transition-[height] duration-300 ease cursor-pointer  ${
              active ? "h-[55px] first:mt-3" : "h-0"
            }`}
          >
            <div className="bg-[#2f4858] w-full px-2 py-3 rounded-[5px] flex justify-between lg:mt-1">
              {displayGoalIcon() ? (
                <div className="flex gap-2 items-center">
                  <div className="text-lg">{displayGoalIcon()}</div>
                  <div>{budgetDataGoal}</div>
                </div>
              ) : (
                <div>{budgetDataBill || budgetDataSubscription}</div>
              )}
              <div className="flex items-center gap-1">
                <div className="text-red-400">
                  -$
                  {budgetDataBillCost ||
                    budgetDataSubscriptionCost ||
                    budgetDataGoalCost}
                </div>
                <div>
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>
          </div>
        )}

        {!isLogin && (
          <>
          {isOpen && <SignUpModal onClose={setIsOpen}/>}
          </>

        )}

        {selectedBill && (
          <DeleteBillModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedSpending={selectedBill}
            modalTitle={modalTitle}
            collectionName={collectionName}
          />
        )}
      </div>
    </div>
  );
}
