import React, { useContext, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { getAllSongs, playlists } from '../data/spotify';
import SongRow from './SongRow';
import { IPlay, IPause } from './icons';

export default function PlaylistPage({ id, nav }) {
  const { playSong, currentSong, isPlaying, togglePlay, likedSongs } = useContext(PlayerContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const allSongs = getAllSongs();

  let playlist = playlists.find(p => p.id === id);
  const isLiked = id === "p3";

  if (isLiked) {
    playlist = {
      id: "p3",
      title: "Liked Songs",
      description: `${likedSongs.size} liked songs`,
      image: null,
      songs: [...likedSongs],
      owner: "You",
      followers: null
    };
  }

  if (!playlist) {
    return <div style={{ padding: 40 }}>Playlist not found.</div>;
  }

  // Get full song objects from IDs
  const songs = playlist.songs.map(sid => allSongs.find(s => s.id === sid)).filter(Boolean);
  const isCurrent = currentSong && songs.some(s => s.id === currentSong.id);

  const handlePlayClick = () => {
    if (songs.length === 0) return;

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
        style={{
          background: isLiked
            ? "linear-gradient(180deg,#4a0ed6 0%,var(--bg-base) 100%)"
            : "linear-gradient(180deg,#456 0%,var(--bg-base) 100%)"
        }}
      >
        {isLiked ? (
          <div style={{
            width: 200, height: 200, flexShrink: 0,
            background: "linear-gradient(135deg,#450af5,#8e8ee5)",
            borderRadius: 4, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 80, boxShadow: "0 16px 48px rgba(0,0,0,.5)"
          }}>
            ♥
          </div>
        ) : (
          <img src={playlist.image || "https://picsum.photos/seed/default/300/300"} alt={playlist.title} />
        )}

        <div className="hero-info">
          <p className="hero-type">Playlist</p>
          <h1>{playlist.title}</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 8 }}>
            {playlist.description}
          </p>
          <div className="hero-meta">
            <span>{playlist.owner}</span>
            {playlist.followers && (
              <>
                <span style={{ color: "var(--text-secondary)" }}>·</span>
                <span style={{ color: "var(--text-secondary)" }}>{playlist.followers} likes</span>
              </>
            )}
            <span style={{ color: "var(--text-secondary)" }}>·</span>
            <span style={{ color: "var(--text-secondary)" }}>{songs.length} songs</span>
          </div>
        </div>
      </div>

      <div className="action-bar">
        <button className="play-big-btn" onClick={handlePlayClick}>
          {isCurrent && isPlaying ? <IPause /> : <IPlay />}
        </button>
        {!isLiked && (
          <button
            className={`follow-btn${isFollowing ? " following" : ""}`}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}
        <button className="more-btn">···</button>
      </div>

      <div style={{ padding: "0 32px 100px" }}>
        {songs.length === 0 ? (
          <div style={{ padding: "40px 0", textAlign: "center" }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
              Songs you like will appear here
            </p>
            <p style={{ color: "var(--text-secondary)" }}>
              Save songs by tapping the heart icon.
            </p>
          </div>
        ) : (
          <>
            <div className="song-list-header">
              <span>#</span><span></span><span>Title</span><span>Album</span><span>Duration</span><span></span>
            </div>
            {songs.map((s, i) => (
              <SongRow key={s.id} song={s} index={i + 1} queue={songs} onNavigate={nav} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
