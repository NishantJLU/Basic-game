import React from 'react';
import { useAppSelector } from '../store/hooks';

const Scoreboard: React.FC = () => {
    const appData = useAppSelector(state => state.app);

    return (
        <div className="scoreboard">
            <div className="score-item" id="player-x-item">
                <div className="score-label">{appData.userName}</div>
                <div id="score-x" className="score-value">{appData.scores.X}</div>
                <div className="round-indicator">
                    {Array.from({ length: Math.ceil(appData.bestOf / 2) }).map((_, i) => (
                        <div key={i} className={`round-dot ${i < appData.currentMatchWins.X ? 'won-x' : ''}`} />
                    ))}
                </div>
            </div>
            <div className="score-item">
                <div className="score-label">{appData.isPvP ? 'USER_O' : 'SYSTEM_O'}</div>
                <div id="score-o" className="score-value">{appData.scores.O}</div>
                <div className="round-indicator">
                    {Array.from({ length: Math.ceil(appData.bestOf / 2) }).map((_, i) => (
                        <div key={i} className={`round-dot ${i < appData.currentMatchWins.O ? 'won-o' : ''}`} />
                    ))}
                </div>
            </div>
            <div className="score-item">
                <div className="score-label">DRAWS</div>
                <div id="score-draws" className="score-value" style={{ color: '#64748b' }}>{appData.scores.draws}</div>
            </div>
        </div>
    );
};

export default Scoreboard;
