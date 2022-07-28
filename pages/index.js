import Head from "next/head";
import Image from "next/image";
import GameCard from "../components/Widgets/GameCard";

export default function Home() {
  const recent = [
    {
      id: 1,
      title: "Ebb and Flow",
      image: "/games/ebb-and-flow/game-interface.webp",
      desc: "The objective of Ebb and Flow is to press the corresponding arrow key in either the direction the green leaves are facing, or in the direction the orange leaves are moving.",
      playLink: "/games/ebb-and-flow",
      repoLink: "https://github.com/YassineZn/cognitive-games",
    },
    {
      id: 2,
      title: "Speed Match",
      image: "/games/speed-match/game-interface.webp",
      desc: "Train your information processing by determining whether the symbols match",
      playLink: "/games/speed-match",
      repoLink: "https://github.com/YassineZn/cognitive-games",
    },
  ];
  const old = [
    {
      title: "Sorting Visualizer",
      image: "/games/other-games/sorting-visualizer.webp",
      desc: "Welcome to Sorting Visualizer! I built this application because I wanted to visualize sorting algorithms in action. I hope that you enjoy playing around with this visualization tool just as much as I enjoyed building it.",
      playLink: "https://yassinezn.github.io/Sorting-Visualizer",
      repoLink: "https://github.com/YassineZn/Sorting-Visualizer",
    },
    {
      title: "Sorting Visualizer",
      image: "/games/other-games/virtual-calculator.webp",
      desc: "Welcome to Virtual Calculator! build with AI to detetct hand gestures and perform mathematical operations.",
      playLink: "https://virtual-calculator.netlify.app/",
      repoLink: "https://github.com/YassineZn/virtual-calculator",
      importantMessage:
        "You need to point to the number with your index and close your thumb to perform an action!!!!!!",
    },
    {
      title: "Snake Game",
      image: "/games/other-games/snake.webp",
      desc: "Welcome to the most famous game!! The snake game.",
      playLink: "https://yassinezn.github.io/snake/",
      repoLink: "https://github.com/YassineZn/snake",
      importantMessage: "Only works for PC!!!!!!",
    },
  ];

  return (
    <section className="pb-40 mx-auto">
      <h2 className="mb-3">Recent</h2>
      <div className="f-ai-c flex-wrap gap-4 md:gap-8">
        {recent.map((card, i) => (
          <div key={i} className="relative">
            {i === 0 && (
              <div className="bouncy bg-blue-600/10 rounded-lg animate-bounce backdrop-blur-md absolute z-[1] left-1/2 py-2 px-6 ">
                Try me!
              </div>
            )}
            <GameCard card={card} />
          </div>
        ))}
      </div>
      <h2 className="mb-3 mt-20">
        Old ones <span className="text-lg">( p5 / native javascript)</span>
      </h2>
      <div className="f-ai-c flex-wrap gap-4 md:gap-8">
        {old.map((card, i) => (
          <GameCard key={i} card={card} />
        ))}
      </div>
      <style jsx>
        {`
          @keyframes bounce {
            0%,
            100% {
              transform: translate(-50%, -125%);
              animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
            50% {
              transform: translate(-50%, -100%);

              animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
          }
          .bouncy {
            animation: bounce 1s infinite;
          }
        `}
      </style>
    </section>
  );
}
