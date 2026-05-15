export type Player = 'X' | 'O' | null;
export type GameMode = '3x3' | '10x10' | 'ultimate';
export type Difficulty = 'easy' | 'normal' | 'god';

export interface GameState {
    board: Player[];
    currentPlayer: Player;
    winner: Player | 'draw' | null;
    winLine: number[] | null;
    gameActive: boolean;
    moveHistory: { player: Player; index: number; time: number }[];
}

export interface UltimateGameState {
    boards: Player[][];
    masterBoard: Player[];
    activeBoard: number | null;
    currentPlayer: Player;
    winner: Player | 'draw' | null;
    gameActive: boolean;
}

export interface AppData {
    scores: { X: number; O: number; draws: number };
    userName: string;
    history: string[];
    theme: 'dark' | 'light';
    difficulty: Difficulty;
    isPvP: boolean;
    bestOf: number;
    currentMatchWins: { X: number; O: number };
}
