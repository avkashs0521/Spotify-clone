import React, { useState, useContext, useEffect } from 'react';
import { playlists, albums, artists } from '../data/spotify';
import { PlayerContext } from '../context/PlayerContext';

export default function LibraryPage({ nav }) {
  const [filter, setFilter] = useState("All");
  const { likedSongs } = useContext(PlayerContext);

  const filters = ["All", "Playlists", "Albums", "Artists"];

  return (
    <div>
      <div className="top-bar">
        <h2 style={{ fontSize: 16, fontWeight: 700 }}>Your Library</h2>
      </div>

      <div className="library-filters">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-btn${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="library-list">
        {/* Liked Songs */}
        {(filter === "All" || filter === "Playlists") && (
          <div className="library-item" onClick={() => nav("playlist", "p3")}>
            <div style={{
              width: 48, height: 48, borderRadius: 4, flexShrink: 0,
              background: "linear-gradient(135deg,#450af5,#8e8ee5)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
            }}>
              ♥
            </div>
            <div className="lib-item-info">
              <h4>Liked Songs</h4>
              <p>Playlist · {likedSongs.size} songs</p>
            </div>
          </div>
        )}

        {/* Playlists */}
        {(filter === "All" || filter === "Playlists") &&
          playlists.filter(p => p.id !== "p3").map(pl => (
            <div key={pl.id} className="library-item" onClick={() => nav("playlist", pl.id)}>
              <img src={pl.image} alt={pl.title} />
              <div className="lib-item-info">
                <h4>{pl.title}</h4>
                <p>Playlist · {pl.owner}</p>
              </div>
            </div>
          ))
        }

        {/* Albums */}
        {(filter === "All" || filter === "Albums") &&
          albums.map(al => (
            <div key={al.id} className="library-item" onClick={() => nav("album", al.id)}>
              <img src={al.image} alt={al.title} />
              <div className="lib-item-info">
                <h4>{al.title}</h4>
                <p>Album · {al.artist}</p>
              </div>
            </div>
          ))
        }

        {/* Artists */}
        {(filter === "All" || filter === "Artists") &&
          artists.map(ar => (
            <div key={ar.id} className="library-item artist-item" onClick={() => nav("artist", ar.id)}>
              <img src={ar.image} alt={ar.name} />
              <div className="lib-item-info">
                <h4>{ar.name}</h4>
                <p>Artist</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
