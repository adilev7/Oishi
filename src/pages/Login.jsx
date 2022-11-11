import { TextField } from "@mui/material";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Banner from "../components/UI/Banner";
import authContext from "../store/auth-context";

const Login = () => {
  const authCtx = useContext(authContext);
  const submitHandler = (e) => {
    e.preventDefault();
    authCtx.login();
  };
  return (
    <>
      <Banner
        image='https://iso.500px.com/wp-content/uploads/2020/02/Sushi-and-sashimi-variety-on-rustic-background-By-Alena-Haurylik-2.jpeg'
        title='Log in'
      />
      <form className='user-form' noValidate onSubmit={submitHandler}>
        <TextField
          sx={{ width: "30vw" }}
          id='outlined-basic'
          type='email'
          label='Email'
          variant='outlined'
          color='normal'
        />
        <TextField
          sx={{ width: "30vw", mb: "2em" }}
          id='outlined-basic'
          label='Password'
          variant='outlined'
          color='normal'
        />
        <button type='submit' className='full'>
          Log in
        </button>
        <p>
          Don't have an account? <NavLink to='/signup'>Sign up</NavLink>
        </p>
      </form>
    </>
  );
};

export default Login;
