import React from 'react';
import Board from './Board';
import type { Player } from '../types/game';

interface UltimateBoardProps {
    boards: Player[][];
    masterBoard: Player[];
    activeBoard: number | null;
    onMove: (boardIndex: number, cellIndex: number) => void;
    disabled?: boolean;
}

const UltimateBoard: React.FC<UltimateBoardProps> = ({ 
    boards, 
    masterBoard, 
    activeBoard, 
    onMove,
    disabled 
}) => {
    return (
        <div className="ultimate-board">
            {boards.map((board, i) => (
                <div 
                    key={i} 
                    className={`small-board-container ${activeBoard === i ? 'active' : ''} ${masterBoard[i] ? 'won' : ''}`}
                >
                    {masterBoard[i] ? (
                        <div className={`master-symbol ${masterBoard[i]?.toLowerCase()}`}>
                            {masterBoard[i]}
                        </div>
                    ) : (
                        <Board 
                            board={board}
                            onCellClick={(cellIndex) => onMove(i, cellIndex)}
                            size={3}
                            winLine={null}
                            disabled={disabled || (activeBoard !== null && activeBoard !== i)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default UltimateBoard;
