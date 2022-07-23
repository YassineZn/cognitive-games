import Head from "next/head";
import Image from "next/image";
import GameCard from "../components/Widgets/GameCard";

export default function Home() {
  const card = {
    title: "title",
    image: "image",
  };
  return (
    <h1 className="text-red-400">
      <GameCard card={card} />
    </h1>
  );
}
