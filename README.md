# Cyberpunk Tic-Tac-Toe Pro: Modern Edition

A visually stunning, high-stakes Tic-Tac-Toe battleground built with React, TypeScript, and Node.js, set in a neon-drenched cyberpunk future.

![Cyberpunk Theme](https://img.shields.io/badge/Theme-Cyberpunk-00f2ff?style=for-the-badge)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-ff007f?style=for-the-badge)

## 🚀 Features

- **Advanced CPU Opponent:**
  - **EASY:** Casual play.
  - **NORMAL:** A mix of smart and random moves.
  - **GOD:** Unbeatable AI using the Minimax algorithm.
- **Game Modes:**
  - `3x3_CLASSIC`: The traditional grid.
  - `10x10_MEGA`: First to 5 in a row wins.
  - `ULTIMATE`: Nested 3x3 grids for high-level strategy.
- **Online Multiplayer:** Establish uplinks via Room Codes.
- **System Diagnostics:** Post-match momentum analysis and archetype detection.
- **Cyberpunk UI:** CRT effects, SVG neon animations, and high-performance interactive feedback.
- **Persistent Data:** Saves your scores, match history, and theme preferences.

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Redux Toolkit, Recharts.
- **Backend:** Node.js, Express, Socket.io.
- **Styling:** Vanilla CSS with neon glow and glitch effects.

## 🎮 How to Run

### 1. Install Dependencies
```bash
# In the root directory
npm install
cd client && npm install
cd ../server && npm install
```

### 2. Start the Server
```bash
cd server
npm run dev
```

### 3. Start the Client
```bash
cd client
npm run dev
```

The game will be available at `http://localhost:5173`.
The server runs on `http://localhost:3001`.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
