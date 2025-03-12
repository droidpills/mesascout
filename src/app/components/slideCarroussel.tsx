"use client";

import { EmblaOptionsType} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './emblaCarouselArrowButtons';
import { DotButton, useDotButton } from './emblaCarouselDotButton';

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
  slides: number[]
  options?: EmblaOptionsType
}

const SlideCarroussel: React.FC<SlideCarrousselProps> = (props) => {
  const { players, imageExists, currentSeason, name, season } = props
  const currentIndex = players.findIndex((p) => normalizeName(p.name) === name);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, startIndex: currentIndex, align:'center' })
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  let numberPlayersStart = -7;
  if (currentIndex == players.length - 1)
    numberPlayersStart = -14;

  let numberPlayersEnd = 7;
  if (currentIndex == 0)
    numberPlayersEnd = 14;

  //console.log(currentIndex)

  const visiblePlayers = players.slice(Math.max(currentIndex + numberPlayersStart, 0), Math.min(currentIndex + numberPlayersEnd, players.length));

  const mostLeftPlayer = players[currentIndex - 8];
  const mostRightPlayer = players[currentIndex + 8];

  const handleScroll = useCallback((emblaApi: object) => {
    //if (!emblaApi) return;
    const progress = emblaApi.scrollProgress();

    console.log('handlesettle');

    const index = emblaApi.selectedScrollSnap();
    const newPlayer = visiblePlayers[index];

    console.log('emblaApicanscroll');
    console.log(emblaApi);

    //console.log('newPlayer');
   // console.log(newPlayer);

    window.history.replaceState({}, "", `/${season}/${normalizeName(newPlayer.name)}`);



    if (emblaApi.canScrollNext() === false) {
      window.location.assign(`/${season}/${normalizeName(mostRightPlayer.name)}`);
    } else if (emblaApi.canScrollPrev() === false) {
      window.location.assign(`/${season}/${normalizeName(mostLeftPlayer.name)}`);
    }

  }, [emblaApi, season, mostLeftPlayer, mostRightPlayer]);
  
  /*
  const handleAfterChange = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    const newPlayer = visiblePlayers[index];

    if (newPlayer) {
      window.history.replaceState({}, "", `/${season}/${normalizeName(newPlayer.name)}`);
    }
  }, [emblaApi, season, visiblePlayers]);*/

  const SLIDE_COUNT = 5
  const slides = Array.from(Array(SLIDE_COUNT).keys())

  useEffect(() => {
    if (!emblaApi) return;

   // emblaApi.on("select", handleAfterChange);

    emblaApi.on("settle", handleScroll);

   /* return () => {
      emblaApi.off("select", handleAfterChange);
      emblaApi.off("scroll", handleEdge);
    };*/
  }, [emblaApi, handleScroll]);
  return (
    <div>
      <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
        {visiblePlayers.map((player) => {
           // console.log(player)
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
    </div>
  );
 /*
  return (
 
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {visiblePlayers.map((player) => {
           // console.log(player)
            const playerImageURL = `https://storage.googleapis.com/mesascout/images/${currentSeason}/${normalizeFileName(
              player.name,
              player.previous_club ?? player.club,
              "player_image"
            )}.png`;
            return <PlayerCard key={player.name} player={player} imageExists={imageExists} playerImageURL={playerImageURL} />;
          })}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>

  );
  */
};

export default SlideCarroussel;