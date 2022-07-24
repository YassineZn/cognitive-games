import Image from "next/image";
import Link from "next/link";

const GameCard = ({ card }) => {
  return (
    <div className="bg-bg-500 w-80 h-[540px] text-center pb-6 rounded-lg overflow-hidden flex flex-col justify-between">
      <div>
        <div className="relative  mx-auto">
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
      <div className="f-ai-c justify-center gap-4 mt-auto mb-0">
        <a
          href={`${card.playLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-600 py-1 px-6 rounded-sm transition-all hover:bg-orange-500 active:scale-105"
        >
          Play
        </a>
        <a
          href={`${card.repoLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-orange-600 py-1 px-6 rounded-sm transition-all hover:border-orange-500 active:scale-105"
        >
          Github
        </a>
      </div>
    </div>
  );
};

export default GameCard;
