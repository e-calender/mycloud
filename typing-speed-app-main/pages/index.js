import { Inter } from "next/font/google";
import Words from "@/components/Words";
import Result from "@/components/Result";
import TypingInput from "@/components/TypingInput";
import { useDispatch, useSelector } from "react-redux";
import { changeText, changeTime, getData } from "@/store/typingSlice";
import { useEffect } from "react";
import Countdown from "@/components/Countdown";
import RestartBtn from "@/components/RestartBtn";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();
  const { data, text, time } = useSelector((state) => state.typing);
  useEffect(() => {
    dispatch(getData({ lang: "tr" }));
  }, []);

  useEffect(() => {
    const timer = time > 0 && setInterval(() => dispatch(changeTime()), 1000);
    return () => clearInterval(timer);
  }, [time]);
  return (
    <main className={`${inter.className} container`}>
      <h1 className="text-5xl font-bold text-center mt-4 mb-14">Typing Test</h1>
      <div className="w-full lg:w-[900px] mx-auto">
        <div className="flex flex-col md:flex-row items-center mb-4 gap-4">
          <select
            name="lang"
            id="lang"
            className="dropdown"
            defaultValue={"tr"}
            onChange={(e) => dispatch(getData({ lang: e.target.value }))}
          >
            <option value="tr">Türkçe</option>
            <option value="en">İngilizce</option>
          </select>

          <select
            name="wordtext"
            id="wordtext"
            className="dropdown"
            defaultValue={text}
            onChange={(e) => dispatch(changeText(e.target.value))}
          >
            {data.map((item) => {
              return (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <Countdown />
        </div>

        <Words />
      </div>

      <div className="flex justify-center mt-4">
        <TypingInput />
        <RestartBtn />
      </div>

      {<Result />}
    </main>
  );
}
