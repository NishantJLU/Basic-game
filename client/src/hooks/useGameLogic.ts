import { useCallback, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { makeMove, resetGame as resetGameAction, checkWinner3x3, checkWinner10x10 } from '../store/gameSlice';
import { updateScores } from '../store/appSlice';
import type { Player } from '../types/game';

export const useGameLogic = () => {
    const state = useAppSelector(state => state.game);
    const dispatch = useAppDispatch();

    const getBestMove = useCallback((board: Player[], mode: string, difficulty: string): number => {
        const availableMoves = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
        
        if (availableMoves.length === 0) return -1;

        if (difficulty === 'easy') {
            return availableMoves[Math.floor(Math.random() * availableMoves.length)];
        }

        if (mode === '3x3') {
            // Minimax for 3x3
            const minimax = (tempBoard: Player[], depth: number, isMaximizing: boolean): number => {
                const result = checkWinner3x3(tempBoard);
                if (result?.player === 'O') return 10 - depth;
                if (result?.player === 'X') return depth - 10;
                if (result?.player === 'draw') return 0;

                if (isMaximizing) {
                    let bestScore = -Infinity;
                    for (let i = 0; i < 9; i++) {
                        if (tempBoard[i] === null) {
                            tempBoard[i] = 'O';
                            let score = minimax(tempBoard, depth + 1, false);
                            tempBoard[i] = null;
                            bestScore = Math.max(score, bestScore);
                        }
                    }
                    return bestScore;
                } else {
                    let bestScore = Infinity;
                    for (let i = 0; i < 9; i++) {
                        if (tempBoard[i] === null) {
                            tempBoard[i] = 'X';
                            let score = minimax(tempBoard, depth + 1, true);
                            tempBoard[i] = null;
                            bestScore = Math.min(score, bestScore);
                        }
                    }
                    return bestScore;
                }
            };

            if (difficulty === 'normal' && Math.random() < 0.3) {
                return availableMoves[Math.floor(Math.random() * availableMoves.length)];
            }

            let bestScore = -Infinity;
            let move = -1;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = 'O';
                    let score = minimax([...board], 0, false);
                    board[i] = null;
                    if (score > bestScore) {
                        bestScore = score;
                        move = i;
                    }
                }
            }
            return move;
        } else {
            // Simplified AI for 10x10 (Hard is difficult to minimax 10x10 deep)
            // Just block wins or take immediate wins
            for (let move of availableMoves) {
                const tempBoard = [...board];
                tempBoard[move] = 'O';
                if (checkWinner10x10(tempBoard)?.player === 'O') return move;
            }
            for (let move of availableMoves) {
                const tempBoard = [...board];
                tempBoard[move] = 'X';
                if (checkWinner10x10(tempBoard)?.player === 'X') return move;
            }
            return availableMoves[Math.floor(Math.random() * availableMoves.length)];
        }
    }, []);

    useEffect(() => {
        if (!state.isPvP && state.gameActive && state.currentPlayer === 'O' && state.gameMode !== 'ultimate') {
            const timer = setTimeout(() => {
                const cpuMove = getBestMove([...state.board], state.gameMode, state.difficulty);
                if (cpuMove !== -1) {
                    dispatch(makeMove(cpuMove));
                }
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [state.isPvP, state.gameActive, state.currentPlayer, state.board, state.gameMode, state.difficulty, dispatch, getBestMove]);

    const handleMove = useCallback((index: number) => {
        // Only prevent user from clicking during CPU turn
        if (!state.isPvP && state.currentPlayer === 'O') return;
        dispatch(makeMove(index));
    }, [dispatch, state.isPvP, state.currentPlayer]);

    const resetGame = useCallback((fullReset = false) => {
        dispatch(resetGameAction());
        if (fullReset) {
            dispatch(updateScores({})); 
        }
    }, [dispatch]);

    return { state, handleMove, resetGame };
};
