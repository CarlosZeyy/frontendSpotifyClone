import React from "react";
import ItemList from "./ItemList";
import { artistArray } from "../../api/api";
import { songsArray } from "../../api/api";

const Main = ({ type }) => {
  return (
    <div className="main">
      {type === "artists" || type === undefined ? (
        <ItemList
          title="Artistas"
          items={10}
          itemsArray={artistArray}
          path="/artists"
          idPath="/artist"
          type="artists"
        />
      ) : (
        <></>
      )}

      {type === "songs" || type === undefined ? (
        <ItemList
          title="Músicas"
          items={20}
          itemsArray={songsArray}
          path="/songs"
          idPath="/song"
          type="songs"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
