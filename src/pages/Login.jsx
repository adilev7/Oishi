import { TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import Banner from "../components/UI/Banner";
import authContext from "../store/auth-context";
import styles from './Form.module.scss'

const Login = () => {
  const [email, setEmail] = useState({
    value: "",
    error: "Email cannot be blank",
    dirty: false,
  });
  const [password, setPassword] = useState({
    value: "",
    error: "Password cannot be blank",
    dirty: false,
  });
  const [formIsValid, setFormIsValid] = useState(true);
  const authCtx = useContext(authContext);

  const emailBlurHandler = () => {
    setEmail((email) => ({ ...email, dirty: true }));
  };
  const passwordBlurHandler = () => {
    setPassword((prevState) => ({ ...prevState, dirty: true }));
  };
  const emailChangeHandler = (e) => {
    const value = e.currentTarget.value;
    setEmail(() => {
      let error = "";
      if (value.length < 5 || !value.includes("@") || !value.includes(".")) {
        error = "Please enter a valid email address";
      }
      if (value.length === 0) {
        error = "Email cannot be blank";
      }
      return { value, error, dirty: true };
    });
    setFormIsValid(true);
  };
  const passwordChangeHandler = (e) => {
    const value = e.currentTarget.value;
    setPassword(() => {
      let error = "";
      if (value.length < 5) {
        error = "Password must be at least 5 characters long";
      }
      if (value.length === 0) {
        error = "Password cannot be blank";
      }
      return { value, error, dirty: true };
    });
    setFormIsValid(true);
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    const { isApproved } = authCtx.login(email.value, password.value);
    if (!isApproved) setFormIsValid(false);
  };
  

  const emailIsValid = !email.dirty || !email.error.length;
  const passwordIsValid = !password.dirty || !password.error.length;
  const disableSubmit =
    !email.dirty ||
    !password.dirty ||
    !emailIsValid ||
    !passwordIsValid ||
    !formIsValid;

  return authCtx.isLoggedIn ? <Navigate replace to="/" /> : (
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
          value={email.value}
          error={!emailIsValid}
          helperText={emailIsValid ? "" : email.error}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
        />
        <TextField
          sx={{ width: "30vw", mb: "2em" }}
          id='outlined-basic'
          label='Password'
          variant='outlined'
          color='normal'
          value={password.value}
          error={!passwordIsValid}
          helperText={passwordIsValid ? "" : password.error}
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
        />
        {!formIsValid && (
          <div className={styles['form-error']}>Invalid email or password</div>
        )}
        <button
          type='submit'
          className='full'
          disabled={disableSubmit}>
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
