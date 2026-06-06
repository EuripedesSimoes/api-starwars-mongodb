// GameCard.tsx

import { useState } from "react";
import { type Game } from "../helpers/GameCard.types";
import type { CardSize } from "../App";
import SteamHoverCard from "./SteamHoverCard";
import SteamSliderCard from "./SteamSliderCard";

interface Props {
  game: Game;
  tamanho: CardSize
}

export default function GameCard({ game, tamanho }: Props) {

  const containerSizes = {
    small: "h-[180px]",
    medium: "h-[360px]",
    large: "h-[480px]",
    steam: "h-[300px]",
    slider: "h-[200px]",
  };

  const imageSizes = {
    small: "hidden",
    medium: "h-[40%]",
    large: "h-[60%]",
    steam: "h-[70%]",
    slider: "h-[80%]",
  };

  return (
    <>
      {tamanho === "steam" ? (
        <SteamHoverCard game={game} />)
        : tamanho === "slider" ? (
          <SteamSliderCard game={game} />)
          :
          (
            <div
              className={`
        w-full
        bg-zinc-800
        rounded-2xl
        overflow-hidden
        border border-zinc-700
        shadow-xl
        transition-all duration-300
        flex flex-col
        ${containerSizes[tamanho]}
      `}
            >


              {/* IMAGEM */}
              {tamanho !== "small" && (
                <div
                  className={`
            w-full
            flex
            justify-center
            items-center
            overflow-hidden
            bg-black
            ${imageSizes[tamanho]}
          `}
                >
                  <img
                    src={game.cover}
                    alt={game.title}
                    className=" h-full w-full object-cover object-center 
                  cursor-zoom-in
                  while-hover:scale-115
                  hover:scale-120
                  transition-all duration-200
                  hover:brightness-95 hover:contrast-115 hover:blur-[1.5px]
            "
                  />
                </div>
              )}



              {/* INFORMAÇÕES */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <Input label="Nome" value={`${game.title} (${game.releasedYear})`} />

                <Input
                  label="Expectativa para zerar"
                  value={`${game.estimatedHours} horas`}
                />

                <Input
                  label="Horas jogadas"
                  value={`${game.playedHours} horas`}
                />

                <Input label="Plataforma" value={game.platform} />

                <Input label="Iniciado em" value={game.startedAt} />

                <Input
                  label="Finalizado em"
                  value={game.finishedAt || "Ainda jogando"}
                />

                {/* <Input label="Estado" value={game.status} /> */}

                {game.description && (
                  <div>
                    <p className="text-sm text-zinc-300 mb-1">Descrição</p>

                    <textarea
                      value={game.description}
                      readOnly
                      className=" w-full bg-zinc-800 rounded-lg p-3 text-sm resize-none text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
    </>
  );
}

interface InputProps {
  label: string;
  value: string;
}

// input diferenciado para o GameCard, apenas leitura, estilizado e com label
function Input({ label, value }: InputProps) {
  return (
    <div>
      <p className="text-sm text-zinc-300 mb-1">
        {label}
      </p>

      <input
        value={value}
        readOnly
        className="
          w-full
          bg-zinc-500 text-white
          rounded-lg
          px-3 py-2
          outline-none
        "
      />
    </div>
  );
}