import React from "react";
import Player from "../components/Player";
import { Link, useParams } from "react-router-dom";
import { songsArray } from "../../api/api";
import { artistArray } from "../../api/api";
import { useState, useEffect } from "react";

const Song = () => {
  const { id } = useParams();

  const [song, setSong] = useState(null); // Estado para armazenar a música atual
  const [artistObj, setArtistObj] = useState(null); // Estado para armazenar o artista
  const [songsArrayFromArtist, setSongsArrayFromArtist] = useState([]); // Estado para armazenar as músicas do artista
  const [randomIdFromArtist, setRandomIdFromArtist] = useState(null); // Estado para armazenar o ID aleatório
  const [randomId2FromArtist, setRandomId2FromArtist] = useState(null); // Estado para armazenar o segundo ID aleatório
  const [previusIdFromArtist, setPreviusIdFromArtist] = useState(null); // Estado para armazenar o ID anterior
  const [nexIdFromArtist, setNexIdFromArtist] = useState(null); // Estado para armazenar o próximo ID

  useEffect(() => {
    // Função assíncrona para carregar os dados
    const loadData = async () => {
      try {
        // Carregar songsArray e artistArray
        const songs = await songsArray();
        const artists = await artistArray();

        // Encontrar a música pelo ID
        const currentSong = songs.find(
          (currentSongObj) => currentSongObj._id === id
        );

        if (currentSong) {
          setSong(currentSong); // Definir a música no estado

          // Encontrar o artista da música
          const currentArtist = artists.find(
            (currentArtistObj) => currentArtistObj.name === currentSong.artist
          );
          setArtistObj(currentArtist); // Definir o artista no estado

          // Filtrar as músicas do artista
          const filteredSongs = songs.filter(
            (currentSongObj) => currentSongObj.artist === currentSong.artist
          );
          setSongsArrayFromArtist(filteredSongs); // Definir as músicas do artista no estado

          // Escolher músicas aleatórias
          const randomIndex = Math.floor(Math.random() * filteredSongs.length);
          const randomIndex2 = Math.floor(Math.random() * filteredSongs.length);
          setRandomIdFromArtist(filteredSongs[randomIndex]._id);
          setRandomId2FromArtist(filteredSongs[randomIndex2]._id);

          // Encontrar índices para anterior e próximo
          const currentIndex = filteredSongs.findIndex(
            (song) => song._id === id
          );
          const previusIndex =
            currentIndex === 0 ? filteredSongs.length - 1 : currentIndex - 1;
          const nextIndex =
            currentIndex === filteredSongs.length - 1 ? 0 : currentIndex + 1;

          setPreviusIdFromArtist(filteredSongs[previusIndex]._id);
          setNexIdFromArtist(filteredSongs[nextIndex]._id);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadData(); // Chamar a função para carregar os dados
  }, [id]); // Dependência: id

  // Se a música ainda não foi carregada, exibir uma mensagem de carregamento
  if (!song || !artistObj) {
    return <div>Carregando...</div>;
  }

  const imageUrl = song.image || ""; // Usar uma string vazia como fallback
  const duration = song.duration || 0;
  const audio = song.audio || undefined;

  return (
    <div className="song">
      <div className="song__container">
        <div className="song__image-container">
          <img
            src={imageUrl}
            alt={`Imagem da música ${song.name} do artista ${song.artist}`}
          />
        </div>
      </div>

      <div className="song__bar">
        <Link to={`/artist/${artistObj._id}`} className="song__artist-image">
          <img
            width={75}
            height={75}
            src={artistObj.image}
            alt={`Imagem do artista ${song.artist}`}
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
          <p className="song__name">{song.name}</p>
          <p>{song.artist}</p>
        </div>
      </div>
    </div>
  );
};

export default Song;
