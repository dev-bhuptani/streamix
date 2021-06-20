import Axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router";

const Login = props => {
  const [displayMessage, setDisplayMessage] = useState("");

  const loginFormSubmitHandler = event => {
    event.preventDefault();
    Axios.post("http://localhost:8080/login", {
      email: event.target[0].value,
      password: event.target[1].value,
    }).then(res => {
      if (!res.data.token) {
        setDisplayMessage(res.data.message);
        return;
      } else {
        localStorage.setItem("token", res.data.token);
        props.setIsUserLoggedInFunc(true);
      }
    });
  };
  console.log(displayMessage);
  return !props.isUserLoggedIn ? (
    <form
      onSubmit={loginFormSubmitHandler}
      className="mx-auto my-5 py-5"
      style={{ width: "20rem" }}
    >
      <p style={{ color: "red", textAlign: "center" }}>{displayMessage}</p>
      <label>Email</label>
      <input type="email" name="email" className="form-control my-4" />

      <label>Password</label>
      <input type="password" name="password" className="form-control my-4" />

      <input
        type="submit"
        className="form-control"
        style={{ width: "10rem", fontWeight: "bolder", fontSize: "1.15rem" }}
        value="Log in"
      />
    </form>
  ) : (
    <Redirect to="/homepage" />
  );
};

export default Login;
