# Spotify Clone

A React-based web application modeling a modern music streaming interface. Built using React and Vite, the project features a custom audio playback context, component-based view rendering, and a modular architecture.

## Architecture & Pipeline

The application is structured as a Single Page Application (SPA) prioritizing component modularity and uninterrupted audio playback.

1. **State Management (`PlayerContext`)**
   The application leverages the React Context API for global state management. `PlayerContext` acts as the primary controller for:
   - The `currentSong` object in playback.
   - The boolean `isPlaying` state.
   - The active `songQueue` for sequential playback.
   - Global volume levels and track progression logic.
   
2. **Data Layer (`spotify.js`)**
   Content schemas (songs, playlists, artists, albums, categories) are decoupled from the UI and maintained within a centralized data file (`src/data/spotify.js`). This enables components to dynamically render layouts without relying on hardcoded DOM elements.

3. **Routing & View Mounting**
   The application uses state-based dynamic component mounting inside `App.jsx` rather than an external routing library. As navigation events are triggered via the `Sidebar` or `MobileNav`, the main viewport component is swapped. The `Player.jsx` component is maintained outside this view portal, ensuring continuous audio playback during navigation.

4. **Responsive Implementation**
   The UI utilizes modern CSS variables, Grid, and Flexbox for layout consistency. Media queries handle breakpoints: on viewports `< 768px`, the desktop `Sidebar` is unmounted and the `MobileNav` component is injected.

## Project Structure

```text
.
├── public/                 # Static assets and favicons
├── src/
│   ├── Components/         # Modular React components
│   │   ├── AlbumPage.jsx   # Renders album details and tracklists
│   │   ├── ArtistPage.jsx  # Renders artist profile and discography
│   │   ├── HomePage.jsx    # Main dashboard view
│   │   ├── LibraryPage.jsx # User's saved playlists and albums
│   │   ├── MobileNav.jsx   # Bottom navigation for mobile viewports
│   │   ├── MusicCard.jsx   # Reusable UI card component
│   │   ├── Player.jsx      # Global audio playback controller UI
│   │   ├── PlaylistPage.jsx# Renders playlist details
│   │   ├── SearchPage.jsx  # Search functionality and category grid
│   │   ├── Sidebar.jsx     # Desktop side navigation
│   │   └── icons.jsx       # Reusable raw SVG icon components
│   ├── context/
│   │   └── PlayerContext.jsx # Global state manager for audio playback
│   ├── data/
│   │   └── spotify.js      # Data models and initial state
│   ├── App.jsx             # Main application wrapper and state router
│   ├── index.css           # Global styles and responsive media queries
│   └── main.jsx            # React DOM entry point
├── eslint.config.js        # ESLint rules and configuration
├── package.json            # Project metadata and dependencies
└── vite.config.js          # Vite builder configuration
```

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Vanilla CSS 
- **State Management:** React Context API

## Local Development

### Prerequisites
- Node.js installed locally.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/avkashs0521/Spotify-clone.git
   cd Spotify-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The application will be served at `http://localhost:5173`.

## Deployment

The repository is configured for standard static deployment pipelines.

**Vercel Deployment:**
1. Import the repository into the Vercel dashboard.
2. The platform will automatically detect the Vite preset.
3. Deploy the application. Static assets will be served dynamically from the root directory.
