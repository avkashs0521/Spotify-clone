# 🎵 Spotify Clone

A high-fidelity, fully responsive web application that replicates the core UI and functionalities of Spotify. Built from the ground up with **React** and **Vite**, this project features a custom-built music player, dynamic routing, and a modern design system.

## ✨ Features

- **Custom Music Player**: Fully functional audio playback controls using a centralized `PlayerContext`. Includes play, pause, next, previous, and volume controls.
- **Dynamic Views**: Seamless navigation between Home, Search, Your Library, Playlist details, Album details, and Artist pages.
- **Curated Playlists**: Features custom data structures including pinned top playlists for **Atif Aslam**, **Arijit Singh**, and **KK**, alongside standard categories like Top Hits and RapCaviar.
- **Fully Responsive**: 
  - **Desktop**: Features a rich, fixed sidebar navigation and detailed grid layouts.
  - **Mobile**: Seamlessly transitions to a highly accessible mobile bottom navigation bar (`MobileNav`) for on-the-go browsing.
- **Smart UI Enhancements**: Dynamic greetings ("Good morning", "Good afternoon") based on the user's local time, and glassmorphism hover effects.

## 🛠️ Tech Stack

- **Frontend Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** Vanilla CSS (Modern CSS variables, Flexbox, CSS Grid)
- **State Management:** React Context API (`PlayerContext`)

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/avkashs0521/Spotify-clone.git
   cd Spotify-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser to view the app!

## 🌐 Deployment

This application is configured and ready to be deployed instantly on modern hosting platforms.

**Deploying to Vercel (Recommended):**
1. Import your repository into [Vercel](https://vercel.com/).
2. Vercel will automatically detect the **Vite** preset.
3. Click **Deploy**. The application is configured to serve dynamically from the root directory.

## 📁 Project Structure

- `src/Components/` - Reusable UI elements (Sidebar, MusicCard, Player, MobileNav) and main page views (HomePage, LibraryPage, SearchPage, etc.).
- `src/context/` - Global state management for audio playback (`PlayerContext.jsx`).
- `src/data/` - Hardcoded music data, playlists, and artists acting as a mock database (`spotify.js`).
- `src/index.css` - Global styling, custom scrollbars, and responsive media queries.

---
*Built for educational and portfolio purposes.*
