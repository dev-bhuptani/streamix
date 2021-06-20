import Axios from "axios";

const SeriesPage = props => {
  const addOrRemoveSeriesToFavHandler = (serieId, add) => {
    Axios.post(
      "http://localhost:8080/entertainment",
      { entId: serieId, add: add, entertainmentType: "favSeries" },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    ).then(res => {
      alert(res.data.message);
      props.setFavSeries(res.data.favEnt);
    });
  };

  const srs = props.series.map(serie => {
    const url = `http://localhost:8080/getent?entType=series&entId=${serie._id}`;
    return (
      <li key={serie._id} className="entertainment-li my-5 py-5">
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
            <button
              onClick={addOrRemoveSeriesToFavHandler.bind(
                this,
                serie._id,
                false
              )}
              className="card-link btn btn-outline-light btn-sm"
            >
              Remove from Fav
            </button>
            <button
              onClick={addOrRemoveSeriesToFavHandler.bind(
                this,
                serie._id,
                true
              )}
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
      <ul>{srs}</ul>
    </main>
  );
};
export default SeriesPage;
