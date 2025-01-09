import { data } from "./Assets/data";
import { useRef, useState } from "react";
import "./Components/costum.css";

const App = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let optionaArray = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (index === data.length - 1) {
        setResult(true);
      }
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optionaArray[question.ans - 1].current.classList.add("correct");
      }
    }
  };
  const nextIndex = () => {
    if (lock === true) {
      setIndex((prev) => prev + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      index === data.length - 1 ? setIndex(0) : null;
      optionaArray.forEach((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
        return null;
      });
    }
  };

  const replay = () => {
    setIndex(0);
    setQuestion(data[index]);
    setLock(false);
    setScore(0);
    setResult(false);
  };

  return (
    <section className="h-screen w-screen bg-gradient-to-b from-gray-500 to-blue-700 flex items-center font-poppins">
      <div className="container relative lg:w-[700px] mdx:w-[85vw] mdx border h-fit mx-auto px-[40px] py-[30px] bg-whiteColor rounded-lg">
        <h1 className="text-[1.8rem] font-semibold">Quiz App</h1>
        {/* <span className="absolute top-[10px] right-[20px]"> Score : {score} </span> */}
        <hr className="w-full mx-auto bg-gray-500 border-none h-[2px] my-[1rem]" />
        {!result ? (
          <>
            <h2 className="text-[1.2rem] mb-[.5rem] mt-[.7rem] font-semibold">
              {index + 1}. {question.question}
            </h2>
            <ul className="flex flex-col text-[1rem]">
              <li
                ref={option1}
                onClick={(e) => checkAns(e, 1)}
                className="border-gray-500 border-2 rounded-md px-[10px] py-[1rem] my-[.5rem] cursor-pointer bg-gray-300"
              >
                {question.option1}
              </li>
              <li
                ref={option2}
                onClick={(e) => checkAns(e, 2)}
                className="border-gray-500 border-2 rounded-md px-[10px] py-[1rem] my-[.5rem] cursor-pointer bg-gray-300"
              >
                {question.option2}
              </li>
              <li
                ref={option3}
                onClick={(e) => checkAns(e, 3)}
                className="border-gray-500 border-2 rounded-md px-[10px] py-[1rem] my-[.5rem] cursor-pointer bg-gray-300"
              >
                {question.option3}
              </li>
              <li
                ref={option4}
                onClick={(e) => checkAns(e, 4)}
                className="border-gray-500 border-2 rounded-md px-[10px] py-[1rem] my-[.5rem] cursor-pointer bg-gray-300"
              >
                {question.option4}
              </li>
            </ul>
            <button
              onClick={nextIndex}
              className="my-[1rem] bg-blue-900 hover:bg-blue-950 active:bg-blue-900 text-whiteColor rounded-md px-[50px] py-[10px] mb-[20px] mx-auto block"
            >
              Next
            </button>
            <h2 className="text-center ">
              {index + 1} of {data.length} questions
            </h2>
          </>
        ) : (
          <>
            <h2 className="text-[1.2rem] mt-8 mb-[1rem]">
              Consgratulate ! You scored{" "}
              <span className="font-semibold">{score}</span> of{" "}
              <span className="font-semibold">{data.length}</span>
            </h2>
            <button
              onClick={replay}
              className="my-[2rem] bg-blue-900 hover:bg-blue-950 active:bg-blue-900 text-whiteColor rounded-md px-[50px] py-[10px] mb-[20px] mx-auto block"
            >
              Replay
            </button>
          </>
        )}
      </div>
    </section>
  );
};
export default App;
