import React from "react";
import SongItem from "./SongItem";
import { useState } from "react";

const SongList = ({ songsArray }) => {
  const [items, setItems] = useState(5);
  const [visible, setVisible] = useState(true);

  return (
    <div className="song-list">
      {songsArray
        .filter((currentValueIndex, index) => index < items)
        .map((currentSongObj, index) => (
          <SongItem {...currentSongObj} index={index} key={index} />
        ))}

      <p
        className="song-list__see-more"
        onClick={() => {
          if (visible) {
            setItems(items + 5);
          } else {
            setItems(5);
          }
          setVisible(!visible);
        }}
      >
        {visible ? "Ver mais" : "Ver menos"}
      </p>
    </div>
  );
};

export default SongList;
