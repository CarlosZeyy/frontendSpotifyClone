import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faBackwardStep,
  faForwardStep,
  faShuffle,
  faRepeat,
  faCirclePause,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

const formatTime = (timeInSec) => {
  const minutes = Math.floor(timeInSec / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(timeInSec - minutes * 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const timeInSecs = (timeString) => {
  const splitArray = timeString.split(":");
  const minutes = Number(splitArray[0]);
  const secs = Number(splitArray[1]);

  return secs + minutes * 60;
};

const Player = ({
  duration,
  previusIdFromArtist,
  nexIdFromArtist,
  randomIdFromArtist,
  audio,
}) => {
  const audioPlayer = useRef();
  const progressBar = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(formatTime(0));
  const durationInSecs = timeInSecs(duration);

  const playPause = () => {
    isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();

    setIsPlaying(!isPlaying);

    setCurrentTime(formatTime(audioPlayer.current.currentTime));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying)
        setCurrentTime(formatTime(audioPlayer.current.currentTime));
      progressBar.current.style.setProperty(
        "--_progress",
        (audioPlayer.current.currentTime / durationInSecs) * 100 + "%"
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  return (
    <div className="player">
      <div className="player__controllers2">
        <Link to={`/song/${randomIdFromArtist}`}>
          <FontAwesomeIcon className="player__icon" icon={faShuffle} />
        </Link>

        <div className="player__controllers">
          <Link to={`/song/${previusIdFromArtist}`}>
            <FontAwesomeIcon className="player__icon" icon={faBackwardStep} />
          </Link>

          <FontAwesomeIcon
            className="player__icon player__icon--play"
            icon={isPlaying ? faCirclePause : faCirclePlay}
            onClick={() => {
              playPause();
            }}
          />

          <Link to={`/song/${nexIdFromArtist}`}>
            <FontAwesomeIcon className="player__icon" icon={faForwardStep} />
          </Link>
        </div>

        <Link to={`/song/${randomIdFromArtist}`}>
          <FontAwesomeIcon className="player__icon" icon={faRepeat} />
        </Link>
      </div>

      <div className="player__progress">
        <p>{currentTime}</p>

        <div className="player__bar">
          <div ref={progressBar} className="player__bar-progress"></div>
        </div>

        <p>{duration}</p>
      </div>

      <audio ref={audioPlayer} src={audio}></audio>
    </div>
  );
};

export default Player;
