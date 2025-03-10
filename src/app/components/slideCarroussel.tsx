"use client";

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
  season:string;
}

const SlideCarroussel: React.FC<SlideCarrousselProps> = ({ players, imageExists, currentSeason, name, season }) => {
  const currentIndex = players.findIndex((p) => normalizeName(p.name) === name);

  let numberPlayersStart = -7;

  if(currentIndex == players.length -1 )
    numberPlayersStart = -14;

  let numberPlayersEnd = 7;

  if(currentIndex == 0 )
    numberPlayersEnd = 14;

  const visiblePlayers = players.slice(Math.max(currentIndex + numberPlayersStart, 0), Math.min(currentIndex + numberPlayersEnd, players.length));

  const Initial = () => {
    if (visiblePlayers.length > 6) {
      if (currentIndex < 7) return currentIndex; // Quando o index atual for menor que 7, sempre centraliza o jogador do currentIndex no centro
      if(currentIndex === players.length -1 ) return 14;
      return 7; // A partir do oitavo jogador, centraliza sempre o 8° (index 7)
    }
  };

  const settings = {
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: Initial(),
    onEdge: (direction:string) => handleEdge(direction),
    afterChange: (index:number) => handleAfterChange(index),
    centerMode: true,
    centerPadding: "0px",
    className: "center",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleEdge = (direction: string ) => {
    console.log(direction)
    if (direction == 'right') {
        console.log(visiblePlayers[0])

    }
    window.location.reload()
  }

  const handleAfterChange = (index: number) => {
    console.log(visiblePlayers[index])
    window.history.replaceState({}, '', `/${season}/${normalizeName(visiblePlayers[index].name)}`)
  }

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