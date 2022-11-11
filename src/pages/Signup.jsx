import { TextField } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Banner from "../components/UI/Banner";
import { createUser, login } from "../services/UsersService";

const Signup = () => {

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = {
      first_name: first,
      last_name: last,
      email,
      password
    }

    await createUser(user);
    await login(user);
  };
  return (
    <>
      <Banner
        image='https://iso.500px.com/wp-content/uploads/2020/02/Sushi-and-sashimi-variety-on-rustic-background-By-Alena-Haurylik-2.jpeg'
        title='Sign up'
      />
      <form className='user-form' noValidate onSubmit={submitHandler}>
        <TextField
          sx={{ width: "30vw" }}
          id='outlined-basic'
          type='text'
          label='First name'
          variant='outlined'
          color="normal"
          value={first}
          onChange={(e) => setFirst(e.currentTarget.value)}
        />
        <TextField
          sx={{ width: "30vw" }}
          id='outlined-basic'
          type='text'
          label='Last name'
          variant='outlined'
          color="normal"
          value={last}
          onChange={(e) => setLast(e.currentTarget.value)}
        />
        <TextField
          sx={{ width: "30vw" }}
          id='outlined-basic'
          type='email'
          label='Email'
          variant='outlined'
          color="normal"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextField
          sx={{ width: "30vw", mb: "2em" }}
          id='outlined-basic'
          label='Password'
          variant='outlined'
          color="normal"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      
        <button type='submit' className='full'>
          Submit
        </button>
        <p>
          Already have an account? <NavLink to='/login'>Log in</NavLink>
        </p>
      </form>
    </>
  );
};

export default Signup;
