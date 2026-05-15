import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { makeUltimateMove, resetUltimate as resetUltimateAction } from '../store/ultimateSlice';

export const useUltimateLogic = () => {
    const state = useAppSelector(state => state.ultimate);
    const dispatch = useAppDispatch();

    const handleMove = useCallback((boardIndex: number, cellIndex: number) => {
        dispatch(makeUltimateMove({ boardIndex, cellIndex }));
    }, [dispatch]);

    const resetGame = useCallback(() => {
        dispatch(resetUltimateAction());
    }, [dispatch]);

    return { state, handleMove, resetGame };
};
