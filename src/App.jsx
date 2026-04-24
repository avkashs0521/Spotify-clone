import React, { useState, useContext } from 'react';
import { PlayerProvider, PlayerContext } from './context/PlayerContext';
import Sidebar from './Components/Sidebar';
import Player from './Components/Player';
import HomePage from './Components/HomePage';
import SearchPage from './Components/SearchPage';
import LibraryPage from './Components/LibraryPage';
import AlbumPage from './Components/AlbumPage';
import PlaylistPage from './Components/PlaylistPage';
import ArtistPage from './Components/ArtistPage';

function AppLayout() {
  const [page, setPage] = useState("home");
  const [pageId, setPageId] = useState(null);
  const [history, setHistory] = useState([{ page: "home", id: null }]);
  const [hIdx, setHIdx] = useState(0);

  const nav = (target, id = null) => {
    setPage(target);
    setPageId(id);
    const entry = { page: target, id };
    setHistory((h) => {
      const newHistory = [...h.slice(0, hIdx + 1), entry];
      return newHistory;
    });
    setHIdx((h) => h + 1);
    
    // Scroll to top when navigating
    document.querySelector(".main-content")?.scrollTo(0, 0);
  };

  const goBack = () => {
    if (hIdx > 0) {
      const prevEntry = history[hIdx - 1];
      setPage(prevEntry.page);
      setPageId(prevEntry.id);
      setHIdx((h) => h - 1);
    }
  };

  const goFwd = () => {
    if (hIdx < history.length - 1) {
      const nextEntry = history[hIdx + 1];
      setPage(nextEntry.page);
      setPageId(nextEntry.id);
      setHIdx((h) => h + 1);
    }
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage nav={nav} />;
      case "search":
        return <SearchPage nav={nav} />;
      case "library":
        return <LibraryPage nav={nav} />;
      case "album":
        return <AlbumPage id={pageId} nav={nav} />;
      case "playlist":
        return <PlaylistPage id={pageId} nav={nav} />;
      case "artist":
        return <ArtistPage id={pageId} nav={nav} />;
      default:
        return <HomePage nav={nav} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar page={page} nav={nav} activeId={pageId} />
      <main className="main-content">
        <div style={{
          position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", 
          gap: 8, padding: "12px 32px", background: "rgba(18,18,18,0.85)", 
          backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,.04)"
        }}>
          <button 
            onClick={goBack} 
            disabled={hIdx === 0} 
            style={{
              background: "rgba(0,0,0,.7)", border: "none", color: hIdx === 0 ? "#535353" : "#fff", 
              width: 32, height: 32, borderRadius: "50%", cursor: hIdx === 0 ? "default" : "pointer", 
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0
            }}>
            ‹
          </button>
          <button 
            onClick={goFwd} 
            disabled={hIdx >= history.length - 1} 
            style={{
              background: "rgba(0,0,0,.7)", border: "none", color: hIdx >= history.length - 1 ? "#535353" : "#fff", 
              width: 32, height: 32, borderRadius: "50%", cursor: hIdx >= history.length - 1 ? "default" : "pointer", 
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0
            }}>
            ›
          </button>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              background: "#fff", borderRadius: "50%", width: 32, height: 32, 
              display: "flex", alignItems: "center", justifyContent: "center", 
              cursor: "pointer", fontWeight: 700, fontSize: 13, color: "#000"
            }}>
              U
            </div>
            <span style={{ fontSize: 13, fontWeight: 700 }}>User</span>
          </div>
        </div>
        {renderPage()}
      </main>
      <Player />
    </div>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <AppLayout />
    </PlayerProvider>
  );
}