import { useEffect, useRef, useState } from "react";
import "./musicPlayer.scss";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current!;
    audio.volume = 1.0;

    const tryPlay = () => {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {}); // autoplay 제한 시 무시
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };

    window.addEventListener("click", tryPlay);
    window.addEventListener("touchstart", tryPlay);

    return () => {
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current!;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/bgm.mp3" loop />
      <button className="music-button" onClick={togglePlay}>
        {playing ? "🔊 음악 끄기" : "🔈 음악 켜기"}
      </button>
    </>
  );
}