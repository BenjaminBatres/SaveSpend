"use client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Typed } from "react-typed";
import remarkGfm from "remark-gfm";

export default function AIMessage({ content }) {
  const [showFull, setShowFull] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + content[i]);
      i++;
      if (i >= content.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [content]);

  return (
    <>
      {!showFull ? (
        <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
          {displayedText}
        </div>
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="prose prose-neutral max-w-none text-gray-800
                     prose-h3:text-lg prose-h3:font-semibold prose-h3:text-teal-700
                     prose-li:marker:text-[#00bf91] prose-strong:text-gray-900
                     prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-5"
        >
          {content}
        </ReactMarkdown>
      )}
    </>
  );
}
