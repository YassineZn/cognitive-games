import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const InstructionsModal = ({ children, className, setIsOpen, isWholePage }) => {
  const [index, setIndex] = useState(0);
  const childrenLength = children.length;

  // close modal when pressing esc
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpen]);
  return (
    <div className={`f-ai-c  inset-0 z-30 justify-center ${isWholePage ? "fixed" : "absolute"}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`inset-0 -z-10 bg-[#000]/40 ${isWholePage ? "fixed" : "absolute"}`}
        onClick={() => setIsOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        key="modal"
        exit={{ opacity: 0, scale: 0 }}
        className={`modal max-w-xl f-ai-c justify-center relative min-h-[12rem] max-h-[90%] min-w-[20rem] rounded-xl bg-white text-[#1c1c1d] p-8 shadow-xl ${className}`}
      >
        <FaTimes className="absolute text-black top-3 right-3 cursor-pointer" onClick={() => setIsOpen(false)} />
        <div className="flex flex-col">
          {childrenLength > 0 && children.map((child, i) => (index === i ? child : <></>))}
          {childrenLength > 0 && (
            <div className="f-ai-c justify-center gap-2 mt-4">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={` font-medium f-ai-c gap-1  ${
                  index <= 0 ? "text-primary-400/20" : "text-primary-400 hover:scale-105 transition-all cursor-pointer"
                }`}
                onClick={() => index > 0 && setIndex((prev) => prev - 1)}
              >
                <FaArrowLeft />
              </motion.span>
              <p className="text-sm">{`0${index + 1}/0${childrenLength}`}</p>
              {
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={` font-medium f-ai-c gap-1  ${
                    index + 1 >= childrenLength
                      ? "text-primary-400/20"
                      : "text-primary-400 hover:scale-105 transition-all cursor-pointer"
                  }`}
                  onClick={() => index < childrenLength - 1 && setIndex((prev) => prev + 1)}
                >
                  Next <FaArrowRight />
                </motion.span>
              }
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default InstructionsModal;
