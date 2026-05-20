import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const [text, setText] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [error, setError] = useState(null);

  const getSearchResults = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://spotify23.p.rapidapi.com/search/",
        params: {
          q: text,
          type: "multi",
          offset: "0",
          limit: "10",
          numberOfTopResults: "5",
        },
        headers: {
          "X-RapidAPI-Key":
            "7febdc400dmsh311aeb988567eccp1204b2jsne4b1306a65c2",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      });
      setSearchData(response.data);
      setError(null);
    } catch (error) {
      console.log("Error fetching search data: ", error);
      setSearchData(null);
      setError(
        "An error occurred while fetching search data. Check the keyword you entered."
      );
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={getSearchResults} className="search-form">
        <input
          type="text"
          onChange={(event) => setText(event.currentTarget.value)}
          className="search-input"
          placeholder="Search for music, artists, podcasts, and more..."
        />
        <button type="submit" className="search-button">
          Test
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {searchData && (
        <div className="search-info">
          {/* Albums */}
          {searchData.albums && searchData.albums.items.length > 0 && (
            <>
              <h2 className="section-title">Albums:</h2>
              <div className="card-list">
                {searchData.albums.items.map((album, index) => (
                  <div key={`album-${index}`} className="card-item">
                    <img
                      src={album.data.coverArt.sources[0]?.url}
                      alt={album.data.name}
                      className="card-image"
                    />
                    <p className="card-title">{album.data.name}</p>
                    <p className="card-info">
                      Artist: {album.data.artists.items[0]?.profile.name}
                    </p>
                    <p className="card-info">
                      Release Year: {album.data.date.year}
                    </p>
                    <a href={album.data.uri}>Open Album</a>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Artists */}
          {searchData.artists && searchData.artists.items.length > 0 && (
            <>
              <h2 className="section-title">Artists:</h2>
              <div className="card-list">
                {searchData.artists.items.map((artist, index) => (
                  <div key={`artist-${index}`} className="card-item">
                    <img
                      src={artist.data.visuals.avatarImage.sources[0]?.url}
                      alt={artist.data.profile.name}
                      className="card-image"
                    />
                    <p className="card-title">{artist.data.profile.name}</p>
                    <a href={artist.data.uri}>Open Artist</a>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Episodes */}
          {searchData.episodes && searchData.episodes.items.length > 0 && (
            <>
              <h2 className="section-title">Episodes:</h2>
              <div className="card-list">
                {searchData.episodes.items.map((episode, index) => (
                  <div key={`episode-${index}`} className="card-item">
                    <img
                      src={episode.data.podcast.coverArt.sources[0]?.url}
                      alt={episode.data.name}
                      className="card-image"
                    />
                    <p className="card-title">{episode.data.name}</p>
                    <p className="card-info">
                      Release Date: {episode.data.releaseDate.isoString}
                    </p>
                    <a href={episode.data.uri}>Open Episode</a>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Genres */}
          {searchData.genres && searchData.genres.items.length > 0 && (
            <>
              <h2 className="section-title">Genres:</h2>
              <div className="card-list">
                {searchData.genres.items.map((genre, index) => (
                  <div key={`genre-${index}`} className="card-item">
                    <img
                      src={genre.data.image.sources[0]?.url}
                      alt={genre.data.name}
                      className="card-image"
                    />
                    <p className="card-title">{genre.data.name}</p>
                    <a href={genre.data.name}>Open Genre</a>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Playlists */}
          {searchData.playlists && searchData.playlists.items.length > 0 && (
            <>
              <h2 className="section-title">Playlists:</h2>
              <div className="card-list">
                {searchData.playlists.items.map((playlist, index) => (
                  <div key={`playlist-${index}`} className="card-item">
                    <img
                      src={playlist.data.images.items[0]?.sources[0]?.url}
                      alt={playlist.data.name}
                      className="card-image"
                    />
                    <p className="card-title">{playlist.data.name}</p>
                    <p className="card-info">
                      Owner: {playlist.data.owner.name}
                    </p>
                    <a href={playlist.data.uri}>Open Playlist</a>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Podcasts */}
          {searchData.podcasts && searchData.podcasts.items.length > 0 && (
            <>
              <h2 className="section-title">Podcasts:</h2>
              <div className="card-list">
                {searchData.podcasts.items.map((podcast, index) => (
                  <div key={`podcast-${index}`} className="card-item">
                    <img
                      src={podcast.data.coverArt.sources[0]?.url}
                      alt={podcast.data.name}
                      className="card-image"
                    />
                    <p className="card-title">{podcast.data.name}</p>
                    <p className="card-info">
                      Publisher: {podcast.data.publisher.name}
                    </p>
                    <p className="card-info">
                      Media Type: {podcast.data.mediaType}
                    </p>
                    <a href={podcast.data.uri}>Open Podcast</a>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Top Results */}
          {searchData.topResults &&
            searchData.topResults.featured.length > 0 && (
              <>
                <h2 className="section-title">Top Results:</h2>
                <div className="card-list">
                  {searchData.topResults.featured.map((result, index) => (
                    <div key={`top-result-${index}`} className="card-item">
                      <img
                        src={result.data.images.items[0]?.sources[0]?.url}
                        alt={result.data.name}
                        className="card-image"
                      />
                      <p className="card-title">{result.data.name}</p>
                      <a href={result.data.uri}>Open Top Results</a>
                    </div>
                  ))}
                </div>
              </>
            )}

          {/* Tracks */}
          {searchData.tracks && searchData.tracks.items.length > 0 && (
            <>
              <h2 className="section-title">Tracks:</h2>
              <div className="card-list">
                {searchData.tracks.items.map((track, index) => (
                  <div key={`track-${index}`} className="card-item">
                    <img
                      src={track.data.albumOfTrack.coverArt.sources[0]?.url}
                      alt={track.data.name}
                      className="card-image"
                    />
                    <p className="card-title">{track.data.name}</p>
                    {track.data.artists.items.length > 0 && (
                      <p className="card-info">
                        Artist: {track.data.artists.items[0].profile.name}
                      </p>
                    )}
                    <p className="card-info">
                      Album: {track.data.albumOfTrack.name}
                    </p>
                    <p className="card-info">
                      Duration: {track.data.duration.totalMilliseconds} ms
                    </p>
                    <a href={track.data.uri}>Open Track</a>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Users */}
          {searchData.users && searchData.users.items.length > 0 && (
            <>
              <h2 className="section-title">Users:</h2>
              <div className="card-list">
                {searchData.users.items.map((user, index) => (
                  <div key={`user-${index}`} className="card-item">
                    <img
                      src={user.data.image.largeImageUrl}
                      alt={user.data.displayName}
                      className="card-image"
                    />
                    <p className="card-title">Username: {user.data.username}</p>
                    <p className="card-info">
                      Display Name: {user.data.displayName}
                    </p>
                    <a href={user.data.uri}>Open User</a>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
