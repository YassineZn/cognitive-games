import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const CorrectOrWrongIcon = ({ correctOrWrongIcon }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.75 }}
        className="text-7xl"
        key="correctOrWrongIcon"
      >
        {correctOrWrongIcon == 0 ? (
          <FaTimes className="text-red-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
        ) : correctOrWrongIcon == 1 ? (
          <FaCheck className="text-green-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
        ) : (
          <></>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CorrectOrWrongIcon;
