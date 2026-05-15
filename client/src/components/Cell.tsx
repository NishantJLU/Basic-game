import React from 'react';
import type { Player } from '../types/game';

interface CellProps {
    value: Player;
    onClick: () => void;
    index: number;
    disabled?: boolean;
    isWinning?: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, index, disabled, isWinning }) => {
    const color = value === 'X' ? 'var(--neon-x)' : 'var(--neon-o)';

    return (
        <button
            className={`cell ${value ? 'occupied' : ''} ${value?.toLowerCase() || ''} ${isWinning ? 'winning' : ''}`}
            onClick={onClick}
            disabled={disabled || !!value}
            aria-label={value ? `Cell ${index + 1} occupied by ${value}` : `Empty cell ${index + 1}`}
        >
            {value && (
                <svg className="neon-svg flicker" viewBox="0 0 100 100" style={{ color }}>
                    {value === 'X' ? (
                        <path className="draw-path" d="M20,20 L80,80 M80,20 L20,80" />
                    ) : (
                        <circle className="draw-path" cx="50" cy="50" r="35" />
                    )}
                </svg>
            )}
        </button>
    );
};

export default Cell;
