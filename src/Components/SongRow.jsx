import React, { useState, useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

export default function SongRow({ song, index, queue = [], showAlbum = true, onNavigate }) {
  const [isHovered, setIsHovered] = useState(false);
  const { currentSong, isPlaying, playSong, toggleLike, likedSongs } = useContext(PlayerContext);
  
  const isActive = currentSong?.id === song.id;
  const isLiked = likedSongs.has(song.id);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    playSong(song, queue.length > 0 ? queue : [song]);
  };

  return (
    <div 
      className={`song-row${isActive ? " active" : ""}`} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
      onDoubleClick={() => playSong(song, queue.length > 0 ? queue : [song])}
    >
      <span className="song-num">
        {isHovered ? (
          <span onClick={handlePlayClick} style={{ cursor: "pointer" }}>
            {isActive && isPlaying ? "⏸" : "▶"}
          </span>
        ) : isActive ? (
          <span style={{ color: "var(--green)", fontSize: 12 }}>♫</span>
        ) : (
          index
        )}
      </span>
      
      <img src={song.image} alt={song.title} />
      
      <div className="song-info">
        <h4>{song.title}</h4>
        <p 
          style={{ cursor: "pointer" }} 
          onClick={(e) => {
            e.stopPropagation();
            if (onNavigate) onNavigate("artist", song.artistId);
          }}
        >
          {song.artist}
        </p>
      </div>
      
      {showAlbum ? (
        <span 
          className="song-album" 
          onClick={(e) => {
            e.stopPropagation();
            if (onNavigate) onNavigate("album", song.albumId);
          }}
        >
          {song.album}
        </span>
      ) : (
        <span className="song-album">{song.plays}</span>
      )}
      
      <span className="song-duration">{song.duration}</span>
      
      <button 
        className={`song-like-btn${isLiked ? " liked" : ""}`} 
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(song.id);
        }}
      >
        {isLiked ? "♥" : "♡"}
      </button>
    </div>
  );
}
