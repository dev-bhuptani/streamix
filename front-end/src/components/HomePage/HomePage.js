const HomePage = props => {
  const movs = props.favMovies.map(movie => {
    const url = `http://localhost:8080/getent?entType=movies&entId=${movie._id}`;
    return (
      <li key={movie._id} className="entertainment-li">
        <div className="card entertainment-cards">
          <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {new Date(movie.releasedOn).getFullYear()}
            </h6>
            <p className="card-text">{movie.description}</p>
            <p>
              <a href={url}>
                <i className="fa fa-play-circle-o"></i>
              </a>
            </p>
          </div>
        </div>
      </li>
    );
  });

  const srs = props.favSeries.map(serie => {
    const url = `http://localhost:8080/getent?entType=series&entId=${serie._id}`;
    return (
      <li key={serie._id} className="entertainment-li">
        <div className="card entertainment-cards">
          <div className="card-body">
            <h5 className="card-title">{serie.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {serie.seasons} Seasons
            </h6>
            <p className="card-text">{serie.description}</p>
            <p>
              <a href={url}>
                <i className="fa fa-play-circle-o"></i>
              </a>
            </p>
          </div>
        </div>
      </li>
    );
  });
  // console.log("Homepage", props.favSongs);
  const sos = props.favSongs.map(song => {
    const url = `http://localhost:8080/getent?entType=songs&entId=${song._id}`;
    return (
      <li key={song._id} className="entertainment-li">
        <div className="card entertainment-cards">
          <div className="card-body">
            <h5 className="card-title">{song.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{song.artists}</h6>
            <p className="card-link">
              <a href={url}>
                <i className="fa fa-play-circle-o"></i>
              </a>
            </p>
          </div>
        </div>
      </li>
    );
  });
  return (
    <main>
      <h1 className="text-center text-white mt-5">Your Fav Movies</h1>
      <ul>{movs}</ul>
      <h1 className="text-center text-white">Your Fav Seriess</h1>
      <ul>{srs}</ul>
      <h1 className="text-center text-white">Your Fav Songs</h1>
      <ul>{sos}</ul>
    </main>
  );
};

export default HomePage;
