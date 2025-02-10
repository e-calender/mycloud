import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Countdown() {
  const [timeColor, setTimeColor] = useState("bg-blue-700");
  const time = useSelector((state) => state.typing.time);
  useEffect(() => {
    switch (String(time).slice(0, 1)) {
      case "0":
        setTimeColor("bg-blue-700");
        break;
      case "5":
        setTimeColor("bg-green-600");
        break;
      case "4":
        setTimeColor("bg-green-500");
        break;
      case "3":
        setTimeColor("bg-yellow-500");
        break;
      case "2":
        setTimeColor("bg-yellow-600");
        break;
      case "1":
        setTimeColor("bg-red-600");
        break;
      default:
        break;
    }
  }, [time]);

  return (
    <h1
      className={`md:ms-auto transition-all ease-linear duration-1000 text-4xl text-white flex justify-center  items-center rounded-lg w-14 ${timeColor}`}
    >
      {time === 0 ? "60" : time}
    </h1>
  );
}

export default Countdown;
