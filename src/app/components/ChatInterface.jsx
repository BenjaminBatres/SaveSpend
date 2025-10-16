"use client";
import { useState } from "react";
import { IoSparkles } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { motion } from "framer-motion";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full p-4 sm:p-6 lg:p-8 rounded-2xl overflow-y-auto">
      {/* Header */}
      <div className="text-xl md:text-2xl lg:text-3xl flex flex-col md:flex-row items-center md:items-start gap-3 text-center md:text-left">
        <IoSparkles className="text-[#00bf91] text-2xl md:text-3xl" />
        <span className="text-[#2f4858] font-semibold">
          Hi there! I’m your finance assistant. How can I help you today?
        </span>
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col gap-4 w-full max-w-[1200px] mx-auto">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg p-4 max-w-[85%] sm:max-w-[70%] text-sm sm:text-base ${
                msg.role === "user"
                  ? "bg-[#00bf91]/90 text-white"
                  : " border border-gray-700 text-[#2f4858]"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="text-[#2f4858] italic font-semibold mb-1">
                  AI Assistant
                </div>
              )}
              {msg.content}
            </div>
          </motion.div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="self-start text-gray-500 italic text-sm sm:text-base">
            Typing...
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form
        onSubmit={sendMessage}
        className="relative flex flex-col rounded-md bg-[#6c7698]/30 border-1 border-[#6c7698] pt-3.5 w-full"
      >
        <textarea
          name=""
          id=""
          placeholder="Reply to Assistant..."
          value={userInput}
          onKeyDown={handleKeyDown}
          onChange={(e) => setUserInput(e.target.value)}
          className=" w-full whitespace-pre-wrap resize-none px-3.5 outline-none min-h-12"
        ></textarea>
        <div className="flex justify-end mx-3 px-2 py-3.5">
          <button
            type="submit"
            disabled={loading}
            className={`h-10 w-10 flex justify-center items-center p-2 rounded-lg text-xl  text-white transition-all duration-300 ${
              userInput.length > 0
                ? "bg-[#00bf91] cursor-pointer"
                : "bg-[#6c7698]/90 cursor-not-allowed"
            }`}
          >
            <LuSend />
          </button>
        </div>
      </form>
    </div>
  );
}
