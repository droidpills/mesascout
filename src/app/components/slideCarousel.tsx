"use client";

import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './emblaCarouselArrowButtons';

import PlayerCard from "./card";
import { Player } from "../types/Player";
import { normalizeFileName } from "../utils/normalizeFileName";
import { normalizeName } from "../utils/normalizeName";
import { useCallback, useEffect } from 'react';
import ClassNames from 'embla-carousel-class-names';

interface SlideCarrousselProps {
  players: Player[];
  imageExistenceMap: Record<string, boolean>;
  currentSeason: string;
  name: string;
  season: string;
  options?: EmblaOptionsType
}

const SlideCarousel: React.FC<SlideCarrousselProps> = (props) => {
  const { players, imageExistenceMap, currentSeason, name, season } = props
  const currentIndex = players.findIndex((p) => normalizeName(p.name) === name);

  const Initial = () => {
    if (currentIndex < 7) return currentIndex;
    if (currentIndex === players.length - 1) return 14;
    return 7;
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, startIndex: Initial(), align: 'center', containScroll: false }, [ClassNames()])
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const numberPlayersStart = currentIndex == players.length - 1 ? -14 : -7;
  const numberPlayersEnd = currentIndex == 0 ? 14 : 7
  const visiblePlayers = players.slice(Math.max(currentIndex + numberPlayersStart, 0), Math.min(currentIndex + numberPlayersEnd, players.length));

  let mostRightIndex = 7;
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    mostRightIndex = 6;
  }

  const mostLeftPlayer = players[currentIndex - 7];
  const mostRightPlayer = players[currentIndex + mostRightIndex];

  const handleScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const index = emblaApi.selectedScrollSnap();
    const newPlayer = visiblePlayers[index];

    window.history.replaceState({}, "", `/season/${season}/${normalizeName(newPlayer.name)}`);

    if (emblaApi.canScrollNext() === false) {

      window.location.assign(`/season/${season}/${normalizeName(mostRightPlayer.name)}`);
    } else if (emblaApi.canScrollPrev() === false) {
      window.location.assign(`/season/${season}/${normalizeName(mostLeftPlayer.name)}`);
    }

  }, [season, mostLeftPlayer, mostRightPlayer, visiblePlayers]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("settle", handleScroll);
  }, [emblaApi, handleScroll]);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex gap-4">
            {visiblePlayers.map((player) => {
              const playerImageURL = `https://storage.googleapis.com/mesascout/images/${currentSeason}/${normalizeFileName(
                player.name,
                player.previous_club ?? player.club,
                "player_image"
              )}.png`;

              return (
                <PlayerCard
                  key={player.name}
                  player={player}
                  playerImageURL={playerImageURL}
                  imageExists={imageExistenceMap[player.name]}
                />
              );
            })}
          </div>
          <div className={`absolute left-10 top-[35%] -translate-y-1/2 lg:top-1/2`}>
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} className={currentIndex == 0 && emblaApi?.canScrollPrev() === false ? 'hidden' : ''} />
          </div>
          <div className="absolute right-10 top-[35%] -translate-y-1/2 lg:top-1/2">
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} className={currentIndex == (players.length - 1) && emblaApi?.canScrollNext() === false ? 'hidden' : ''} />
          </div>
        </div>
      </section>

    </div>
  );
};

export default SlideCarousel;