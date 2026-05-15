import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

interface RoomData {
    players: string[];
    gameState: any;
    mode: string;
}

const rooms = new Map<string, RoomData>();

app.get('/api/stats', (req, res) => {
    res.json({
        totalGames: 1337,
        activePlayers: 42,
        topPlayer: "NEO_X",
        winRate: "68.5%",
        systemStatus: "OPTIMAL"
    });
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', ({ roomId, userName, mode }) => {
        let room = rooms.get(roomId);
        
        if (!room) {
            room = { players: [socket.id], gameState: null, mode };
            rooms.set(roomId, room);
        } else if (room.players.length < 2) {
            room.players.push(socket.id);
        } else {
            socket.emit('error', 'Room is full');
            return;
        }

        socket.join(roomId);
        console.log(`User ${socket.id} (${userName}) joined room ${roomId}`);
        
        const playerRole = room.players.indexOf(socket.id) === 0 ? 'X' : 'O';
        socket.emit('init-player', { role: playerRole });

        if (room.players.length === 2) {
            io.to(roomId).emit('game-start', { mode: room.mode });
        }
    });

    socket.on('make-move', ({ roomId, index, player, boardIndex }) => {
        socket.to(roomId).emit('receive-move', { index, player, boardIndex });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // Handle player leaving room logic
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
