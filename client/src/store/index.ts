import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import gameReducer from './gameSlice';
import ultimateReducer from './ultimateSlice';
import { apiSlice } from './apiSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        game: gameReducer,
        ultimate: ultimateReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
