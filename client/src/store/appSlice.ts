import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppData, Difficulty } from '../types/game';

const defaultAppData: AppData = {
    scores: { X: 0, O: 0, draws: 0 },
    userName: "USER_X",
    history: [],
    theme: "dark",
    difficulty: "normal",
    isPvP: false,
    bestOf: 3,
    currentMatchWins: { X: 0, O: 0 },
};

const savedData = localStorage.getItem('cyberpunk_ttt_v4');
const initialState: AppData = savedData ? JSON.parse(savedData) : defaultAppData;

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppData: (state, action: PayloadAction<Partial<AppData>>) => {
            const newState = { ...state, ...action.payload };
            localStorage.setItem('cyberpunk_ttt_v4', JSON.stringify(newState));
            return newState;
        },
        updateScores: (state, action: PayloadAction<{ X?: number, O?: number, draws?: number }>) => {
            state.scores = { ...state.scores, ...action.payload };
            localStorage.setItem('cyberpunk_ttt_v4', JSON.stringify(state));
        },
        setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
            state.theme = action.payload;
            localStorage.setItem('cyberpunk_ttt_v4', JSON.stringify(state));
        },
        setDifficulty: (state, action: PayloadAction<Difficulty>) => {
            state.difficulty = action.payload;
            localStorage.setItem('cyberpunk_ttt_v4', JSON.stringify(state));
        }
    }
});

export const { setAppData, updateScores, setTheme, setDifficulty } = appSlice.actions;
export default appSlice.reducer;
