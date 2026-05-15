import React, { useState, useEffect } from 'react';

interface ResultOverlayProps {
    winner: string | null;
    onClose: () => void;
}

const ResultOverlay: React.FC<ResultOverlayProps> = ({ winner, onClose }) => {
    const [terminalText, setTerminalBg] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const chars = "0123456789ABCDEF!@#$%^&*()_+";
            let out = "";
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 40; j++) out += chars[Math.floor(Math.random() * chars.length)];
                out += "\n";
            }
            setTerminalBg(out);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    if (!winner) return null;

    const isVictory = winner === 'X';
    const msg = winner === 'draw' ? 'STALEMATE' : (isVictory ? 'VICTORY' : 'DEFEAT');
    const sub = winner === 'draw' ? 'PARITY_REACHED' : (isVictory ? 'SYSTEM_INTEGRITY_COMPROMISED' : 'SECURITY_REESTABLISHED');

    const asciiArt = isVictory ? 
        `   ____   __ ____ ______ ____   ____  __  __\n  / __ \\ / // __//_  __// __ \\ / __ \\/ / / /\n / /_/ // /_\\ \\   / /  / /_/ // /_/ / /_/ / \n \\____/ \\____/  /_/   \\____/ \\____/\\____/  ` :
        `    ____  ______ ____  ______ ___  ______\n   / __ \\/ ____// __ \\/ ____//   |/_  __/\n  / / / / __/  / /_/ / __/  / /| | / /   \n / /_/ / /___ / ____/ /___ / ___ |/ /    \n/_____/_____//_/   /_____//_/  |_/_/     `;

    return (
        <div id="result-overlay" style={{ display: 'flex' }}>
            <div className="terminal-bg">{terminalText}</div>
            <div className="ascii-art">{asciiArt}</div>
            <div className={`result-msg ${isVictory ? 'won' : 'lost'}`}>{msg}</div>
            <div className="result-sub">{sub}</div>
            <button id="overlay-close-btn" onClick={onClose}>REINITIALIZE_GRID</button>
        </div>
    );
};

export default ResultOverlay;
