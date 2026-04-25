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
  
  const audioRef = useRef(new Audio());
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

    if (song.src) {
      audioRef.current.src = song.src;
      audioRef.current.play();
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
    const nextSong = queue[nextIndex];
    setCurrentSong(nextSong);
    setProgress(0);
    setIsPlaying(true);

    if (nextSong.src) {
      audioRef.current.src = nextSong.src;
      audioRef.current.play();
    }
  };

  const playPrev = () => {
    if (!queue.length) return;
    
    // If we're more than 10% into the song, restart it instead of going back
    if (progress > 10) {
      audioRef.current.currentTime = 0;
      setProgress(0);
      return;
    }
    
    const prevIndex = (queueIndex - 1 + queue.length) % queue.length;
    setQueueIndex(prevIndex);
    const prevSong = queue[prevIndex];
    setCurrentSong(prevSong);
    setProgress(0);
    setIsPlaying(true);

    if (prevSong.src) {
      audioRef.current.src = prevSong.src;
      audioRef.current.play();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (audioRef.current.src) {
        audioRef.current.play();
      }
    }
    setIsPlaying(p => !p);
  };

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

  // Sync audio with state and volume
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    
    const onTimeUpdate = () => {
      const p = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    };

    const onEnded = () => {
      if (repeat === "one") {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [queueIndex, repeat, shuffle, queue]);

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
