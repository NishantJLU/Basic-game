import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setGameMode, togglePvP, setDifficulty } from '../store/gameSlice';
import type { GameMode, Difficulty } from '../types/game';

const ModeSelector: React.FC = () => {
    const { gameMode, isPvP, difficulty } = useAppSelector(state => state.game);
    const dispatch = useAppDispatch();

    const modes: { id: GameMode; label: string }[] = [
        { id: '3x3', label: '3x3_CLASSIC' },
        { id: '10x10', label: '10x10_MEGA' },
        { id: 'ultimate', label: 'ULTIMATE' }
    ];

    const difficulties: { id: Difficulty; label: string }[] = [
        { id: 'easy', label: 'EASY' },
        { id: 'normal', label: 'NORMAL' },
        { id: 'god', label: 'GOD' }
    ];

    return (
        <div className="settings-container">
            <div className="setting-group">
                <span className="setting-label">GRID:</span>
                <div style={{ display: 'flex', gap: '5px' }}>
                    {modes.map(mode => (
                        <button
                            key={mode.id}
                            className={`toggle-btn ${gameMode === mode.id ? 'active' : ''}`}
                            onClick={() => dispatch(setGameMode(mode.id))}
                        >
                            {mode.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="setting-group">
                <span className="setting-label">OPPONENT:</span>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <button
                        className={`toggle-btn ${isPvP ? 'active' : ''}`}
                        onClick={() => !isPvP && dispatch(togglePvP())}
                    >
                        PLAYER
                    </button>
                    <button
                        className={`toggle-btn ${!isPvP ? 'active' : ''}`}
                        onClick={() => isPvP && dispatch(togglePvP())}
                        disabled={gameMode === 'ultimate'}
                        title={gameMode === 'ultimate' ? 'CPU not available for Ultimate' : ''}
                    >
                        CPU
                    </button>
                </div>
            </div>

            {!isPvP && gameMode !== 'ultimate' && (
                <div className="setting-group">
                    <span className="setting-label">AI_LEVEL:</span>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        {difficulties.map(diff => (
                            <button
                                key={diff.id}
                                className={`toggle-btn ${difficulty === diff.id ? 'active' : ''}`}
                                onClick={() => dispatch(setDifficulty(diff.id))}
                            >
                                {diff.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModeSelector;
