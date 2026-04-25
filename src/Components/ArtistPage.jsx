import React, { useState, useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { getAllSongs, albums, artists } from '../data/spotify';
import MusicCard from './MusicCard';
import { IPlay, IPause } from './icons';

export default function ArtistPage({ id, nav }) {
  const { playSong, currentSong, isPlaying, togglePlay } = useContext(PlayerContext);
  const [showAll, setShowAll] = useState(false);
  
  const allSongs = getAllSongs();
  const artist = artists.find(a => a.id === id);
  
  if (!artist) {
    return <div style={{ padding: 40 }}>Artist not found.</div>;
  }
  
  const artistSongs = allSongs.filter(s => s.artistId === id);
  const artistAlbums = albums.filter(a => a.artistId === id);
  const displayedSongs = showAll ? artistSongs : artistSongs.slice(0, 5);
  const isCurrent = currentSong && artistSongs.some(s => s.id === currentSong.id);

  const [isFollowing, setIsFollowing] = useState(false);
  const handlePlayClick = () => {
    if (artistSongs.length === 0) return;
    
    if (isCurrent) {
      togglePlay();
    } else {
      playSong(artistSongs[0], artistSongs);
    }
  };

  return (
    <div>
      <div className="artist-hero">
        <img src={artist.image} alt={artist.name} className="artist-hero-img" />
        <div className="artist-hero-gradient" />
        <div className="artist-hero-info">
          <div className="verified">
            <span style={{ fontSize: 16 }}>✓</span> Verified Artist
          </div>
          <h1>{artist.name}</h1>
          <p>{artist.followers} monthly listeners</p>
        </div>
      </div>
      
      <div className="action-bar">
        <button className="play-big-btn" onClick={handlePlayClick}>
          {isCurrent && isPlaying ? <IPause /> : <IPlay />}
        </button>
        <button 
          className={`follow-btn${isFollowing ? " following" : ""}`} 
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
        <button className="more-btn">···</button>
      </div>
      
      <div style={{ padding: "0 32px 100px" }}>
        <div className="section-header">
          <h2>Popular</h2>
        </div>
        
        {displayedSongs.map((s, i) => {
          const isActive = currentSong?.id === s.id;
          return (
            <div 
              key={s.id} 
              className={`song-row${isActive ? " active" : ""}`} 
              style={{ gridTemplateColumns: "16px 40px 1fr 70px 36px" }} 
              onDoubleClick={() => playSong(s, artistSongs)}
            >
              <span className="song-num">
                {isActive ? <span style={{ color: "var(--green)", fontSize: 12 }}>♫</span> : i + 1}
              </span>
              <img src={s.image} alt={s.title} />
              <div className="song-info">
                <h4 style={isActive ? { color: "var(--green)" } : {}}>{s.title}</h4>
                <p>{s.plays} plays</p>
              </div>
              <span className="song-duration">{s.duration}</span>
              <span style={{ width: 36 }} />
            </div>
          );
        })}
        
        {artistSongs.length > 5 && (
          <button 
            className="show-all-btn" 
            style={{ marginTop: 12, padding: "8px 0", fontSize: 13 }} 
            onClick={() => setShowAll(v => !v)}
          >
            {showAll ? "Show less" : "See more"}
          </button>
        )}
        
        {artistAlbums.length > 0 && (
          <>
            <div className="section-header" style={{ marginTop: 32 }}>
              <h2>Albums</h2>
            </div>
            <div className="card-grid">
              {artistAlbums.map(al => (
                <MusicCard key={al.id} item={al} type="album" onNavigate={nav} />
              ))}
            </div>
          </>
        )}
        
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>About</h2>
          <div style={{ background: "var(--bg-elevated)", borderRadius: 12, overflow: "hidden", position: "relative" }}>
            <img 
              src={artist.image} 
              alt={artist.name} 
              style={{ width: "100%", height: 260, objectFit: "cover", objectPosition: "top", opacity: 0.65 }} 
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, padding: 24, 
              background: "linear-gradient(0deg, rgba(0,0,0,.9) 0%, transparent 100%)"
            }}>
              <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                {artist.followers} monthly listeners
              </p>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {artist.name} is a {artist.genre} artist known for their unique sound and influence on modern music.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
