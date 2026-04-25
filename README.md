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

---

## 🔄 Application Pipeline & Architecture

The application is structured as a Single Page Application (SPA) focusing on high performance, component modularity, and uninterrupted audio playback.

1. **Global State Management (`PlayerContext`)**: 
   The beating heart of the application is the Context API. `PlayerContext` acts as the central hub that manages:
   - The `currentSong` being played.
   - The `isPlaying` boolean state.
   - The current playlist/queue of songs (`songQueue`).
   - Global volume and track progression.
   
2. **Data Flow (`spotify.js`)**: 
   All content (songs, playlists, artists, albums, categories) is decoupled from the UI and lives inside a mock database (`src/data/spotify.js`). Components fetch this data and map over it, allowing for a scalable and dynamic UI that doesn't rely on hardcoded HTML elements.

3. **Routing & Component Mounting**: 
   Instead of using an external router (like React Router), the application uses state-based dynamic component mounting inside `App.jsx`. As the user clicks links in the `Sidebar` or `MobileNav`, `App.jsx` swaps out the main viewport component (e.g., swapping `HomePage` for `SearchPage`).
   *Crucially, the `Player.jsx` component sits outside of this view portal, ensuring the music never stops playing when the user navigates to a different page.*

4. **Responsive Strategy**: 
   The application uses modern CSS variables, Grid, and Flexbox properties inside `index.css`. For screens smaller than `768px`, the application hides the desktop `Sidebar` and dynamically injects the `MobileNav` component to provide a native mobile app-like experience.

---

## 📁 Detailed Folder Structure

```text
Spotify-clone/
├── public/                 # Static assets and favicons
├── src/
│   ├── Components/         # Modular React components
│   │   ├── AlbumPage.jsx   # Renders album details and tracklists
│   │   ├── ArtistPage.jsx  # Renders artist profile and discography
│   │   ├── HomePage.jsx    # Main dashboard with dynamic greetings
│   │   ├── LibraryPage.jsx # User's saved playlists and albums
│   │   ├── MobileNav.jsx   # Bottom navigation tailored for mobile views
│   │   ├── MusicCard.jsx   # Reusable UI card for albums/playlists/artists
│   │   ├── Player.jsx      # Global audio playback controller UI
│   │   ├── PlaylistPage.jsx# Renders playlist details and pinned statuses
│   │   ├── SearchPage.jsx  # Search functionality and genre category grid
│   │   ├── Sidebar.jsx     # Desktop side navigation and pinned items
│   │   └── icons.jsx       # Reusable raw SVG icon components
│   ├── context/
│   │   └── PlayerContext.jsx # Global state manager for audio playback
│   ├── data/
│   │   └── spotify.js      # Mock database (artists, albums, playlists)
│   ├── App.jsx             # Main application wrapper and state-based router
│   ├── index.css           # Global styles and responsive media queries
│   └── main.jsx            # React DOM entry point
├── eslint.config.js        # ESLint rules and configuration
├── package.json            # Project metadata and npm dependencies
└── vite.config.js          # Vite builder configuration
```

---

## 🛠️ Tech Stack

- **Frontend Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** Vanilla CSS 
- **State Management:** React Context API

---

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

---

## 🌐 Deployment

This application is configured and ready to be deployed instantly on modern hosting platforms.

**Deploying to Vercel (Recommended):**
1. Import your repository into [Vercel](https://vercel.com/).
2. Vercel will automatically detect the **Vite** preset.
3. Click **Deploy**. The application is configured to serve dynamically from the root directory.

---
*Built for educational and portfolio purposes.*
