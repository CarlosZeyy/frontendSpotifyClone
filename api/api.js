import axios from "axios";

const URL = "https://backendspotifyclone-production.up.railway.app/";

async function RequestData() {
  const responseArtists = await axios.get(`${URL}/artists`);
  const responseSongs = await axios.get(`${URL}/songs`);
  const artistArray = responseArtists.data;
  const songsArray = responseSongs.data;
}

RequestData();
