import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { albums } from '../data/spotify';
import SongRow from './SongRow';
import { IPlay, IPause } from './icons';

export default function AlbumPage({ id, nav }) {
  const { playSong, currentSong, isPlaying, togglePlay } = useContext(PlayerContext);
  
  const album = albums.find(a => a.id === id);
  if (!album) {
    return <div style={{ padding: 40 }}>Album not found.</div>;
  }
  
  const songs = album.songs.map(s => ({
    ...s,
    artist: album.artist,
    artistId: album.artistId,
    album: album.title,
    albumId: album.id,
    image: album.image
  }));
  
  const isCurrent = currentSong && songs.some(s => s.id === currentSong.id);
  
  // Choose a gradient color based on album index
  const gradColors = ["#3d2b1f", "#1e3264", "#4a2c5a", "#1a3a1a", "#2e1a47", "#0a2e1a"];
  const gradColor = gradColors[albums.indexOf(album) % gradColors.length] || "#1e3264";

  const handlePlayClick = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playSong(songs[0], songs);
    }
  };

  return (
    <div>
      <div 
        className="page-hero" 
        style={{ background: `linear-gradient(180deg, ${gradColor} 0%, var(--bg-base) 100%)` }}
      >
        <img src={album.image} alt={album.title} />
        <div className="hero-info">
          <p className="hero-type">Album</p>
          <h1>{album.title}</h1>
          <div className="hero-meta">
            <span style={{ cursor: "pointer" }} onClick={() => nav("artist", album.artistId)}>
              {album.artist}
            </span>
            <span style={{ color: "var(--text-secondary)" }}>·</span>
            <span style={{ color: "var(--text-secondary)" }}>{album.year}</span>
            <span style={{ color: "var(--text-secondary)" }}>·</span>
            <span style={{ color: "var(--text-secondary)" }}>{songs.length} songs</span>
          </div>
        </div>
      </div>
      
      <div className="action-bar">
        <button className="play-big-btn" onClick={handlePlayClick}>
          {isCurrent && isPlaying ? <IPause /> : <IPlay />}
        </button>
        <button className="more-btn">···</button>
      </div>
      
      <div style={{ padding: "0 32px 100px" }}>
        <div className="song-list-header">
          <span>#</span><span></span><span>Title</span><span>Plays</span><span>Duration</span><span></span>
        </div>
        
        {songs.map((s, i) => (
          <SongRow 
            key={s.id} 
            song={s} 
            index={i + 1} 
            queue={songs} 
            showAlbum={false} 
            onNavigate={nav} 
          />
        ))}
        
        <div style={{ marginTop: 32, color: "var(--text-subdued)", fontSize: 13 }}>
          <p style={{ marginBottom: 4 }}>{album.year}</p>
          <p>© {album.year} {album.artist}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
