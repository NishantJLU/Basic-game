import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket';
import { useAppSelector } from '../store/hooks';

const Multiplayer: React.FC = () => {
    const appData = useAppSelector(state => state.app);
    const gameMode = useAppSelector(state => state.game.gameMode);
    const [roomId, setRoomId] = useState('');
    const [joined, setJoined] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    const handleJoin = () => {
        if (!roomId) return;
        socket.connect();
        socket.emit('join-room', { roomId, userName: appData.userName, mode: gameMode });
    };

    useEffect(() => {
        socket.on('init-player', ({ role }) => {
            setRole(role);
            setJoined(true);
        });

        socket.on('error', (msg) => {
            alert(msg);
            socket.disconnect();
        });

        return () => {
            socket.off('init-player');
            socket.off('error');
        };
    }, []);

    return (
        <div className="multiplayer-container">
            {!joined ? (
                <div className="join-controls">
                    <input 
                        type="text" 
                        placeholder="ROOM_CODE" 
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                        className="cyber-input"
                    />
                    <button onClick={handleJoin}>ESTABLISH_UPLINK</button>
                </div>
            ) : (
                <div className="status-msg">
                    UPLINK_ESTABLISHED // NODE_{role}
                </div>
            )}
        </div>
    );
};

export default Multiplayer;
