# Cyberpunk Tic-Tac-Toe Pro

A visually stunning, high-performance Progressive Web App (PWA) edition of Tic-Tac-Toe, set in a neon-drenched cyberpunk future.

![Cyberpunk Theme](https://img.shields.io/badge/Theme-Cyberpunk-00f2ff?style=for-the-badge)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-ff007f?style=for-the-badge)

## 🚀 Features

- **Cyberpunk Aesthetics:** Neon glows, glitch effects, and a dynamic grid background.
- **Advanced AI:**
  - **EASY_MODE:** For a casual game.
  - **GOD_MODE:** Uses the Minimax algorithm for an unbeatable challenge.
- **PWA Support:** Installable on mobile and desktop devices with offline capabilities via Service Workers.
- **Persistent Data:** Saves your scores, match history, custom username, and theme preferences locally.
- **Interactive Audio:** Retro-synth sound effects for moves, wins, and resets.
- **Customization:**
  - **Theme Toggle:** Switch between high-contrast Dark and Light modes.
  - **Username Editing:** Click your name to personalize your profile.
- **Match Log:** Keep track of your last 5 encounters with the system.

## 🛠️ Technology Stack

- **HTML5/CSS3:** Vanilla implementation with CSS variables and animations.
- **JavaScript (ES6):** Pure JS logic for the game engine and AI.
- **PWA:** `manifest.json` and `sw.js` (Service Worker).
- **Web Audio API:** For real-time synthesized sound effects.

## 🎮 How to Play

1. Clone the repository:
   ```bash
   git clone https://github.com/NishantJLU/Basic-game.git
   ```
2. Open `tictactoe.html` in any modern web browser.
3. (Optional) Install as an app by clicking the "Install" icon in your browser's address bar.

## 📁 Project Structure

- `tictactoe.html`: Main game interface and logic.
- `manifest.json`: Web app manifest for PWA functionality.
- `sw.js`: Service worker for asset caching and offline support.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
