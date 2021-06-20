import Axios from "axios";
import { Redirect } from "react-router";

const SignUp = props => {
  const signUpFormSubmitHandler = event => {
    event.preventDefault();
    Axios.post("http://localhost:8080/signup", {
      name: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value,
      confirmPassword: event.target[3].value,
    }).then(res => {
      console.log(res.data);
    });
  };
  return !props.isUserLoggedIn ? (
    <form
      onSubmit={signUpFormSubmitHandler}
      className="mx-auto my-2"
      style={{ width: "20rem" }}
    >
      <label>Name</label>
      <input type="text" name="name" className="form-control my-4" />

      <label>Email</label>
      <input type="email" name="email" className="form-control my-4" />

      <label>Password</label>
      <input type="password" name="password" className="form-control my-4" />

      <label>Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        className="form-control my-4"
      />

      <input
        type="submit"
        className="form-control"
        style={{ width: "10rem", fontWeight: "bolder", fontSize: "1.15rem" }}
        value="Sign up"
      />
    </form>
  ) : (
    <Redirect to="/homepage" />
  );
};

export default SignUp;
