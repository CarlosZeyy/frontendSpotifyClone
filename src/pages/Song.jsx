import React from "react";
import Player from "../components/Player";
import { Link, useParams } from "react-router-dom";
import { songsArray } from "../assets/database/songs";
import { artistArray } from "../assets/database/artists";

const Song = () => {
  const { id } = useParams();

  const { image, name, duration, artist, audio } = songsArray.filter(
    (currentSongObj) => currentSongObj._id === id
  )[0];

  const artistObj = artistArray.filter(
    (currentArtistObj) => currentArtistObj.name === artist
  )[0];

  const songsArrayFromArtist = songsArray.filter(
    (currentSongObj) => currentSongObj.artist === artist
  );

  const randomIndex = Math.floor(
    Math.random() * (songsArrayFromArtist.length - 1)
  );

  const randomIdFromArtist = songsArrayFromArtist[randomIndex]._id;

  const randomIndex2 = Math.floor(
    Math.random() * (songsArrayFromArtist.length - 1)
  );

  const randomId2FromArtist = songsArrayFromArtist[randomIndex2]._id;

  // ? Tentativa de fazer um anterior e proximo :
  // * funcão de passar para o proximo está funcionando!

  const currentIndex = songsArrayFromArtist.findIndex(
    (song) => song._id === id
  );

  const previusIndex =
    currentIndex === 0 ? songsArrayFromArtist.length - 1 : currentIndex - 1;

  const nextIndex =
    currentIndex === songsArrayFromArtist.length - 1 ? 0 : currentIndex + 1;

  const previusIdFromArtist = songsArrayFromArtist[previusIndex]._id;

  const nexIdFromArtist = songsArrayFromArtist[nextIndex]._id;

  // ? Tentativa de fazer um repeat :

  return (
    <div className="song">
      <div className="song__container">
        <div className="song__image-container">
          <img
            src={image}
            alt={`Imagem da música ${name} do artista ${artist}`}
          />
        </div>
      </div>

      <div className="song__bar">
        <Link to={`/artist/${artistObj._id}`} className="song__artist-image">
          <img
            width={75}
            height={75}
            src={artistObj.image}
            alt={`Imagem do artista ${artist}`}
          />
        </Link>

        <Player
          duration={duration}
          randomIdFromArtist={randomIdFromArtist}
          randomId2FromArtist={randomId2FromArtist}
          nexIdFromArtist={nexIdFromArtist}
          previusIdFromArtist={previusIdFromArtist}
          audio={audio}
        />

        <div>
          <p className="song__name">{name}</p>
          <p>{artist}</p>
        </div>
      </div>
    </div>
  );
};

export default Song;
