"use client";

import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './emblaCarouselArrowButtons';

import PlayerCard from "./card";
import { Player } from "../types/Player";
import { normalizeFileName } from "../utils/normalizeFileName";
import { normalizeName } from "../utils/normalizeName";
import { useCallback, useEffect } from 'react';

interface SlideCarrousselProps {
  players: Player[];
  imageExists: boolean;
  currentSeason: string;
  name: string;
  season: string;
  options?: EmblaOptionsType
}

const SlideCarousel: React.FC<SlideCarrousselProps> = (props) => {
  const { players, imageExists, currentSeason, name, season } = props
  const currentIndex = players.findIndex((p) => normalizeName(p.name) === name);

  const Initial = () => {
    if (currentIndex < 7) return currentIndex; // Quando o index atual for menor que 7, sempre centraliza o jogador do currentIndex no centro
    if (currentIndex === players.length - 1) return 14;
    return 7; // A partir do oitavo jogador, centraliza sempre o 8° (index 7)
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, startIndex: Initial(), align: 'center' })
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const numberPlayersStart = currentIndex == players.length - 1 ? -14 : -7;
  const numberPlayersEnd = currentIndex == 0 ? 14 : 7
  const visiblePlayers = players.slice(Math.max(currentIndex + numberPlayersStart, 0), Math.min(currentIndex + numberPlayersEnd, players.length));

  const mostLeftPlayer = players[currentIndex - 6];
  const mostRightPlayer = players[currentIndex + 6 ];

  const handleScroll = useCallback((emblaApi: EmblaCarouselType) => {
    console.log('handlesettle');

    const index = emblaApi.selectedScrollSnap();
    const newPlayer = window.innerWidth >= 1024 ? visiblePlayers[index] : visiblePlayers[index+1];

    console.log('emblaApicanscroll');
    console.log(emblaApi);

    window.history.replaceState({}, "", `/${season}/${normalizeName(newPlayer.name)}`);

    if (emblaApi.canScrollNext() === false) {
      window.location.assign(`/${season}/${normalizeName(mostRightPlayer.name)}`);
    } else if (emblaApi.canScrollPrev() === false) {
      window.location.assign(`/${season}/${normalizeName(mostLeftPlayer.name)}`);
    }

  }, [emblaApi, season, mostLeftPlayer, mostRightPlayer]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("settle", handleScroll);
  }, [emblaApi, handleScroll]);

  return (
    <div>
      <section className="overflow-hidden">
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex gap-4">
            {visiblePlayers.map((player) => {
              const playerImageURL = `https://storage.googleapis.com/mesascout/images/${currentSeason}/${normalizeFileName(
                player.name,
                player.previous_club ?? player.club,
                "player_image"
              )}.png`;
              return <PlayerCard key={player.name} player={player} imageExists={imageExists} playerImageURL={playerImageURL} />;
            })}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-[auto_1fr] justify-between gap-3 mt-7">
        <div className="grid grid-cols-2 gap-3 items-center">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default SlideCarousel;