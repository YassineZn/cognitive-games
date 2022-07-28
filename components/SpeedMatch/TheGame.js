import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import CorrectOrWrongIcon from "../Widgets/CorrectOrWrongIcon";
import { BsMoonStarsFill, BsFillTriangleFill, BsFillStarFill, BsApple, BsCaretRightSquareFill } from "react-icons/bs";
const TheGame = ({ isPaused, setNumberOfCorrectAnswers, numberOfMoves, setNumberOfMoves }) => {
  const currentImageRef = useRef();
  const pastImageRef = useRef();
  const [images, setImages] = useState([
    <BsFillStarFill key={0} />,
    <BsMoonStarsFill key={1} />,
    <BsApple key={2} />,
    <BsFillTriangleFill key={3} />,
  ]);
  const [pastImageIndex, setPastImageIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // audio
  const [audio, setAudio] = useState(null);
  // 0 for wrong, 1 for correct
  const [correctOrWrongIcon, setCorrectOrWrongIcon] = useState(null);
  // swipe events
  const handlers = useSwipeable({
    onSwiped: (eventData) => listenToSwipe(eventData.dir.toLocaleLowerCase()),
  });

  useEffect(() => {
    setAudio(new Audio("/games/ebb-and-flow/game-start.mp3"));
    setPastImageIndex(randomNumber(0, 3));
    setCurrentImageIndex(randomNumber(0, 3));
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", listeToArrowKeys);
    return () => {
      window.removeEventListener("keydown", listeToArrowKeys);
    };
  }, [currentImageIndex, pastImageIndex, isPaused]);

  //   listen to arrow keys
  const listeToArrowKeys = (e) => {
    if (!isPaused && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      currentImageRef.current.classList.add("animate");
      pastImageRef.current.classList.add("animate2");
      if (currentImageIndex === pastImageIndex && e.key === "ArrowRight") {
        goodJob();
      } else if (currentImageIndex !== pastImageIndex && e.key === "ArrowLeft") {
        goodJob();
      } else badJob();
    }
  };
  const listenToSwipe = (dir) => {
    if (!isPaused) {
      currentImageRef.current.classList.add("animate");
      pastImageRef.current.classList.add("animate2");
      if (currentImageIndex === pastImageIndex && dir === "right") {
        goodJob();
      } else if (currentImageIndex !== pastImageIndex && dir === "left") {
        goodJob();
      } else badJob();
    }
  };

  // function random number between min and max
  const randomNumber = (min = 0, max) => {
    // 35% chance of getting the same image
    if (Math.random() < 0.35) {
      return currentImageIndex;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  useEffect(() => {}, [currentImageIndex, pastImageIndex]);
  const changeBehavior = () => {
    setNumberOfMoves((prev) => prev + 1);
    setTimeout(() => {
      setPastImageIndex(currentImageIndex);
      setCurrentImageIndex(randomNumber(0, 3));
      currentImageRef?.current?.classList?.remove("animate");
      pastImageRef?.current?.classList?.remove("animate2");
    }, 200);

    // make the correct or icon invisible
    setTimeout(() => {
      setCorrectOrWrongIcon(null);
    }, 500);
  };

  const goodJob = () => {
    setNumberOfCorrectAnswers((prev) => prev + 1);
    console.log("good job");
    setCorrectOrWrongIcon(1);
    setAudio(new Audio("/games/ebb-and-flow/correct.mp3"));
    changeBehavior();
  };
  const badJob = () => {
    console.log("wrong choice");
    setCorrectOrWrongIcon(0);
    setAudio(new Audio("/games/ebb-and-flow/wrong.mp3"));
    changeBehavior();
  };
  useEffect(() => {
    audio?.play();
  }, [audio]);
  return (
    <div {...handlers} className="w-full h-full f-ai-c justify-center gap-2 md:gap-8">
      <h2 className="absolute top-14 max-w-md">Does the current card match the one before it?</h2>
      <div
        ref={pastImageRef}
        className={`text-7xl bg-white p-2 relative overflow-hidden w-40 aspect-square f-ai-c justify-center rounded-lg ${
          pastImageIndex == 0
            ? "text-yellow-400"
            : pastImageIndex == 1
            ? "text-primary-400"
            : pastImageIndex == 2
            ? "text-red-600"
            : "text-green-500"
        }`}
        style={{ boxShadow: "0px 0px 33px -2px rgba(0,0,0,0.2)" }}
      >
        <div className="absolute inset-0 bg-blue-700">
          <Image src="/games/speed-match/texture.webp" alt="card back" layout="fill" style={{ opacity: 0.75 }} />
        </div>
        <Image src="/games/speed-match/card-back.webp" alt="card back" layout="fill" style={{ opacity: 0.3 }} />
        <AnimatePresence>
          {numberOfMoves == 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.2, type: "tween" }}
              className="z-[1] absolute inset-0 bg-white f-ai-c justify-center"
            >
              {images[pastImageIndex]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        ref={currentImageRef}
        id="currentImage"
        className={`text-7xl bg-white p-2 w-40 aspect-square f-ai-c justify-center rounded-lg ${
          currentImageIndex == 0
            ? "text-yellow-400"
            : currentImageIndex == 1
            ? "text-primary-400"
            : currentImageIndex == 2
            ? "text-red-600"
            : "text-green-500"
        }`}
      >
        {images[currentImageIndex]}
      </div>
      <div className="absolute bottom-0 f-ai-c gap-1">
        <div className="bg-white/60 p-3  f-ai-c gap-2">
          <BsCaretRightSquareFill className="text-2xl rotate-180" />
          No
        </div>
        <div className="bg-white/60 p-3 -0 f-ai-c gap-2">
          Yes <BsCaretRightSquareFill className="text-2xl" />
        </div>
      </div>
      <CorrectOrWrongIcon correctOrWrongIcon={correctOrWrongIcon} />

      <style jsx>
        {`
          .animate {
            transform-style: preserve-3d;
            animation: animate 0.5s ease-in-out;
          }
          .animate2 {
            transform-style: preserve-3d;
            animation: animate2 0.5s ease-in-out;
          }
          @keyframes animate {
            0% {
              transform: rotateY(0);
              box-shadow: 4px 4px 22px 5px rgba(0, 0, 0, 0.1);
            }
            50% {
              transform: rotateY(-45deg);
              box-shadow: 6px 6px 22px 8px rgba(0, 0, 0, 0.24);
            }
            100% {
              transform: rotateY(-180deg) translateX(-200px);
              box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.5);
              box-shadow: 10px 10px 22px 11px rgba(0, 0, 0, 0.3);
            }
          }
          @keyframes animate2 {
            20% {
              transform: scale(1.015);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default TheGame;
