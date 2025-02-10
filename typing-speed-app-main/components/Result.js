import { addResult } from "@/store/typingSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Result() {
  const { result, status, time } = useSelector((state) => state.typing);
  const dispatch = useDispatch();

  useEffect(() => {
    if (time === 0 && status) {
      dispatch(addResult());
    }
  }, [time]);

  const resultColor = (value) => {
    if (value < 30) {
      return "bg-red-200";
    } else if (value < 50) {
      return "bg-orange-200";
    } else if (value < 70) {
      return "bg-yellow-200";
    } else if (value < 150) {
      return "bg-green-200";
    } else {
      return "bg-gray-50";
    }
  };

  return (
    <div
      className={`bg-white min-h-[305px] shadow-lg rounded-lg p-4 flex gap-4 flex-wrap ${
        result.length === 0 && "justify-center"
      } items-center mt-8`}
    >
      {result.length === 0 ? (
        <h1 className="font-extralight italic text-gray-400 text-2xl">Empty Result</h1>
      ) : (
        result.map((item, index) => (
          <div className={`resultItem ${resultColor(item.speed)}`} key={index}>
            <h1 className="text-2xl font-semibold mb-4">Test Result #{index + 1}</h1>
            <div className="flex justify-between mb-2 py-1 px-2 rounded-lg bg-white bg-opacity-40">
              WPM <span className="font-bold">{item.speed} / Minute</span>
            </div>
            <div className="flex justify-between mb-2 py-1 px-2 rounded-lg bg-white bg-opacity-40">
              keystrokes <span className="font-medium">{item.keystrokes}</span>
            </div>
            <div className="flex justify-between mb-2 py-1 px-2 rounded-lg bg-white bg-opacity-40">
              Accuracy <span className="font-medium">{item.accuracy}%</span>
            </div>
            <div className="flex justify-between mb-2 py-1 px-2 rounded-lg bg-white bg-opacity-40">
              Correct words <span className="font-medium">{item.correctWords}</span>
            </div>
            <div className="flex justify-between py-1 px-2 rounded-lg bg-white bg-opacity-40">
              Wrong words <span className="font-medium">{item.wrongWords}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Result;
