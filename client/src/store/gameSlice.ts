import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GameState, GameMode, Player, Difficulty } from '../types/game';

interface GameSliceState extends GameState {
    gameMode: GameMode;
    isPvP: boolean;
    difficulty: Difficulty;
}

const initialState: GameSliceState = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    winLine: null,
    gameActive: true,
    moveHistory: [],
    gameMode: '3x3',
    isPvP: true,
    difficulty: 'normal'
};

export const checkWinner3x3 = (board: Player[]) => {
    const conditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let line of conditions) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) return { player: board[a], line };
    }
    return board.includes(null) ? null : { player: 'draw' as const, line: null };
};

export const checkWinner10x10 = (board: Player[]) => {
    const size = 10;
    const winLength = 5;

    for (let i = 0; i < size * size; i++) {
        const player = board[i];
        if (!player) continue;

        const row = Math.floor(i / size);
        const col = i % size;

        if (col <= size - winLength) {
            let win = true;
            const line = [];
            for (let k = 0; k < winLength; k++) {
                if (board[i + k] !== player) { win = false; break; }
                line.push(i + k);
            }
            if (win) return { player, line };
        }

        if (row <= size - winLength) {
            let win = true;
            const line = [];
            for (let k = 0; k < winLength; k++) {
                if (board[i + k * size] !== player) { win = false; break; }
                line.push(i + k * size);
            }
            if (win) return { player, line };
        }

        if (row <= size - winLength && col <= size - winLength) {
            let win = true;
            const line = [];
            for (let k = 0; k < winLength; k++) {
                if (board[i + k * (size + 1)] !== player) { win = false; break; }
                line.push(i + k * (size + 1));
            }
            if (win) return { player, line };
        }

        if (row <= size - winLength && col >= winLength - 1) {
            let win = true;
            const line = [];
            for (let k = 0; k < winLength; k++) {
                if (board[i + k * (size - 1)] !== player) { win = false; break; }
                line.push(i + k * (size - 1));
            }
            if (win) return { player, line };
        }
    }
    return board.includes(null) ? null : { player: 'draw' as const, line: null };
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameMode: (state, action: PayloadAction<GameMode>) => {
            state.gameMode = action.payload;
            state.board = Array(action.payload === '3x3' ? 9 : (action.payload === '10x10' ? 100 : 9)).fill(null);
            state.currentPlayer = 'X';
            state.winner = null;
            state.winLine = null;
            state.gameActive = true;
            state.moveHistory = [];
        },
        togglePvP: (state) => {
            state.isPvP = !state.isPvP;
            state.board = Array(state.gameMode === '3x3' ? 9 : (state.gameMode === '10x10' ? 100 : 9)).fill(null);
            state.currentPlayer = 'X';
            state.winner = null;
            state.winLine = null;
            state.gameActive = true;
            state.moveHistory = [];
        },
        setDifficulty: (state, action: PayloadAction<Difficulty>) => {
            state.difficulty = action.payload;
            state.board = Array(state.gameMode === '3x3' ? 9 : (state.gameMode === '10x10' ? 100 : 9)).fill(null);
            state.currentPlayer = 'X';
            state.winner = null;
            state.winLine = null;
            state.gameActive = true;
            state.moveHistory = [];
        },
        makeMove: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            if (state.board[index] || !state.gameActive) return;

            state.board[index] = state.currentPlayer;
            state.moveHistory.push({ 
                player: state.currentPlayer, 
                index, 
                time: Date.now() 
            });

            const result = state.gameMode === '3x3' ? checkWinner3x3(state.board) : checkWinner10x10(state.board);
            
            if (result) {
                state.gameActive = false;
                state.winner = result.player;
                state.winLine = result.line;
            } else {
                state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
            }
        },
        resetGame: (state) => {
            state.board = Array(state.gameMode === '3x3' ? 9 : (state.gameMode === '10x10' ? 100 : 9)).fill(null);
            state.currentPlayer = 'X';
            state.winner = null;
            state.winLine = null;
            state.gameActive = true;
            state.moveHistory = [];
        }
    }
});

export const { setGameMode, makeMove, resetGame, togglePvP, setDifficulty } = gameSlice.actions;
export default gameSlice.reducer;
