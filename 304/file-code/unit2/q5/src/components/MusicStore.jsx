import { useEffect, useState } from "react";

function MusicStore() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data));
  }, []);

  return (
    <div className="music-store">
      <h2>Music Store</h2>

      {songs.map((song) => (
        <div className="song" key={song.id}>
          <h3>{song.title}</h3>
          <p>Artist: {song.artist}</p>
        </div>
      ))}
    </div>
  );
}

export default MusicStore;