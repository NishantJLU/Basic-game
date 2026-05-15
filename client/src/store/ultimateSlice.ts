import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Player, UltimateGameState } from '../types/game';

const check3x3Winner = (board: Player[]) => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return board.includes(null) ? null : 'draw' as const;
};

const initialState: UltimateGameState = {
    boards: Array(9).fill(null).map(() => Array(9).fill(null)),
    masterBoard: Array(9).fill(null),
    activeBoard: null,
    currentPlayer: 'X',
    winner: null,
    gameActive: true
};

const ultimateSlice = createSlice({
    name: 'ultimate',
    initialState,
    reducers: {
        makeUltimateMove: (state, action: PayloadAction<{ boardIndex: number, cellIndex: number }>) => {
            const { boardIndex, cellIndex } = action.payload;
            if (!state.gameActive) return;
            if (state.activeBoard !== null && state.activeBoard !== boardIndex) return;
            if (state.boards[boardIndex][cellIndex] || state.masterBoard[boardIndex]) return;

            state.boards[boardIndex][cellIndex] = state.currentPlayer;

            const subWinner = check3x3Winner(state.boards[boardIndex]);
            if (subWinner && subWinner !== 'draw') {
                state.masterBoard[boardIndex] = subWinner;
            }

            const masterWinner = check3x3Winner(state.masterBoard);
            
            let nextActiveBoard: number | null = cellIndex;
            if (state.masterBoard[nextActiveBoard] || !state.boards[nextActiveBoard].includes(null)) {
                nextActiveBoard = null;
            }

            state.activeBoard = nextActiveBoard;
            state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
            state.winner = masterWinner;
            state.gameActive = !masterWinner;
        },
        resetUltimate: (state) => {
            state.boards = Array(9).fill(null).map(() => Array(9).fill(null));
            state.masterBoard = Array(9).fill(null);
            state.activeBoard = null;
            state.currentPlayer = 'X';
            state.winner = null;
            state.gameActive = true;
        }
    }
});

export const { makeUltimateMove, resetUltimate } = ultimateSlice.actions;
export default ultimateSlice.reducer;
