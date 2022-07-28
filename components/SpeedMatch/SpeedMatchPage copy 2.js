import GameContainer from "../Widgets/GameContainer";
import MenuScreen from "./MenuScreen";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import PauseAndResume from "../Widgets/PauseAndResume";
import TopGameBoard from "../Widgets/TopGameBoard";
import TheGame from "./TheGame";

const SpeedMatchPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [numberOfMoves, setNumberOfMoves] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { time, start, pause, reset, status } = useTimer({
    endTime: 0,
    initialTime: 59,
    timerType: "DECREMENTAL",
  });
  const startPlaying = () => {
    start();
    setNumberOfCorrectAnswers(0);
    setNumberOfMoves(0);
    setIsPlaying(true);
  };
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
  return (
    <GameContainer className="relative isolate mx-auto text-center">
      <div className="absolute w-full h-full -z-10">
        <Image src="/games/speed-match/bg.webp" alt="bg" layout="fill" />
      </div>
      {!isPlaying && time > 0 && (
        <MenuScreen
          startPlaying={startPlaying}
          h1="Speed Match"
          p="Train your information processing by determining wether the symbols match"
          ModalItems={
            <>
              <motion.img
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.15, type: "tween" }}
                src="/games/speed-match/instruction1.png"
                style={{ objectFit: "contain" }}
              />
              <motion.img
                initial={{ x: +100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: +100, opacity: 0 }}
                transition={{ duration: 0.15, type: "tween" }}
                src="/games/speed-match/instruction2.png"
                style={{ objectFit: "contain" }}
              />
            </>
          }
        />
      )}
      <AnimatePresence>{isPlaying && time > 0 && <TheGame />}</AnimatePresence>

      <PauseAndResume
        time={time}
        reset={reset}
        pause={pause}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />

      {isPlaying && <TopGameBoard isPlaying={isPlaying} time={time} numberOfCorrectAnswers={numberOfCorrectAnswers} />}
    </GameContainer>
  );
};

export default SpeedMatchPage;
