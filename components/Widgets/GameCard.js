import Image from "next/image";
import Link from "next/link";

const GameCard = ({ card }) => {
  return (
    <div className="bg-bg-500 w-[22rem] h-[580px] text-center pb-8 rounded-lg overflow-hidden flex flex-col justify-between shadow-xl shadow-slate-700/[0.15]">
      <div>
        <div className="relative  mx-auto hover:scale-[1.025] transition-transform duration-300">
          <img src={card.image} alt={card.title} />
        </div>
        <div className="py-4 px-6">
          <h3 className="text-white text-3xl">{card.title}</h3>
          <div className="mt-2 mb-4">
            {card.desc && <p className="text-sm text-light-400 font-light ">{card.desc}</p>}
            {card?.id === 1 && <p className="text-[#7376af] text-md mt-1"> (works with both arrowkeys and gestures)</p>}

            {card.importantMessage && <p className="text-sm text-red-600 mt-2">{card.importantMessage}</p>}
          </div>
        </div>
      </div>
      <div className="f-ai-c justify-center font-semibold gap-4 mt-auto mb-0">
        <a
          href={`${card.playLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-600 py-3 px-10 rounded-[4px] transition-all hover:bg-orange-500 active:scale-105"
        >
          Play
        </a>
        <a
          href={`${card.repoLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-orange-600 py-3 px-10 rounded-[4px] transition-all hover:border-orange-500 active:scale-105"
        >
          Github
        </a>
      </div>
    </div>
  );
};

export default GameCard;
