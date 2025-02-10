import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Words() {
  const { words, input, wordIndex, accuracy, accuracyIndex } = useSelector((state) => state.typing);
  const [top, setTop] = useState(0);
  const wordStatus = (index, word) => {
    if (index === wordIndex) {
      if (input === "") {
        return "bg-slate-200";
      } else if (word.includes(input)) {
        return "bg-green-400";
      } else {
        return "bg-red-500";
      }
    } else {
      if (accuracyIndex.correct.includes(index)) {
        return "text-green-400";
      } else if (accuracyIndex.incorrect.includes(index)) {
        return "text-red-500";
      } else {
        return "";
      }
    }
  };
  useEffect(() => {
    if (wordIndex === 0) {
      setTop(0);
    } else {
      const topPx = document.querySelector(`.words > span:nth-child(${wordIndex + 1})`);
      if (topPx) {
        if (topPx.offsetTop > top) {
          setTop(top + 48);
        }
      }
    }
  }, [wordIndex]);

  return (
    <div className="bg-white shadow-lg p-2 h-[150px] w-full rounded-lg overflow-hidden">
      <div className={`words flex flex-wrap gap-y-2 relative`} style={{ top: "-" + top + "px" }}>
        {words.map((item, index) => {
          return (
            <span
              className={`transition-all p-2 text-black rounded ${wordStatus(index, item)}`}
              key={index}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Words;
