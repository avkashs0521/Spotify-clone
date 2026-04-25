import React, { useContext,useEffect } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { getAllSongs, playlists, albums, artists } from '../data/spotify';
import MusicCard from './MusicCard';

export default function HomePage({ nav }) {
  const { playSong } = useContext(PlayerContext);
  const allSongs = getAllSongs();
  
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const quickItems = [...playlists.slice(0, 4), ...albums.slice(0, 2)];

  const handleQuickPlay = (e, item) => {
    e.stopPropagation();
    const isPlaylist = Array.isArray(item.songs) && typeof item.songs[0] === "string";
    let songsToPlay;
    
    if (isPlaylist) {
      songsToPlay = item.songs.map(id => allSongs.find(s => s.id === id)).filter(Boolean);
    } else {
      songsToPlay = allSongs.filter(s => s.albumId === item.id);
    }
    
    if (songsToPlay.length > 0) {
      playSong(songsToPlay[0], songsToPlay);
    }
  };

  return (
    <div>
      <div className="home-gradient">
        <div className="greeting">
          <h1>{greeting}</h1>
          <div className="quick-grid">
            {quickItems.map((item) => {
              const isPlaylist = Array.isArray(item.songs) && typeof item.songs[0] === "string";
              return (
                <div 
                  key={item.id} 
                  className="quick-tile"
                  onClick={() => nav(isPlaylist ? "playlist" : "album", item.id)}
                >
                  <img 
                    src={item.image || "https://picsum.photos/seed/liked/300/300"} 
                    alt={item.title} 
                  />
                  <span>{item.title}</span>
                  <button className="tile-play" onClick={(e) => handleQuickPlay(e, item)}>
                    <svg viewBox="0 0 24 24" style={{ fill: "#000", width: 18, height: 18, marginLeft: 2 }}>
                      <path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="page">
        <div className="section-header">
          <h2>Featured playlists</h2>
          <button className="show-all-btn">Show all</button>
        </div>
        <div className="card-grid">
          {playlists.map(pl => (
            <MusicCard key={pl.id} item={pl} type="playlist" onNavigate={nav} />
          ))}
        </div>
        
        <div className="section-header">
          <h2>New releases</h2>
          <button className="show-all-btn">Show all</button>
        </div>
        <div className="card-grid">
          {albums.map(al => (
            <MusicCard key={al.id} item={al} type="album" onNavigate={nav} />
          ))}
        </div>
        
        <div className="section-header">
          <h2>Popular artists</h2>
          <button className="show-all-btn">Show all</button>
        </div>
        <div className="card-grid">
          {artists.map(ar => (
            <MusicCard key={ar.id} item={ar} type="artist" onNavigate={nav} />
          ))}
        </div>
      </div>
    </div>
  );
}
