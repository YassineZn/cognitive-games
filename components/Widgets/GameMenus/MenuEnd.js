import { motion } from "framer-motion";

const MenuEnd = ({ startPlaying, numberOfMoves, numberOfCorrectAnswers, h1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, type: "tween" }}
      className="absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 whitespace-nowrap"
    >
      <h1 className="font-semibold">{h1}</h1>
      <div className="mt-4 mb-6 text-2xl w-fit mx-auto">
        <div className="f-ai-c text-start gap-10 font-bold ">
          <p className="w-28">Score</p> <p>{numberOfCorrectAnswers * 50}</p>
        </div>
        <div className="f-ai-c text-start gap-10 w-fit mx-auto">
          <p className="w-28">Correct</p>
          <p>
            {numberOfCorrectAnswers} / {numberOfMoves}
          </p>
        </div>
      </div>
      <button
        className="rounded-full bg-orange-600 border-4 border-orange-600 hover:bg-opacity-90 transition-all active:scale-[1.02] text-white px-4 w-60 py-3"
        onClick={startPlaying}
      >
        Play Again
      </button>
    </motion.div>
  );
};

export default MenuEnd;
