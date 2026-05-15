# 🌌 Cyberpunk Tic-Tac-Toe Pro

[![Theme: Cyberpunk](https://img.shields.io/badge/Theme-Cyberpunk-00f2ff?style=for-the-badge)](https://github.com/NishantJLU/Basic-game)
[![Engine: React 19](https://img.shields.io/badge/Engine-React_19-ff007f?style=for-the-badge)](https://github.com/NishantJLU/Basic-game)
[![Multiplayer: Socket.io](https://img.shields.io/badge/Multiplayer-Socket.io-yellow?style=for-the-badge)](https://github.com/NishantJLU/Basic-game)

A high-performance, visually immersive Tic-Tac-Toe ecosystem set in a neon-drenched cyberpunk future. Experience classic gameplay evolved with advanced AI, massive grids, and nested strategic layers.

---

## 🚀 Key Features

### 🤖 Advanced Neural Link (CPU Opponent)
Battle against a sophisticated AI with three distinct difficulty levels:
- **EASY:** Relaxed pattern matching for casual testing.
- **NORMAL:** A dynamic blend of optimal strategy and unpredictable heuristic moves.
- **GOD:** Driven by the **Minimax Algorithm**. It analyzes every possible future state to ensure it never loses. Can you force a stalemate?

### 🎮 Multiple Simulation Modes
- **3x3_CLASSIC:** The pure, traditional data-link.
- **10x10_MEGA:** An expanded battlefield. Connect 5 nodes in any direction to achieve victory.
- **ULTIMATE:** High-level strategy where every cell in the 3x3 grid is itself a 3x3 board. Win small boards to conquer the master grid.

### 🌐 Global Uplink (Multiplayer)
- **Real-time Sync:** Powered by Socket.io for near-zero latency moves.
- **Room System:** Generate unique access codes to challenge friends across the network.

### 🎨 Visual & Audio Interface
- **Cyberpunk UI:** CRT scanlines, glitch transitions, and interactive neon SVG animations.
- **Real-time Diagnostics:** Watch the system analyze match momentum and player archetypes as you play.
- **Responsive Design:** Fully optimized for mobile deck or desktop terminals.

---

## 🛠️ Technology Stack

- **Frontend:** `React 19`, `TypeScript`, `Vite`, `Redux Toolkit` (State Management), `Recharts` (Analytics).
- **Backend:** `Node.js`, `Express`, `Socket.io`.
- **Logic:** Custom Minimax implementation for optimal AI decision-making.

---

## 🔌 System Setup

### 1. Prerequisite
Ensure you have `Node.js` (v18+) installed on your terminal.

### 2. Initialize Backend (Server)
```bash
cd server
npm install
npm run dev
```
*The server will initialize on `http://localhost:3001`.*

### 3. Initialize Frontend (Client)
```bash
# In a new terminal tab
cd client
npm install
npm run dev
```
*The uplink will be available at `http://localhost:5173`.*

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

---
*Created for the neon-drenched future of gaming.*
