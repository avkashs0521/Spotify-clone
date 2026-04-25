import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { IPlay, IPause, IPrev, INext, IShuffle, IRepeat, IVol } from './icons';

export default function Player() {
  const {
    currentSong, isPlaying, volume, progress, likedSongs, 
    shuffle, repeat, togglePlay, playNext, playPrev, 
    setVolume, setProgress, toggleLike, setShuffle, setRepeat
  } = useContext(PlayerContext);

  if (!currentSong) return null;

  const parseDuration = (durationString) => {
    if (!durationString) return 0;
    const [minutes, seconds] = durationString.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const formatTime = (secondsIn) => {
    const minutes = Math.floor(secondsIn / 60);
    const seconds = Math.floor(secondsIn % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const totalSeconds = currentSong ? parseDuration(currentSong.duration) : 0;
  const currentSeconds = (progress / 100) * totalSeconds;

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newProgress = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setProgress(newProgress);
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const height = rect.height;
    const clickY = e.clientY - rect.top;
    const newVolume = Math.round(Math.max(0, Math.min(100, (1 - (clickY / height)) * 100)));
    setVolume(newVolume);
  };

  const handleVolumeMouseDown = (e) => {
    handleVolumeClick(e);
    const onMouseMove = (moveEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const height = rect.height;
      const clickY = moveEvent.clientY - rect.top;
      const newVolume = Math.round(Math.max(0, Math.min(100, (1 - (clickY / height)) * 100)));
      setVolume(newVolume);
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const cycleRepeat = () => {
    setRepeat(r => r === "off" ? "all" : r === "all" ? "one" : "off");
  };

  return (
    <footer className="player">
      <div className="player-left">
        {currentSong ? (
          <>
            <img src={currentSong.image} alt={currentSong.title} />
            <div className="player-song-info">
              <h4>{currentSong.title}</h4>
              <p>{currentSong.artist}</p>
            </div>
            <button 
              className={`player-like-btn${likedSongs.has(currentSong.id) ? " liked" : ""}`} 
              onClick={() => toggleLike(currentSong.id)}
            >
              {likedSongs.has(currentSong.id) ? "♥" : "♡"}
            </button>
          </>
        ) : (
          <span style={{ color: "var(--text-subdued)", fontSize: 13 }}>No song playing</span>
        )}
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button 
            className={`ctrl-btn${shuffle ? " active" : ""}`} 
            onClick={() => setShuffle(s => !s)} 
            title="Shuffle"
          >
            <IShuffle />
          </button>
          
          <button className="ctrl-btn" onClick={playPrev}>
            <IPrev />
          </button>
          
          <button className="play-pause-btn" onClick={togglePlay}>
            {isPlaying ? <IPause /> : <IPlay />}
          </button>
          
          <button className="ctrl-btn" onClick={playNext}>
            <INext />
          </button>
          
          <button 
            className={`ctrl-btn${repeat !== "off" ? " active" : ""}`} 
            onClick={cycleRepeat}
          >
            <IRepeat one={repeat === "one"} />
          </button>
        </div>
        
        <div className="progress-row">
          <span className="progress-time">{formatTime(currentSeconds)}</span>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
            <div className="progress-thumb" style={{ left: `${progress}%` }} />
          </div>
          <span className="progress-time">{formatTime(totalSeconds)}</span>
        </div>
      </div>

      <div className="player-right">
        <div className="volume-wrap">
          <div className="volume-slider-container">
            <div className="volume-bar-vertical" onMouseDown={handleVolumeMouseDown}>
              <div className="volume-fill-vertical" style={{ height: `${volume}%` }}>
                <div className="volume-thumb-vertical" />
              </div>
            </div>
          </div>
          <IVol v={volume} />
        </div>
      </div>
    </footer>
  );
}
