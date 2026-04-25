import React, { useContext } from 'react';
import { playlists, albums, artists } from '../data/spotify';
import { IHome, ISearch, ILib, IPlay } from './icons';
import { PlayerContext } from '../context/PlayerContext';

export default function Sidebar({ page, nav, activeId }) {
  const { likedSongs } = useContext(PlayerContext);

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo" onClick={() => nav("home")}>
          <svg viewBox="0 0 24 24" style={{ fill: "#1db954", width: 32, height: 32 }}>
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span>Spotify</span>
        </div>
        <nav className="sidebar-nav">
          <button className={`sidebar-nav-item${page === "home" ? " active" : ""}`} onClick={() => nav("home")}>
            <IHome /> Home
          </button>
          <button className={`sidebar-nav-item${page === "search" ? " active" : ""}`} onClick={() => nav("search")}>
            <ISearch /> Search
          </button>
          <button className={`sidebar-nav-item${page === "library" ? " active" : ""}`} onClick={() => nav("library")}>
            <ILib /> Library
          </button>
        </nav>
      </div>

      <div className="sidebar-library-section">
        <div className="library-section-header">
          <button className="lib-title" onClick={() => nav("library")}>
            <ILib /> Your Library
          </button>
          <button className="add-playlist-btn" title="Create playlist">+</button>
        </div>
        
        <div className="sidebar-library">
          {/* Liked Songs */}
          <button 
            className={`sidebar-library-item${activeId === "p3" ? " active" : ""}`} 
            onClick={() => nav("playlist", "p3")}
          >
            <div className="lib-item-img-wrap">
              <div style={{
                width: 40, height: 40, borderRadius: 3, flexShrink: 0, 
                background: "linear-gradient(135deg,#450af5,#8e8ee5)", 
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
              }}>
                ♥
              </div>
              <div className="lib-play-icon">
                <IPlay />
              </div>
            </div>
            <div className="sidebar-lib-info">
              <h4>Liked Songs</h4>
              <p>Playlist · {likedSongs.size} songs</p>
            </div>
          </button>

          {/* User Playlists */}
          {playlists.filter(p => p.id !== "p3").map(pl => (
            <button 
              key={pl.id} 
              className={`sidebar-library-item${activeId === pl.id ? " active" : ""}`} 
              onClick={() => nav("playlist", pl.id)}
            >
              <div className="lib-item-img-wrap">
                <img src={pl.image} alt={pl.title} />
                <div className="lib-play-icon">
                  <IPlay />
                </div>
              </div>
              <div className="sidebar-lib-info">
                <h4>{pl.title}</h4>
                <p>Playlist · {pl.owner}</p>
              </div>
            </button>
          ))}

          {/* Albums */}
          {albums.map(al => (
            <button 
              key={al.id} 
              className={`sidebar-library-item${activeId === al.id ? " active" : ""}`} 
              onClick={() => nav("album", al.id)}
            >
              <div className="lib-item-img-wrap">
                <img src={al.image} alt={al.title} />
                <div className="lib-play-icon">
                  <IPlay />
                </div>
              </div>
              <div className="sidebar-lib-info">
                <h4>{al.title}</h4>
                <p>Album · {al.artist}</p>
              </div>
            </button>
          ))}

          {/* Artists */}
          {artists.map(ar => (
            <button 
              key={ar.id} 
              className={`sidebar-library-item artist-lib${activeId === ar.id ? " active" : ""}`} 
              onClick={() => nav("artist", ar.id)}
            >
              <div className="lib-item-img-wrap">
                <img src={ar.image} alt={ar.name} />
                <div className="lib-play-icon">
                  <IPlay />
                </div>
              </div>
              <div className="sidebar-lib-info">
                <h4>{ar.name}</h4>
                <p>Artist</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
