import { motion } from "framer-motion";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ children, className, setIsOpen, isWholePage }) => {
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
        className={`modal max-w-xl f-ai-c justify-center relative min-h-[12rem] min-w-[20rem] rounded-xl bg-white text-[#1c1c1d] p-8 shadow-xl ${className}`}
      >
        <FaTimes className="absolute text-black top-3 right-3 cursor-pointer" onClick={() => setIsOpen(false)} />

        {children && children}
      </motion.div>
    </div>
  );
};

export default Modal;
