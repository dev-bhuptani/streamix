import { NavLink } from "react-router-dom";

const Header = props => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          {props.isUserLoggedIn ? (
            <NavLink to="/homepage" className="navbar-brand">
              Streamix
            </NavLink>
          ) : (
            <NavLink to="/login" className="navbar-brand">
              Streamix
            </NavLink>
          )}
          <ul className="navbar-nav">
            {props.isUserLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink to="/homepage" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/movies" className="nav-link">
                    Movies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/series" className="nav-link">
                    Series
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/songs" className="nav-link">
                    Songs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    onClick={props.setIsUserLoggedIn.bind(this, false)}
                    className="nav-link"
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
