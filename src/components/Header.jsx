import React from "react";
import logoSpotify from "../assets/logo/spotify-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img src={logoSpotify} alt="Logo do spotify" />
      </Link>

      <Link to="/">
        <h1 className="spotify_title">Spotify</h1>
      </Link>
    </div>
  );
};

export default Header;
