"use client";

import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlayerCard from "./card";
import { Player } from "../types/Player";
import { normalizeFileName } from "../utils/normalizeFileName";
import { normalizeName } from "../utils/normalizeName";

interface SlideCarrousselProps {
  players: Player[];
  imageExists: boolean;
  currentSeason: string;
  name: string;
}

const SlideCarroussel: React.FC<SlideCarrousselProps> = ({ players, imageExists, currentSeason, name }) => {
  const currentIndex = players.findIndex((p) => normalizeName(p.name) === name);
  const [initialized, setInitialized] = useState(false);
  const [visiblePlayers, setVisiblePlayers] = useState(players.slice(Math.max(currentIndex - 2, 0), Math.min(currentIndex + 3, players.length)));

  const Initial = () => {
    if (visiblePlayers.length > 2) {
      if (currentIndex === 0) return 0; // Primeiro jogador no centro
      if (currentIndex === 1) return 1; // Segundo jogador no centro
      return 2; // A partir do terceiro jogador, centraliza sempre o 3° (index 2)
    }
    return Math.floor(visiblePlayers.length / 2); // Quando tiver só 1 ou 2 jogadores
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: Initial(),
    beforeChange: (current: number) => handleAfterChange(current),
    centerMode: true,
    centerPadding: "0px",
    className: "center",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          beforeChange: (current: number) => handleAfterChange(current),
        },
      },
    ],
  };

  console.log(`currentIndex : ${currentIndex}`)
  console.log(`visiblePlayers : ${visiblePlayers.length}`)

  const handleClick = (direction: "next" | "prev") => {
    console.log('ola')
    const middleIndex = Initial();
    const newIndex = visiblePlayers[middleIndex]
      ? players.findIndex((p) => normalizeName(p.name) === normalizeName(visiblePlayers[middleIndex].name))
      : currentIndex;


    const offset = direction === "next" ? 1 : -1;
    const targetIndex = newIndex + offset;
    console.log(`targetIndex ${targetIndex}`)

    if (targetIndex >= 0 && targetIndex < players.length) {
      let start = Math.max(targetIndex - 2, 0);
      let end = start + 5;
      if (end > players.length) {
        end = players.length;
        start = Math.max(end - 5, 0);
      }
      setVisiblePlayers(players.slice(start, end));
    }
  };

  const handleAfterChange = (current: number) => {
    console.log('ola1')
    const isSingleSlide = settings.slidesToShow === 1 || window.innerWidth <= 1024;

    if (!initialized) {
      console.log('ola2')
      setInitialized(false);
    } else {
      console.log('ola3')
      const limit = isSingleSlide ? Math.max(visiblePlayers.length - 1, 2) : Math.min(visiblePlayers.length - 1, 2);
      console.log(`limit ${limit}`)
      console.log(`current ${current}`)
      if (current >= limit) {
        handleClick("next");
      } else if (current === 0) {
        handleClick("prev");

      }
    }
  };

  return (
    <div className="slider-container m-5">
      <Slider {...settings}>
        {visiblePlayers.map((player) => {
          const playerImageURL = `https://storage.googleapis.com/mesascout/images/${currentSeason}/${normalizeFileName(
            player.name,
            player.previous_club ?? player.club,
            "player_image"
          )}.png`;

          return <PlayerCard key={player.name} player={player} imageExists={imageExists} playerImageURL={playerImageURL} />;
        })}
      </Slider>
    </div>
  );
};

export default SlideCarroussel;