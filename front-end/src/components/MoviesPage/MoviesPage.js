import Axios from "axios";

const MoviesPage = props => {
  const addOrRemoveMovieToFavHandler = (movieId, add) => {
    Axios.post(
      "http://localhost:8080/entertainment",
      { entId: movieId, add: add, entertainmentType: "favMovies" },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    ).then(res => {
      alert(res.data.message);
      props.setFavMovies(res.data.favEnt);
    });
  };

  const movs = props.movies.map(movie => {
    const url = `http://localhost:8080/getent?entType=movies&entId=${movie._id}`;
    return (
      <li key={movie._id} className="entertainment-li my-5 py-5">
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
            <button
              onClick={addOrRemoveMovieToFavHandler.bind(
                this,
                movie._id,
                false
              )}
              className="card-link btn btn-outline-light btn-sm"
            >
              Remove from fav
            </button>
            <button
              onClick={addOrRemoveMovieToFavHandler.bind(this, movie._id, true)}
              className="card-link btn btn-light btn-sm"
            >
              Add to fav
            </button>
          </div>
        </div>
      </li>
    );
  });

  return (
    <main>
      <ul>{movs}</ul>
    </main>
  );
};
export default MoviesPage;
