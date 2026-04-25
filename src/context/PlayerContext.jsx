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
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    const saved = localStorage.getItem('recentlyPlayed');
    return saved ? JSON.parse(saved) : [];
  });
  
  const audioRef = useRef(new Audio());
  const intervalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const playSong = async (song, q = []) => {
    let finalSong = { ...song };
    
    // Add to recently played
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      const updated = [song, ...filtered].slice(0, 20); // Keep last 20
      return updated;
    });

    // Attempt to fetch actual preview from iTunes if src is a placeholder or missing
    if (!song.src || song.src.includes("soundhelix")) {
      try {
        const query = encodeURIComponent(`${song.artist} ${song.title}`);
        const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
        const data = await response.json();
        if (data.results && data.results[0] && data.results[0].previewUrl) {
          finalSong.src = data.results[0].previewUrl;
        }
      } catch (error) {
        console.warn("Could not fetch actual preview, falling back to demo audio.", error);
      }
    }

    setCurrentSong(finalSong);
    setIsPlaying(true);
    setProgress(0);
    
    if (q.length > 0) {
      setQueue(q);
      const idx = q.findIndex(s => s.id === song.id);
      setQueueIndex(idx >= 0 ? idx : 0);
    }

    if (finalSong.src) {
      audioRef.current.src = finalSong.src;
      audioRef.current.play().catch(e => console.error("Playback failed:", e));
    }
  };

  const playNext = async () => {
    if (!queue.length) return;
    
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (queueIndex + 1) % queue.length;
    }
    
    setQueueIndex(nextIndex);
    const nextSong = queue[nextIndex];
    await playSong(nextSong, queue);
  };

  const playPrev = async () => {
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
    await playSong(prevSong, queue);
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
    recentlyPlayed,
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
