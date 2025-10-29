import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function QuestionStep({ title, options, nextQuestion }) {
  const [selection, setSelection] = useState(-1);
  const [btnDisable, setBtnDisable] = useState(false);
  const handleSelection = (idx) => {
    setSelection(idx);
    setBtnDisable(true);
    let num = 0;
    const stopTimer = setInterval(timer, 1000);
    function timer() {
      num++;
      if (num >= 2) {
        clearInterval(stopTimer);
        setSelection(-1);
        setBtnDisable(false);
      }
    }
    timer();
  };
  return (
    <>
      <div className="px-4 pt-6 space-y-2">
        <div className="mx-auto max-w-[560px] text-center text-2xl font-semibold leading-9 text-[#2f4858]">
          {title}
        </div>
      </div>
      <div className="w-full flex-1 px-4 pb-[34px]">
        <div className="mx-auto flex flex-col gap-6 max-w-100 xs:max-w-[580px] ">
          <div className="flex flex-col gap-5 ">
            {options.map((opt, idx) => (
              <button
                disabled={btnDisable}
                key={idx}
                className={`group relative flex min-h-[80px] max-w-[375px]:pr-8 items-center ${
                  opt.emoji ? "justify-baseline" : "justify-center"
                } gap-3 rounded-lg bg-[#F5F5F5] text-center py-6 cursor-pointer ${
                  selection === idx ? "border border-[#00bf91]" : "border-none"
                }`}
                onClick={() => {
                  handleSelection(idx), nextQuestion(opt.value);
                }}
              >
                {opt.emoji && <div className="pl-4 text-4xl">{opt.emoji}</div>}
                <div className="font-bold text-[#2f4858]">{opt.label}</div>
                {selection === idx && (
                  <div className="absolute right-6 text-[#00bf91] text-xl">
                    <FaCheckCircle />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
