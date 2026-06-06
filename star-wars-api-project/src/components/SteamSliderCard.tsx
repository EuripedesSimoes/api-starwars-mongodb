import { motion } from "framer-motion";
import { useState } from "react";
import type { Game } from "../helpers/GameCard.types";

interface Props {
  game: Game;
}

export default function SteamSliderCard({
  game,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  // console.log(hovered, clicked)


  return (
    <motion.div
      onClick={() => { setClicked(!clicked) }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`
      relative
      self-start
        w-auto
        h-auto
        ${clicked ? 'cursor-zoom-out' : 'cursor-zoom-in'}
        overflow-visible
        rounded-t-xl
      `}
    >
      {/* IMAGEM */}

      <motion.div
        animate={{
          scale: clicked ? 1.05 : 1,
        }}
        className="
          relative
        "
        transition={{
          duration: 0.35, // aumento da imagem
        }}
      >
        <img
          src={game.cover}
          alt={game.title}
          className="
            h-64
            w-full
            object-center
            object-cover
            rounded-t-lg
          "
        />

        {/* Fade branco */}

        <motion.div
          animate={{
            opacity: clicked ? 0.5 : 0,
          }}
          className="
            absolute
            inset-0
            bg-black/30
            rounded-xl
          "
        />
      </motion.div>

      {/* GAVETA */}

      <motion.div
        initial={false}
        animate={{
          height: clicked ? "auto" : 0,
          opacity: clicked ? 1 : 0,
          scale: clicked ? 1.05 : 1,
        }}
        transition={{
          // delay:0.5,
          duration: 0.3,
          ease: 'easeOut',
        }}
        className={`
          absolute
          ${clicked ? "block" : "hidden"}
          inset-x-0
          z-50
          overflow-visible
          mt-2
          bg-linear-to-t from-zinc-900 via-gray-800 to-black/95
         rounded-b-xl
        `}
        
      >
        <div className={`
          ${clicked ? "block" : "hidden"}
          p-4 space-y-2 
          `
          }>
          <h3 className="font-semibold text-white/85">
            {game.title}
          </h3>

          <p>{game.platform}</p>

          <p>
            {game.playedHours} horas
          </p>

          {/* <p>{game.status}</p> */}
        </div>
      </motion.div>
    </motion.div>
  );
}