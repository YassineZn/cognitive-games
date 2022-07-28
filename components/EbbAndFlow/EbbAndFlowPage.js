import GameContainer from "../Widgets/GameContainer";
import Image from "next/image";
import LeafGroup from "./LeafGroup";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { motion, AnimatePresence } from "framer-motion";
import { useTimer } from "use-timer";
import MenuScreen from "../Widgets/GameMenus/MenuScreen";
import TopGameBoard from "../Widgets/TopGameBoard";
import PauseAndResume from "../Widgets/PauseAndResume";
import MenuEnd from "../Widgets/GameMenus/MenuEnd";
const EbbAndFlowPage = () => {
  const [gameContainerRef, bounds] = useMeasure();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [numberOfMoves, setNumberOfMoves] = useState(0);

  const { time, start, pause, reset, status } = useTimer({
    endTime: 0,
    initialTime: 59,
    timerType: "DECREMENTAL",
  });

  useEffect(() => {
    if (time <= 0) {
      new Audio("/games/ebb-and-flow/game-end.mp3").play();
    }
  }, [time]);

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
    setIsPaused(false);
    setNumberOfCorrectAnswers(0);
    setNumberOfMoves(0);
    setIsPlaying(true);
  };
  return (
    <div className="overflow-hidden text-center  md:mt-20">
      <GameContainer ref={gameContainerRef} className="relative isolate mx-auto">
        <div className="absolute w-full h-full -z-10">
          <Image src="/games/ebb-and-flow/bg.webp" alt="bg" layout="fill" />
        </div>

        {time > 0 && (
          <PauseAndResume
            time={time}
            reset={reset}
            pause={pause}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
          />
        )}

        {isPlaying && (
          <TopGameBoard isPlaying={isPlaying} time={time} numberOfCorrectAnswers={numberOfCorrectAnswers} />
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
          <MenuScreen
            startPlaying={startPlaying}
            h1="Ebb and Flow"
            p="Train your task switching ability by shifting focus between where the leaves point and how they move"
            span="(works with both arrowkeys and gestures on mobile)"
            ModalItems={
              <>
                <motion.img
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.15, type: "tween" }}
                  key="image1"
                  src="/games/ebb-and-flow/instruction1.webp"
                  style={{ objectFit: "contain" }}
                />
                <motion.img
                  initial={{ x: +100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: +100, opacity: 0 }}
                  transition={{ duration: 0.15, type: "tween" }}
                  key="image2"
                  src="/games/ebb-and-flow/instruction2.webp"
                  style={{ objectFit: "contain" }}
                />
              </>
            }
          />
        )}

        {/* End game menu */}
        <AnimatePresence>
          {time <= 0 && (
            <MenuEnd
              startPlaying={startPlaying}
              numberOfMoves={numberOfMoves}
              numberOfCorrectAnswers={numberOfCorrectAnswers}
              h1={"Ebb And Flow"}
            />
          )}
        </AnimatePresence>
      </GameContainer>
    </div>
  );
};

export default EbbAndFlowPage;
