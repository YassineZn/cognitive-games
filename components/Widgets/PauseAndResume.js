import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";

const PauseAndResume = ({ time, reset, pause, isPlaying, setIsPlaying, isPaused, setIsPaused }) => {
  return (
    <>
      {isPlaying && time > 0 && (
        <button
          className="bg-black/70  p-2 z-20 absolute top-0 left-0 "
          onClick={() => {
            setIsPaused(!isPaused);
            isPaused ? start() : pause();
          }}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      )}
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
                    reset();
                  }}
                >
                  Menu
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default PauseAndResume;
