import { useCallback, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import { Card, Grid, TextField } from "@mui/material";

import { createUser, login } from "../services/UsersService";
import Banner from "../components/UI/Banner";
import styles from "./Form.module.scss";
import { useEffect } from "react";

const userInitialState = {
  first_name: {
    value: "",
    error: "",
    dirty: false,
  },
  last_name: {
    value: "",
    error: "",
    dirty: false,
  },
  email: {
    value: "",
    error: "",
    dirty: false,
  },
  password: {
    value: "",
    error: "",
    dirty: false,
  },
  address: {
    value: "",
    error: "",
    dirty: false,
  },
  credit_cards: [
    {
      credit_name: {
        value: "",
        error: "",
        dirty: false,
      },
      credit_num: {
        value: "",
        error: "",
        dirty: false,
      },
      credit_exp: {
        value: "",
        error: "",
        dirty: false,
      },
      credit_cvv: {
        value: "",
        error: "",
        dirty: false,
      },
    },
  ]
};

const userReducer = (prevState, action) => {
  switch (action.type) {
    case "FIRST_NAME_BLUR":
      let first_name = { ...prevState.first_name, dirty: true };
      if(!prevState.first_name.value.length) {
        first_name = {...first_name, error: 'First name cannot be blank'}
      }
      return {
        ...prevState,
        first_name
      };
    case "LAST_NAME_BLUR":
      let last_name = { ...prevState.last_name, dirty: true };
      if(!prevState.last_name.value.length) {
        last_name = {...last_name, error: 'Last name cannot be blank'}
      }
      return {
        ...prevState,
        last_name
      };
    case "EMAIL_BLUR":
      let email = { ...prevState.email, dirty: true };
      if(!prevState.email.value.length) {
        email = {...email, error: 'Email cannot be blank'}
      }
      return {
        ...prevState,
        email
      };
    case "PASSWORD_BLUR":
      let password = { ...prevState.password, dirty: true };
      if(!prevState.password.value.length) {
        password = {...password, error: 'Password cannot be blank'}
      }
      return {
        ...prevState,
        password
      };
    case "ADDRESS_BLUR":
      let address = { ...prevState.address, dirty: true };
      if(!prevState.address.value.length) {
        address = {...address, error: 'Address cannot be blank'}
      }
      return { ...prevState, address };
    case "CREDIT_NAME_BLUR": {
      const updated_credit_cards = prevState.credit_cards.map((card, i) =>{
        let credit_name = { ...card.credit_name, dirty: true }
        if(!card.credit_name.value.length) {
          credit_name = {...credit_name, error: 'Card owner name cannot be blank'}
        }
        return action.index === i
          ? { ...card, credit_name }
          : card
      });
      return { ...prevState, credit_cards: updated_credit_cards };
    }
    case "CREDIT_NUM_BLUR": {
      const updated_credit_cards = prevState.credit_cards.map((card, i) =>{
        let credit_num = { ...card.credit_num, dirty: true }
        if(!card.credit_num.value.length) {
          credit_num = {...credit_num, error: 'Card number cannot be blank'}
        }
        return action.index === i
          ? { ...card, credit_num }
          : card
      });
      return { ...prevState, credit_cards: updated_credit_cards };
    }
    case "CREDIT_EXP_BLUR": {
      const updated_credit_cards = prevState.credit_cards.map((card, i) =>{
        let credit_exp = { ...card.credit_exp, dirty: true }
        if(!card.credit_exp.value.length) {
          credit_exp = {...credit_exp, error: 'Card expiry date cannot be blank'}
        }
        return action.index === i
          ? { ...card, credit_exp }
          : card
      });
      return { ...prevState, credit_cards: updated_credit_cards };
    }
    case "CREDIT_CVV_BLUR": {
      const updated_credit_cards = prevState.credit_cards.map((card, i) =>{
        let credit_cvv = { ...card.credit_cvv, dirty: true }
        if(!card.credit_cvv.value.length) {
          credit_cvv = {...credit_cvv, error: 'Card CVV cannot be blank'}
        }
        return action.index === i
          ? { ...card, credit_cvv }
          : card
      });
      return { ...prevState, credit_cards: updated_credit_cards };
    }
    
    case "FIRST_NAME_CHANGE": {
      const value = action.value;
      let error = "";
      if (value.length < 2) {
        error = "First name must be at least 2 characters long";
      }
      if (value.length === 0) {
        error = "First name cannot be blank";
      }
      return {
        ...prevState,
        first_name: { ...prevState.first_name, value, error },
      };
    }
    case "LAST_NAME_CHANGE": {
      const value = action.value;
      let error = "";
      if (value.length < 2) {
        error = "Last name must be at least 2 characters long";
      }
      if (value.length === 0) {
        error = "Last name cannot be blank";
      }
      return {
        ...prevState,
        last_name: { ...prevState.last_name, value, error },
      };
    }
    case "EMAIL_CHANGE": {
      const value = action.value;
      let error = "";
      if (value.length < 5 || !value.includes("@") || !value.includes(".")) {
        error = "Please enter a valid email address";
      }
      if (value.length === 0) {
        error = "Email cannot be blank";
      }
      return { ...prevState, email: { ...prevState.email, value, error } };
    }
    case "PASSWORD_CHANGE": {
      const value = action.value;
      let error = "";
      if (value.length < 5) {
        error = "Password must be at least 5 characters long";
      }
      if (value.length === 0) {
        error = "Password cannot be blank";
      }
      return {
        ...prevState,
        password: { ...prevState.password, value, error },
      };
    }
    case "ADDRESS_CHANGE": {
      const value = action.value;
      let error = "";
      if (value.length < 3) {
        error = "Address must be at least 3 characters long";
      }
      if (value.length === 0) {
        error = "Address cannot be blank";
      }
      return {
        ...prevState,
        last_name: { ...prevState.last_name, value, error },
      };
    }
    case "CREDIT_NAME_CHANGE": {
      const { value, index } = action;
      let error = "";
      if (value.length < 5) {
        error = "Please enter the card holder's full name";
      }
      if (!value.includes(" ")) {
        error =
          "Credit card name must be made up of a first name and a last name";
      }
      if (value.length === 0) {
        error = "Credit card name cannot be blank";
      }
      const updated_credit_cards = prevState.credit_cards.map((card, i) =>
        index === i
          ? { ...card, credit_name: { ...card.credit_name, value, error } }
          : card
      );
      return { ...prevState, credit_cards: updated_credit_cards };
    }
    case "CREDIT_NUM_CHANGE": {
      const { value, index } = action;
      let error = "";
      if (value.length < 16) {
        error = "Please enter a valid credit card number";
      }
      if (value.length === 0) {
        error = "Credit card number cannot be blank";
      }
      const updated_credit_cards = prevState.credit_cards.map((card, i) =>
        index === i
          ? { ...card, credit_num: { ...card.credit_num, value, error } }
          : card
      );
      return { ...prevState, credit_cards: updated_credit_cards };
    }
    case "CREDIT_EXP_CHANGE": {
      const { value, index } = action;
      let error = "";
      if (value.length === 0) {
        error = "Credit card expire date cannot be blank";
      }
      const updated_credit_cards = prevState.credit_cards.map((card, i) =>
        index === i
          ? { ...card, credit_exp: { ...card.credit_exp, value, error } }
          : card
      );
      return { ...prevState, credit_cards: updated_credit_cards };
    }
    case "CREDIT_CVV_CHANGE": {
      const { value, index } = action;
      let error = "";
      if (value.length < 3) {
        error = "Credit card CVV must be at least 3 characters long";
      }
      if (value.length === 0) {
        error = "Credit card CVV cannot be blank";
      }
      const updated_credit_cards = prevState.credit_cards.map((card, i) =>
        index === i
          ? { ...card, credit_cvv: { ...card.credit_cvv, value, error } }
          : card
      );
      return { ...prevState, credit_cards: updated_credit_cards };
    }
    default:
      return userInitialState;
  }
};

const Signup = () => {
  const [user, userDispatch] = useReducer(userReducer, userInitialState);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const disableSubmitHandler = useCallback(() => {
    const userEntries = Object.entries(user);
    // const values = Object.keys(userEntries).map((k) => Array.isArray(userEntries[k]) ? userEntries[k].map((c) => c.value) : userEntries[k].value);
    for (const [i,[key, value]] of Object.entries(userEntries)) {
      if (key === "credit_cards") {
        value.forEach((card) => {
          const cardValues = Object.values(card);
          for (const [index, [val]] of Object.entries(cardValues)) {
            if (val.error.length || !val.dirty) {
              setDisableSubmit(true);
              return;
            }
            // if(Number(i) === userEntries.length - 1 && Number(index) === cardValues.length - 1) {
            //   setDisableSubmit(false);
            // }
          }
        });
        continue;
      }
      if (value.error.length || !value.dirty) {
        setDisableSubmit(true);
        return;
      }
    }
  }, [user]);

  useEffect(() => disableSubmitHandler, [disableSubmitHandler])
  useEffect(() => disableSubmitHandler, [disableSubmitHandler, user])


  const submitHandler = async (e) => {
    e.preventDefault();
    await createUser(user);
    login(user.email, user.password);
  };

  return (
    <>
      <Banner
        image='https://iso.500px.com/wp-content/uploads/2020/02/Sushi-and-sashimi-variety-on-rustic-background-By-Alena-Haurylik-2.jpeg'
        title='Sign up'
      />
      <form className={styles.form} noValidate onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='outlined-basic'
              type='text'
              label='First name'
              variant='outlined'
              color='normal'
              value={user.first_name.value}
              error={Boolean(user.first_name.error.length)}
              helperText={user.first_name.error}
              onChange={(e) =>
                userDispatch({
                  type: "FIRST_NAME_CHANGE",
                  value: e.currentTarget.value,
                })
              }
              onBlur={() => userDispatch({ type: "FIRST_NAME_BLUR" })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='outlined-basic'
              type='text'
              label='Last name'
              variant='outlined'
              color='normal'
              value={user.last_name.value}
              error={Boolean(user.last_name.error.length)}
              helperText={user.last_name.error}
              onChange={(e) =>
                userDispatch({
                  type: "LAST_NAME_CHANGE",
                  value: e.currentTarget.value,
                })
              }
              onBlur={() => userDispatch({ type: "LAST_NAME_BLUR" })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='outlined-basic'
              type='email'
              label='Email'
              variant='outlined'
              color='normal'
              value={user.email.value}
              error={Boolean(user.email.error.length)}
              helperText={user.email.error}
              onChange={(e) =>
                userDispatch({
                  type: "EMAIL_CHANGE",
                  value: e.currentTarget.value,
                })
              }
              onBlur={() => userDispatch({ type: "EMAIL_BLUR" })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='outlined-basic'
              label='Password'
              variant='outlined'
              color='normal'
              value={user.password.value}
              error={Boolean(user.password.error.length)}
              helperText={user.password.error}
              onChange={(e) =>
                userDispatch({
                  type: "PASSWORD_CHANGE",
                  value: e.currentTarget.value,
                })
              }
              onBlur={() => userDispatch({ type: "PASSWORD_BLUR" })}
            />
          </Grid>
          <Grid container item xs={12} spacing={2}>
            {user.credit_cards.map((card, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  classes={{ root: styles["credit-card-wrap"] }}
                  sx={{ mb: 2, p: 1 }}>
                  <Grid container spacing={2} columns={{ xs: 12 }}>
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        id='outlined-basic'
                        label='Name'
                        variant='outlined'
                        color='normal'
                        value={card.credit_name.value}
                        error={Boolean(card.credit_name.error.length)}
              helperText={card.credit_name.error}
                        onChange={(e) =>
                          userDispatch({
                            type: "CREDIT_NAME_CHANGE",
                            value: e.currentTarget.value,
                            index,
                          })
                        }
                        onBlur={() =>
                          userDispatch({
                            type: "CREDIT_NAME_BLUR",
                            index,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <TextField
                        fullWidth
                        id='outlined-basic'
                        label='Credit card number'
                        variant='outlined'
                        color='normal'
                        value={card.credit_num.value}
                        error={Boolean(card.credit_num.error.length)}
              helperText={card.credit_num.error}
                        onChange={(e) =>
                          userDispatch({
                            type: "CREDIT_NUM_CHANGE",
                            value: e.currentTarget.value,
                            index,
                          })
                        }
                        onBlur={() =>
                          userDispatch({
                            type: "CREDIT_NUM_BLUR",
                            index,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id='outlined-basic'
                        label='Expire date'
                        variant='outlined'
                        color='normal'
                        value={card.credit_exp.value}
                        error={Boolean(card.credit_exp.error.length)}
              helperText={card.credit_exp.error}
                        onChange={(e) =>
                          userDispatch({
                            type: "CREDIT_EXP_CHANGE",
                            value: e.currentTarget.value,
                            index,
                          })
                        }
                        onBlur={() =>
                          userDispatch({
                            type: "CREDIT_EXP_BLUR",
                            index,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id='outlined-basic'
                        label='CVV'
                        variant='outlined'
                        color='normal'
                        value={card.credit_cvv.value}
                        error={Boolean(card.credit_cvv.error.length)}
              helperText={card.credit_cvv.error}
                        onChange={(e) =>
                          userDispatch({
                            type: "CREDIT_CVV_CHANGE",
                            value: e.currentTarget.value,
                            index,
                          })
                        }
                        onBlur={() =>
                          userDispatch({
                            type: "CREDIT_CVV_BLUR",
                            index,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <button type='submit' className='full' disabled={disableSubmit}>
          Submit
        </button>
        <p className={styles['form-additional-link']}>
          Already have an account? <NavLink to='/login'>Log in</NavLink>
        </p>
      </form>
    </>
  );
};

export default Signup;
