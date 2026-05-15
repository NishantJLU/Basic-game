import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface GlobalStats {
    totalGames: number;
    activePlayers: number;
    topPlayer: string;
    winRate: string;
    systemStatus: string;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: (builder) => ({
        getStats: builder.query<GlobalStats, void>({
            query: () => '/api/stats',
        }),
    }),
});

export const { useGetStatsQuery } = apiSlice;
