import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { getAllSongs } from '../data/spotify';
import { IPlay } from './icons';

export default function MusicCard({ item, type, onNavigate }) {
  const { playSong } = useContext(PlayerContext);
  const allSongs = getAllSongs();

  const handlePlay = (e) => {
    e.stopPropagation();
    
    if (type === "album") {
      const songs = item.songs.map(s => ({
        ...s,
        artist: item.artist,
        artistId: item.artistId,
        album: item.title,
        albumId: item.id,
        image: item.image
      }));
      if (songs.length > 0) playSong(songs[0], songs);
      
    } else if (type === "playlist") {
      const songs = item.songs
        .map(id => allSongs.find(s => s.id === id))
        .filter(Boolean);
      if (songs.length > 0) playSong(songs[0], songs);
      
    } else if (type === "artist") {
      const songs = allSongs.filter(s => s.artistId === item.id);
      if (songs.length > 0) playSong(songs[0], songs);
    }
  };

  const getSubtitle = () => {
    if (type === "album") return `${item.year} · ${item.genre}`;
    if (type === "playlist") return item.description;
    if (type === "artist") return "Artist";
    return "";
  };

  return (
    <div className="music-card" onClick={() => onNavigate && onNavigate(type, item.id)}>
      <div className={`music-card-img-wrap${type === "artist" ? " artist-img" : ""}`}>
        <img 
          src={item.image || "https://picsum.photos/seed/default/300/300"} 
          alt={item.title || item.name} 
        />
        <button className="card-play-btn" onClick={handlePlay}>
          <IPlay />
        </button>
      </div>
      <h3>{item.pinned ? "📌 " : ""}{item.title || item.name}</h3>
      <p>{getSubtitle()}</p>
    </div>
  );
}
