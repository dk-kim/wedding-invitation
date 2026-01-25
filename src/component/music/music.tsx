import { useEffect, useRef, useState } from "react";
import "./musicPlayer.scss";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current!;
    audio.volume = 1.0;

    // 자동 재생 시도
    audio.play()
      .then(() => {
        setPlaying(true); // 자동재생 성공
      })
      .catch(() => {
        // 자동재생 실패 (브라우저 정책 때문에)
        setPlaying(false);
        // 이 상태에서는 버튼 클릭 시 바로 하나의 play()로 성공함
      });
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current!;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/wedding-invitation/bgm2.mp3" loop />

      <button className="music-button" onClick={togglePlay}>
        {playing ? "🔊 음악 끄기" : "🔈 음악 켜기"}
      </button>
    </>
  );
}