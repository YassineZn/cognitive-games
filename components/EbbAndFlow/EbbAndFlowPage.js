import GameContainer from "../Widgets/GameContainer";
import Image from "next/image";
import LeafGroup from "./LeafGroup";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../Widgets/Modal";
import { useTimer } from "use-timer";
import { FaAmilia } from "react-icons/fa";
const EbbAndFlowPage = () => {
  const [gameContainerRef, bounds] = useMeasure();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);

  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [numberOfMoves, setNumberOfMoves] = useState(0);

  const { time, start, pause, reset, status } = useTimer({
    endTime: 0,
    initialTime: 60,
    timerType: "DECREMENTAL",
  });

  useEffect(() => {
    if (time <= 0) {
      new Audio("/games/ebb-and-flow/game-end.mp3").play();
    }
  }, [time]);
  const disablePageScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enablePageScroll = () => {
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    if (isPlaying) disablePageScroll();
    else enablePageScroll();
  }, [isPlaying]);

  // pausing the game
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      pause();
      setIsPaused(true);
    }
  };
  useEffect(() => {
    !isPaused && isPlaying && start();
    isPlaying && document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsPaused, isPlaying, isPaused]);

  const startPlaying = () => {
    start();
    setNumberOfCorrectAnswers(0);
    setNumberOfMoves(0);
    setIsPlaying(true);
  };
  return (
    <div className="overflow-hidden text-center  md:mt-20">
      <GameContainer ref={gameContainerRef} className="relative isolate mx-auto">
        <div className="absolute w-full h-full -z-10">
          <Image src="/games/ebb-and-flow/bg.jpg" alt="bg" layout="fill" />
        </div>
        {/* Instructions modal */}
        <AnimatePresence>
          {isInstructionsModalOpen && (
            <Modal setIsOpen={setIsInstructionsModalOpen} isWholePage={true} className="">
              {/* <p>
                The objective of Ebb and Flow is to press the corresponding arrow key in either the direction the green
                leaves are facing, or in the direction the orange leaves are moving.
              </p>
              <p className="mt-2">
                For example, if the green leaves are pointing left but moving to the right, then press the left arrow
                key (or swipe left on your phone screen if playing on mobile.) If the orange leaves are moving up but
                are pointing down, then press the up arrow key (or swipe up on your phone screen if playing on mobile.)
              </p> */}
              <div className="flex flex-col">
                <img src="/games/ebb-and-flow/instruction1.png" style={{ objectFit: "contain" }} />
                <img src="/games/ebb-and-flow/instruction2.png" style={{ objectFit: "contain" }} />
              </div>
            </Modal>
          )}
        </AnimatePresence>

        {/* Pause modal */}
        <AnimatePresence>
          {isPaused && (
            <Modal setIsOpen={setIsPaused} className="">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <button
                    onClick={() => {
                      setIsPaused(false);
                    }}
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => {
                      setIsPaused(false);
                      setIsPlaying(false);
                    }}
                  >
                    Menu
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </AnimatePresence>

        {/* Top board */}

        {isPlaying && (
          <div className="absolute top-0 right-0  text-black f-ai-c z-10 gap-1">
            <div className="bg-slate-200 py-1 px-3">Time: 00:{time < 10 ? "0" + time : time}</div>
            <div className="bg-slate-200 py-1 px-3">Score: {50 * numberOfCorrectAnswers}</div>
          </div>
        )}
        {/* Game */}
        <AnimatePresence>
          {isPlaying && time > 0 && (
            <LeafGroup
              gameBounds={bounds}
              isPaused={isPaused}
              setNumberOfCorrectAnswers={setNumberOfCorrectAnswers}
              setNumberOfMoves={setNumberOfMoves}
            />
          )}
        </AnimatePresence>
        {/* First game interface (Menu) */}
        {!isPlaying && time > 0 && (
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, type: "tween" }}
              className="font-semibold"
            >
              Ebb and Flow
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, type: "tween" }}
              className="text-blue-200/75 text-sm mt-4 mb-6"
            >
              Train your task switching ability by shifting focus between where the leaves point and how they move
            </motion.p>
            <div className="text-xl gap-4 f-ai-c flex-wrap-reverse md:flex-nowrap">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, type: "tween" }}
                className="rounded-full border-4 border-white  hover:bg-opacity-90 transition-all active:scale-[1.02] text-white px-4 w-48  py-3"
                onClick={setIsInstructionsModalOpen}
              >
                How To Play?
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.355, type: "tween" }}
                className="rounded-full bg-orange-600 border-4 border-orange-600 hover:bg-opacity-90 transition-all active:scale-[1.02] text-white px-4 w-48 py-3"
                onClick={startPlaying}
              >
                play
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* End game menu */}
        <AnimatePresence>
          {time <= 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, type: "tween" }}
              className="absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 whitespace-nowrap"
            >
              <h1 className="font-semibold">Ebb and Flow</h1>
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
          )}
        </AnimatePresence>
      </GameContainer>
    </div>
  );
};

export default EbbAndFlowPage;
