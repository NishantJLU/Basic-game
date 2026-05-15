import React from 'react';
import Cell from './Cell';
import type { Player } from '../types/game';

interface BoardProps {
    board: Player[];
    onCellClick: (index: number) => void;
    size?: number; // 3 for 3x3, 10 for 10x10
    winLine: number[] | null;
    disabled?: boolean;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, size = 3, winLine, disabled }) => {
    return (
        <div 
            className="board" 
            style={{ 
                gridTemplateColumns: `repeat(${size}, 1fr)`,
                gridTemplateRows: `repeat(${size}, 1fr)`,
                maxWidth: size === 3 ? '380px' : '600px'
            }}
        >
            {board.map((cell, i) => (
                <Cell 
                    key={i}
                    index={i}
                    value={cell}
                    onClick={() => onCellClick(i)}
                    isWinning={winLine?.includes(i)}
                    disabled={disabled}
                />
            ))}
        </div>
    );
};

export default Board;
