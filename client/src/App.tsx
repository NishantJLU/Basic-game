import React from 'react';
import Scoreboard from './components/Scoreboard';
import Board from './components/Board';
import UltimateBoard from './components/UltimateBoard';
import Multiplayer from './components/Multiplayer';
import Diagnostics from './components/Diagnostics';
import ResultOverlay from './components/ResultOverlay';
import { useGameLogic } from './hooks/useGameLogic';
import { useUltimateLogic } from './hooks/useUltimateLogic';
import ModeSelector from './components/ModeSelector';
import StatsDashboard from './components/StatsDashboard';
import { useAppSelector } from './store/hooks';
import './Cyberpunk.css';
import './App.css';

const GameContainer: React.FC = () => {
    const appData = useAppSelector(state => state.app);
    const gameMode = useAppSelector(state => state.game.gameMode);
    
    const { state: classicState, handleMove: handleClassicMove, resetGame: resetClassic } = useGameLogic();
    const { state: ultimateState, handleMove: handleUltimateMove, resetGame: resetUltimate } = useUltimateLogic();

    const isUltimate = gameMode === 'ultimate';
    const state = isUltimate ? ultimateState : classicState;

    const handleReset = () => {
        if (isUltimate) resetUltimate();
        else resetClassic(true);
    };

    return (
        <div className={`app-container ${appData.theme}-mode ${state.winner ? 'aberration' : ''}`}>
            <div className="bg-grid" />
            
            <Scoreboard />
            <Multiplayer />
            <ModeSelector />

            <div id="status">
                {state.winner 
                    ? (state.winner === 'draw' ? 'STALEMATE_SYNC' : `WIN_DETECTED: ${state.winner}`) 
                    : `WAITING_FOR_${state.currentPlayer === 'X' ? appData.userName : (appData.isPvP ? 'USER_O' : 'SYSTEM')}`
                }
            </div>

            <div className="board-wrapper">
                {isUltimate ? (
                    <UltimateBoard 
                        boards={ultimateState.boards}
                        masterBoard={ultimateState.masterBoard}
                        activeBoard={ultimateState.activeBoard}
                        onMove={handleUltimateMove}
                        disabled={!ultimateState.gameActive}
                    />
                ) : (
                    <Board 
                        board={classicState.board} 
                        onCellClick={handleClassicMove} 
                        size={gameMode === '3x3' ? 3 : 10}
                        winLine={classicState.winLine}
                        disabled={!classicState.gameActive}
                    />
                )}
            </div>

            {!isUltimate && (state as any).moveHistory?.length > 0 && (
                <Diagnostics gameState={classicState} />
            )}

            <div className="controls">
                <button onClick={handleReset}>REBOOT</button>
                <button style={{ opacity: 0.6 }}>WIPE</button>
            </div>

            <ResultOverlay 
                winner={state.winner} 
                onClose={handleReset}
            />

            <StatsDashboard />
        </div>
    );
};

function App() {
    return (
        <GameContainer />
    );
}

export default App;
