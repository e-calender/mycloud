import { changeInput } from "@/store/typingSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function TypingInput() {
  const { input } = useSelector((state) => state.typing);
  const dispatch = useDispatch();
  return (
    <input
      className="w-full md:w-2/4 h-14 p-4 bg-white shadow-lg rounded-lg  block border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
    "
      value={input}
      type="text"
      placeholder="metin girin"
      onChange={(e) => dispatch(changeInput(e.target.value))}
    />
  );
}

export default TypingInput;
