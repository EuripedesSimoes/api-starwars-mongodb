import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Game } from "../helpers/GameCard.types";


interface Props {
  game: Game;
}

export default function SteamHoverCard({ game, }: Props) {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  const isOpen = hovered || selected;
  // console.log(hovered, selected)
  return (
    <>
      {/* BACKDROP */}

      <AnimatePresence>
        {hovered && (
          <motion.div // blur de fundo
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              bg-black/20
              backdrop-blur-[2px]
              z-40
              pointer-events-none
            "
          />
        )}
      </AnimatePresence>

      {/* CARD */}

      <motion.div

        onClick={() => { setSelected(prev => !prev) }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className={`
          relative
          w-auto
          ${selected ? 'cursor-zoom-out' : 'cursor-zoom-in'}
          z-50
        `}
        // animate={{
        //   scale: isOpen ? 1.15 : 1
        // }}
        whileHover={{
          scale: 1.10,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <div className="h-64 relative">
          <img
            src={game.cover}
            alt={game.title}
            className="
              w-full
              h-full
              object-center
              object-cover
              rounded-xl
            "
          />

          {/* Fade branco */}

          <motion.div
            animate={{
              opacity: isOpen ? 0.5 : 0,
            }}
            className="
            absolute
            inset-0
            bg-black/30
            rounded-xl
          "
          />

          {/* Infos */}

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 5, // na hora que sobe, o tanto que fica para baixo
                  transition: {
                    delay: 0
                  }
                }}
                exit={{
                  opacity: 0,
                  y: 20, // na hora que sai, o tanto que fica para baixo
                  transition: {
                    delay: 0,
                  }
                }}
                className={
                  `
                absolute
                bottom-0
                left-0
                right-0
                p-4
                bg-linear-to-t
                from-black
                via-black/80
                to-transparent
                rounded-b-xl
                
                `
                }
              >
                <p className=" text-white/85">{game.platform}</p>

                <p className=" text-white/85">{game.playedHours} horas</p>

                <p className=" text-white/85">60 horas definidas</p>

                {/* <p>{game.status}</p> */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <h2 className="font-bold text-lg text-white/85 mt-2">
          {`${game.title} (${game.releasedYear})`}
        </h2>
      </motion.div>
    </>
  );
}