import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import SongList from "../components/SongList";
import { artistArray, songsArray } from "../../api/api";
import { useState, useEffect } from "react";

const Artist = ({}) => {
  const { id } = useParams();

  const [artist, setArtist] = useState(null); // Estado para armazenar o artista
  const [songsFromArtist, setSongsFromArtist] = useState([]); // Estado para armazenar as músicas do artista
  const [randomIdFromArtist, setRandomIdFromArtist] = useState(null); // Estado para armazenar o ID aleatório

  useEffect(() => {
    // Função assíncrona para carregar os dados
    const loadData = async () => {
      try {
        // Carregar artistArray e songsArray
        const artists = await artistArray();
        const songs = await songsArray();

        // Encontrar o artista pelo ID
        const currentArtist = artists.find(
          (currentArtistObj) => currentArtistObj._id === id
        );

        if (currentArtist) {
          setArtist(currentArtist); // Definir o artista no estado

          // Filtrar as músicas do artista
          const filteredSongs = songs.filter(
            (currentSongObj) => currentSongObj.artist === currentArtist.name
          );
          setSongsFromArtist(filteredSongs); // Definir as músicas no estado

          // Escolher uma música aleatória
          const randomIndex = Math.floor(Math.random() * filteredSongs.length);
          setRandomIdFromArtist(filteredSongs[randomIndex]._id); // Usar _id em vez de id
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadData(); // Chamar a função para carregar os dados
  }, [id]); // Dependência: id

  // Se o artista ainda não foi carregado, exibir uma mensagem de carregamento
  if (!artist) {
    return <div>Carregando...</div>;
  }

  const bannerUrl = artist.banner || "";

  return (
    <div className="artist">
      <div
        className="artist__header"
        style={{
          backgroundImage: `linear-gradient(to bottom, var(--_shade), var(--_shade)),url(${bannerUrl})`,
        }}
      >
        <h2 className="artist__title">{artist.name}</h2>
      </div>

      <div className="artist__body">
        <h2>Populares</h2>

        <SongList songsArray={songsFromArtist} />
      </div>

      <Link to={`/song/${randomIdFromArtist}`}>
        <FontAwesomeIcon
          className="single-item__icon single-item__icon--artist"
          icon={faCirclePlay}
        />
      </Link>
    </div>
  );
};

export default Artist;
