import React from 'react';
import { useGetStatsQuery } from '../store/apiSlice';

const StatsDashboard: React.FC = () => {
    const { data, isLoading, error } = useGetStatsQuery();

    if (isLoading) return <div className="stats-dashboard loading">CONNECTING_TO_UPLINK...</div>;
    if (error) return <div className="stats-dashboard error">UPLINK_OFFLINE</div>;
    if (!data) return null;

    return (
        <div className="stats-dashboard">
            <div className="stats-title">GLOBAL_NETWORK_STATS</div>
            <div className="stats-grid">
                <div className="stat-item">
                    <span className="stat-label">TOTAL_GAMES:</span>
                    <span className="stat-value">{data.totalGames}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">ACTIVE_NODES:</span>
                    <span className="stat-value">{data.activePlayers}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">TOP_OPERATIVE:</span>
                    <span className="stat-value neon-text">{data.topPlayer}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">NETWORK_INTEGRITY:</span>
                    <span className="stat-value">{data.systemStatus}</span>
                </div>
            </div>
        </div>
    );
};

export default StatsDashboard;
