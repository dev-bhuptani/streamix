import Axios from "axios";

const SongsPage = props => {
  const addOrRemoveSongsToFavHandler = (songId, add) => {
    Axios.post(
      "http://localhost:8080/entertainment",
      { entId: songId, add: add, entertainmentType: "favSongs" },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    ).then(res => {
      alert(res.data.message);
      props.setFavSongs(res.data.favEnt);
    });
  };

  const sos = props.songs.map(song => {
    const url = `http://localhost:8080/getent?entType=songs&entId=${song._id}`;
    return (
      <li key={song._id} className="entertainment-li my-5 py-5">
        <div className="card entertainment-cards">
          <div className="card-body">
            <h5 className="card-title">{song.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{song.artists}</h6>
            <p className="card-link">
              <a href={url}>
                <i className="fa fa-play-circle-o"></i>
              </a>
            </p>
            <button
              onClick={addOrRemoveSongsToFavHandler.bind(this, song._id, false)}
              className="card-link btn btn-outline-light btn-sm"
            >
              Remove from Fav
            </button>
            <button
              onClick={addOrRemoveSongsToFavHandler.bind(this, song._id, true)}
              className="card-link btn btn-light btn-sm"
            >
              Add To Fav
            </button>
          </div>
        </div>
      </li>
    );
  });

  return (
    <main>
      <ul>{sos}</ul>
    </main>
  );
};
export default SongsPage;
