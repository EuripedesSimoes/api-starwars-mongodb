// GameCard.types.ts

export type GameStatus =
  | "Jogando"
  | "Finalizado"
  | "Pausado"
  | "Dropado";

export interface Game {
  id: number;
  title: string;
  cover: string;
  estimatedHours: number;
  playedHours: number;
  platform: string;
  startedAt: string;
  finishedAt?: string;
  releasedYear: number;
  // status: GameStatus;
  description?: string;
}