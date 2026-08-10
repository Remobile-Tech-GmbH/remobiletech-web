"use client";

import { useEffect, useRef, useState } from "react";

type ProcessReelProps = {
  caption: string;
  playLabel: string;
  pauseLabel: string;
};

export function ProcessReel({ caption, playLabel, pauseLabel }: ProcessReelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      setPlaying(false);
    }
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <figure className="process-reel">
      <div className="process-reel__frame">
        <video
          ref={videoRef}
          className="process-reel__video"
          poster="/media/refurbishing-reel-poster.jpg"
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src="/media/refurbishing-reel.mp4" type="video/mp4" />
        </video>
        <button className="process-reel__toggle" type="button" onClick={toggle} aria-label={playing ? pauseLabel : playLabel}>
          {playing ? (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true" focusable="false"><path d="M1 1h2.4v10H1zM6.6 1H9v10H6.6z" fill="currentColor" /></svg>
          ) : (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true" focusable="false"><path d="M1.4 1 9 6l-7.6 5z" fill="currentColor" /></svg>
          )}
        </button>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
