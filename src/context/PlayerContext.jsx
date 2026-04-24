import React, { createContext, useState, useEffect, useRef } from 'react';

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  
  // Starting with some default liked songs as an example
  const [likedSongs, setLikedSongs] = useState(new Set(["s9", "s15", "s33", "s40", "s42", "s1"]));
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("off"); // 'off', 'all', 'one'
  const [toast, setToast] = useState(null);
  
  const intervalRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const playSong = (song, q = []) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setProgress(0);
    
    if (q.length > 0) {
      setQueue(q);
      const idx = q.findIndex(s => s.id === song.id);
      setQueueIndex(idx >= 0 ? idx : 0);
    }
  };

  const playNext = () => {
    if (!queue.length) return;
    
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (queueIndex + 1) % queue.length;
    }
    
    setQueueIndex(nextIndex);
    setCurrentSong(queue[nextIndex]);
    setProgress(0);
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (!queue.length) return;
    
    // If we're more than 10% into the song, restart it instead of going back
    if (progress > 10) {
      setProgress(0);
      return;
    }
    
    const prevIndex = (queueIndex - 1 + queue.length) % queue.length;
    setQueueIndex(prevIndex);
    setCurrentSong(queue[prevIndex]);
    setProgress(0);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(p => !p);

  const toggleLike = (id) => {
    setLikedSongs(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast("Removed from Liked Songs");
      } else {
        next.add(id);
        showToast("Added to Liked Songs");
      }
      return next;
    });
  };

  // Simulating playback progress
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            if (repeat === "one") {
              return 0; // Loop current song
            }
            setTimeout(playNext, 50); // Move to next song
            return 0;
          }
          return p + 0.15; // Simulate progress tick
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, repeat, queueIndex, shuffle, queue.length]);

  const value = {
    currentSong,
    isPlaying,
    queue,
    volume,
    progress,
    likedSongs,
    shuffle,
    repeat,
    toast,
    playSong,
    togglePlay,
    playNext,
    playPrev,
    setVolume,
    setProgress,
    toggleLike,
    setShuffle,
    setRepeat
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {toast && <div className="toast">{toast}</div>}
    </PlayerContext.Provider>
  );
}
