import Head from "next/head";
import Image from "next/image";
import GameCard from "../components/Widgets/GameCard";

export default function Home() {
  const card1 = {
    id: 1,
    title: "Ebb and Flow",
    image: "/games/ebb-and-flow/game-interface.png",
    desc: "The objective of Ebb and Flow is to press the corresponding arrow key in either the direction the green leaves are facing, or in the direction the orange leaves are moving.",
    playLink: "/games/ebb-and-flow",
    repoLink: "https://github.com/YassineZn/cognitive-games",
  };
  const card2 = {
    title: "Sorting Visualizer",
    image: "/games/other-games/sorting-visualizer.png",
    desc: "Welcome to Sorting Visualizer! I built this application because I wanted to visualize sorting algorithms in action. I hope that you enjoy playing around with this visualization tool just as much as I enjoyed building it.",
    playLink: "https://yassinezn.github.io/Sorting-Visualizer",
    repoLink: "https://github.com/YassineZn/Sorting-Visualizer",
  };
  const card3 = {
    title: "Sorting Visualizer",
    image: "/games/other-games/virtual-calculator.png",
    desc: "Welcome to Virtual Calculator! build with AI to detetct hand gestures and perform mathematical operations.",
    playLink: "https://virtual-calculator.netlify.app/",
    repoLink: "https://github.com/YassineZn/virtual-calculator",
    importantMessage: "You need to point to the number with your index and close your thumb to perform an action!!!!!!",
  };
  const card4 = {
    title: "Snake Game",
    image: "/games/other-games/snake.png",
    desc: "Welcome to the most famous game!! The snake game.",
    playLink: "https://yassinezn.github.io/snake/",
    repoLink: "https://github.com/YassineZn/snake",
    importantMessage: "Only works for PC!!!!!!",
  };
  return (
    <section className="pb-40">
      <h2 className="mb-3">Recent</h2>
      <div>
        <GameCard card={card1} />
      </div>
      <h2 className="mb-3 mt-20">
        Old ones <span className="text-lg">( p5 / native javascript)</span>
      </h2>
      <div className="f-ai-c gap-8">
        <GameCard card={card2} />
        <GameCard card={card3} />
        <GameCard card={card4} />
      </div>
    </section>
  );
}
