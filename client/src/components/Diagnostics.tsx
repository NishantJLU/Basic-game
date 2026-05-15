import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { GameState } from '../types/game';

interface DiagnosticsProps {
    gameState: GameState;
}

const Diagnostics: React.FC<DiagnosticsProps> = ({ gameState }) => {
    const data = gameState.moveHistory.reduce((acc: any[], _move, i) => {
        const xCount = gameState.moveHistory.slice(0, i + 1).filter(m => m.player === 'X').length;
        const oCount = gameState.moveHistory.slice(0, i + 1).filter(m => m.player === 'O').length;
        
        acc.push({
            name: `Move ${i + 1}`,
            momentum: xCount - oCount
        });
        return acc;
    }, []);

    return (
        <div className="diagnostics-container">
            <div className="log-title">SYSTEM_DIAGNOSTICS</div>
            <div style={{ width: '100%', height: 200, marginTop: '1rem' }}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 242, 255, 0.1)" />
                        <XAxis dataKey="name" hide />
                        <YAxis stroke="#64748b" fontSize={10} />
                        <Tooltip 
                            contentStyle={{ background: '#060a17', border: '1px solid #00f2ff', fontSize: '10px' }}
                            itemStyle={{ color: '#00f2ff' }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="momentum" 
                            stroke="var(--neon-x)" 
                            strokeWidth={2} 
                            dot={{ fill: 'var(--neon-x)', r: 4 }}
                            activeDot={{ r: 6, stroke: '#fff' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="archetype">
                ARCHETYPE_DETECTION: {data.length > 5 ? (data[data.length-1].momentum > 0 ? "THE_AGGRESSOR" : "THE_CALCULATOR") : "DATA_INSUFFICIENT"}
            </div>
        </div>
    );
};

export default Diagnostics;
