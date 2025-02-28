"use client";

import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlayerCard from "./card";
import { Player } from "../types/Player";
import { normalizeFileName } from "../utils/normalizeFileName";
import { normalizeName } from "../utils/normalizeName";

interface AsNavForProps {
  players: Player[];
  imageExists: boolean;
  currentSeason: string;
  name: string;
}

const AsNavFor: React.FC<AsNavForProps> = ({ players, imageExists, currentSeason, name }) => {
  const currentIndex = players.findIndex((p) => normalizeName(p.name) === name);
  const [initialized, setInitialized] = useState(true);
  const [visiblePlayers, setVisiblePlayers] = useState(players.slice(Math.max(currentIndex - 2, 0), Math.min(currentIndex + 3, players.length)));

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: currentIndex,
        },
      },
    ],
    initialSlide: visiblePlayers.length > 2 ? 2 : Math.floor(visiblePlayers.length / 2),
    afterChange: (current: number) => handleAfterChange(current),
    className: "center",
    centerMode: true,
  };

  const handleClick = (direction: "next" | "prev") => {
    console.log('handle click func')
    const middleIndex = Math.floor(visiblePlayers.length / 2);
    const newIndex = visiblePlayers[middleIndex]
      ? players.findIndex((p) => normalizeName(p.name) === normalizeName(visiblePlayers[middleIndex].name))
      : currentIndex;

    const offset = direction === "next" ? 1 : -1;
    const targetIndex = newIndex + offset;

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
    if (!initialized) {
      setInitialized(true);
    } else {
      if (current === Math.min(visiblePlayers.length - 1, 2)) {
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

export default AsNavFor;