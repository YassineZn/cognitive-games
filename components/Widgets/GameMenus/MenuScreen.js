import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import InstructionsModal from "../InstructionsModal";
import Modal from "../Modal";
const MenuScreen = ({ startPlaying, h1, p, span, ModalItems }) => {
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {isInstructionsModalOpen && (
          <InstructionsModal setIsOpen={setIsInstructionsModalOpen} className="">
            {ModalItems.props.children}
          </InstructionsModal>
        )}
      </AnimatePresence>
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Instructions modal */}

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, type: "tween" }}
          className="font-semibold"
        >
          {h1}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, type: "tween" }}
          className="text-blue-200/75 text-sm mt-4 mb-6"
        >
          {p}
          {span && <span className="text-green-200"> {span}</span>}
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
    </>
  );
};

export default MenuScreen;
