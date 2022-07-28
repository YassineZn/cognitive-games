import GameContainer from "../Widgets/GameContainer";
import MenuScreen from "../Widgets/GameMenus/MenuScreen";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import PauseAndResume from "../Widgets/PauseAndResume";
import TopGameBoard from "../Widgets/TopGameBoard";
import TheGame from "./TheGame";
import MenuEnd from "../Widgets/GameMenus/MenuEnd";

const SpeedMatchPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [numberOfMoves, setNumberOfMoves] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [audio, setAudio] = useState(null);
  const { time, start, pause, reset, status } = useTimer({
    endTime: 0,
    initialTime: 59,
    timerType: "DECREMENTAL",
  });
  const startPlaying = () => {
    setIsPaused(false);
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
  useEffect(() => {
    audio?.play();
  }, [audio]);
  return (
    <GameContainer className="relative isolate mx-auto text-center md:mt-20">
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
                key="image1"
                src="/games/speed-match/instruction1.webp"
                style={{ objectFit: "contain" }}
              />
              <motion.img
                initial={{ x: +100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: +100, opacity: 0 }}
                transition={{ duration: 0.15, type: "tween" }}
                key="image2"
                src="/games/speed-match/instruction2.webp"
                style={{ objectFit: "contain" }}
              />
            </>
          }
        />
      )}
      <AnimatePresence>
        {isPlaying && time > 0 && (
          <TheGame
            isPaused={isPaused}
            setNumberOfCorrectAnswers={setNumberOfCorrectAnswers}
            numberOfMoves={numberOfMoves}
            setNumberOfMoves={setNumberOfMoves}
          />
        )}
      </AnimatePresence>

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

      {isPlaying && <TopGameBoard isPlaying={isPlaying} time={time} numberOfCorrectAnswers={numberOfCorrectAnswers} />}

      {/* End game menu */}
      <AnimatePresence>
        {time <= 0 && (
          <MenuEnd
            startPlaying={startPlaying}
            numberOfMoves={numberOfMoves}
            numberOfCorrectAnswers={numberOfCorrectAnswers}
            h1={"Speed Match"}
          />
        )}
      </AnimatePresence>
    </GameContainer>
  );
};

export default SpeedMatchPage;
