import axios from "axios";

const URL = "https://backendspotifyclone-production.up.railway.app";

// const responseArtists = await axios.get(`${URL}/artists`);
// const responseSongs = await axios.get(`${URL}/songs`);

// export const artistArray = responseArtists.data;
// export const songsArray = responseSongs.data;

export const artistData = async () => {
  const response = await axios.get(`${URL}/artists`);
  return response.data;
};

export const songData = async () => {
  const response = await axios.get(`${URL}/songs`);
  return response.data;
};

export const artistArray = async () => {
  return await artistData();
};
export const songsArray = async () => {
  return await songData();
};
