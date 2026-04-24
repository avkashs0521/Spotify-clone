import React, { useState, useEffect } from 'react';
import { getAllSongs, albums, artists, playlists, categories } from '../data/spotify';
import SongRow from './SongRow';
import MusicCard from './MusicCard';

export default function SearchPage({ nav }) {
  const [query, setQuery] = useState("");
  const allSongs = getAllSongs();
  const lowerQuery = query.toLowerCase().trim();

  const filteredSongs = lowerQuery
    ? allSongs.filter(s =>
      s.title.toLowerCase().includes(lowerQuery) ||
      s.artist.toLowerCase().includes(lowerQuery) ||
      s.album.toLowerCase().includes(lowerQuery)
    )
    : [];

  const filteredAlbums = lowerQuery
    ? albums.filter(a =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.artist.toLowerCase().includes(lowerQuery)
    )
    : [];

  const filteredArtists = lowerQuery
    ? artists.filter(a => a.name.toLowerCase().includes(lowerQuery))
    : [];

  const filteredPlaylists = lowerQuery
    ? playlists.filter(p => p.title.toLowerCase().includes(lowerQuery))
    : [];

  const hasResults = filteredSongs.length || filteredAlbums.length || filteredArtists.length || filteredPlaylists.length;

  return (
    <div>
      <div className="top-bar">
        <div style={{ position: "relative", maxWidth: 360, width: "100%" }}>
          <svg viewBox="0 0 24 24" style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fill: "#121212", width: 18, height: 18
          }}>
            <path d="M10.533 1.279c-5.18 0-9.407 4.927-8.27 10.65C3.21 16.317 7.5 19.8 12.217 19.8c1.288 0 2.522-.289 3.633-.8l4.07 4.07a1 1 0 0 0 1.415-1.414l-4.07-4.07a9.166 9.166 0 0 0 1.29-4.687 9.067 9.067 0 0 0-9.007-9.007l.985-.613zm0 2c3.859 0 7.007 3.148 7.007 7.007s-3.148 7.007-7.007 7.007-7.007-3.148-7.007-7.007 3.148-7.007 7.007-7.007z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            autoFocus
            style={{
              width: "100%", background: "#fff", border: "none", borderRadius: 500,
              padding: "10px 18px 10px 42px", fontSize: 14, color: "#000", outline: "none"
            }}
          />
        </div>
      </div>

      <div className="page">
        {/* Browse Categories (when no query) */}
        {!lowerQuery && (
          <>
            <div className="section-header"><h2>Browse all</h2></div>
            <div className="card-grid">
              {categories.map(cat => (
                <div key={cat.id} className="category-card" style={{ background: cat.color }}>
                  <h3>{cat.name}</h3>
                  <img src={cat.image} alt={cat.name} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* No Results state */}
        {lowerQuery && !hasResults && (
          <div style={{ padding: "60px 0", textAlign: "center" }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
              No results for "{query}"
            </p>
            <p style={{ color: "var(--text-secondary)" }}>
              Check the spelling or try different keywords.
            </p>
          </div>
        )}

        {/* Songs Results */}
        {filteredSongs.length > 0 && (
          <>
            <div className="section-header"><h2>Songs</h2></div>
            <div className="song-list-header">
              <span>#</span><span></span><span>Title</span><span>Album</span><span>Duration</span><span></span>
            </div>
            {filteredSongs.slice(0, 8).map((s, i) => (
              <SongRow key={s.id} song={s} index={i + 1} queue={filteredSongs} onNavigate={nav} />
            ))}
          </>
        )}

        {/* Artists Results */}
        {filteredArtists.length > 0 && (
          <>
            <div className="section-header"><h2>Artists</h2></div>
            <div className="card-grid">
              {filteredArtists.map(ar => (
                <MusicCard key={ar.id} item={ar} type="artist" onNavigate={nav} />
              ))}
            </div>
          </>
        )}

        {/* Albums Results */}
        {filteredAlbums.length > 0 && (
          <>
            <div className="section-header"><h2>Albums</h2></div>
            <div className="card-grid">
              {filteredAlbums.map(al => (
                <MusicCard key={al.id} item={al} type="album" onNavigate={nav} />
              ))}
            </div>
          </>
        )}

        {/* Playlists Results */}
        {filteredPlaylists.length > 0 && (
          <>
            <div className="section-header"><h2>Playlists</h2></div>
            <div className="card-grid">
              {filteredPlaylists.map(pl => (
                <MusicCard key={pl.id} item={pl} type="playlist" onNavigate={nav} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
