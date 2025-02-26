"use client";

import { useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlayerCard from "./card";
import { Player } from "../types/Player";
import { normalizeFileName } from "../utils/normalizeFileName";

interface AsNavForProps {
  players: Player[];
  imageExists: boolean;
  currentSeason: string;
}

const AsNavFor: React.FC<AsNavForProps> = ({ players, imageExists, currentSeason}) => {
  const [numPlayers, setNumPlayers] = useState(6);


  const handleClick = () => {
    setNumPlayers((prev) => (prev === 6 ? 12 : 6));
  };

  return (
    <div className="slider-container m-5">
      <button className="button mb-4" onClick={handleClick}>
        {numPlayers === 5 ? "Mostrar mais jogadores" : "Mostrar menos jogadores"}
      </button>

      <Slider infinite={false} speed={500} slidesToShow={3} slidesToScroll={3}>
        {players.map((player) => {
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
