import Image from "next/image";
import React from "react";

interface RecipesHeroProps {
  headline: string;
  heading: string;
  imageSrc?: string;
}

const RecipesHero = ({
  heading,
  headline,
  imageSrc = "/food.jpg",
}: RecipesHeroProps) => {
  return (
    <section className="rounded-xl overflow-hidden relative h-56 md:h-64 lg:h-96">
      <div className="h-full w-full absolute inset-0 bg-black/60 text-white flex items-center justify-center flex-col">
        <p className="text-lg font-medium">{headline}</p>
        <h1 className="font-display text-5xl">{heading}</h1>
      </div>
      <Image
        src={imageSrc}
        alt="Zdjęcie jedzenia"
        fill
        className="w-full h-full object-cover absolute inset-0 -z-10 group-hover:scale-105 transition"
      />
    </section>
  );
};

export default RecipesHero;
