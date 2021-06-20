import { useCallback, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Axios from "axios";

import Header from "./components/Header/Header";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import SeriesPage from "./components/SeriesPage/SeriesPage";
import SongsPage from "./components/SongsPage/SongsPage";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import HomePage from "./components/HomePage/HomePage";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [songs, setSongs] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  const [favSeries, setFavSeries] = useState([]);
  const [favSongs, setFavSongs] = useState([]);

  const fetchDataHandler = useCallback(() => {
    setIsLoading(true);
    if (!localStorage.getItem("token")) {
      setIsUserLoggedIn(false);
      setIsLoading(false);
      return;
    }
    Axios.get("http://localhost:8080/homepage", {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then(res => {
        console.log("(App.js) DATA", res.data);
        if (!res.data.isUserLoggedIn) {
          localStorage.removeItem("token");
          setIsUserLoggedIn(false);
          setIsLoading(false);
          return;
        }
        setIsUserLoggedIn(true);
        setMovies(res.data.movies);
        setSeries(res.data.series);
        setSongs(res.data.songs);
        setFavMovies(res.data.favMovies);
        setFavSeries(res.data.favSeries);
        setFavSongs(res.data.favSongs);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  const setIsUserLoggedInHandler = val => {
    if (!val) {
      localStorage.removeItem("token");
    }
    setIsUserLoggedIn(val);
  };

  const setFavMoviesHandler = val => {
    setFavMovies(val);
  };

  const setFavSeriesHandler = val => {
    setFavSeries(val);
  };

  const setFavSongsHandler = val => {
    setFavSongs(val);
  };

  return (
    <>
      <Header
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedInHandler}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {!isUserLoggedIn ? (
            <Redirect to="/login" />
          ) : (
            <>
              <Route path="/homepage">
                <HomePage
                  favMovies={favMovies}
                  favSeries={favSeries}
                  favSongs={favSongs}
                />
              </Route>
              <Route path="/movies">
                <MoviesPage
                  movies={movies}
                  setFavMovies={setFavMoviesHandler}
                />
              </Route>
              <Route path="/series">
                <SeriesPage
                  series={series}
                  setFavSeries={setFavSeriesHandler}
                />
              </Route>
              <Route path="/songs">
                <SongsPage songs={songs} setFavSongs={setFavSongsHandler} />
              </Route>
            </>
          )}
          <Route path="/login">
            <Login
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedInFunc={setIsUserLoggedInHandler}
            />
          </Route>
          <Route path="/signup">
            <SignUp isUserLoggedIn={isUserLoggedIn} />
          </Route>
        </>
      )}
      <hr style={{ color: "white" }} />
      <footer>
        <h4 className="text-center text-white">Made by Devansh Bhuptani</h4>
      </footer>
    </>
  );
};

export default App;
