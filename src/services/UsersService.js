import { sleep, hash } from "../utils/methods";
import bcrypt from "bcryptjs";

const users = [
  {
    id: "1",
    first_name: "Adi",
    last_name: "Lev",
    email: "lev733@gmail.com",
    password: hash("Adi123"),
  },
  {
    id: "2",
    first_name: "Leanne",
    last_name: "Graham",
    email: "Sincere@april.biz",
    password: hash("Leanne123"),
  },
  {
    id: "3",
    first_name: "Ervin",
    last_name: "Howell",
    email: "Shanna@melissa.tv",
    password: hash("Ervin123"),
  },
  {
    id: "4",
    first_name: "Clementine",
    last_name: "Bauch",
    email: "Nathan@yesenia.net",
    password: hash("Clementine123"),
  },
  {
    id: "5",
    first_name: "Patricia",
    last_name: "Lebsack",
    email: "Julianne.OConner@kory.org",
    password: hash("Patricia123"),
  },
];

export const getUser = async (id) => {
  await sleep();
  return users.find((user) => user.id === id);
};

const validate = async ({ email, password }) => {
  let isApproved = false;
  let message = "Invalid email or password";

  const user = users.find((u) => u.email === email);
  if (!user) throw new Error({ data: isApproved, message });

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) throw new Error({ data: isApproved, message });

  isApproved = true;
  message = "Successfully logged in";
  return { data: isApproved, message };
};

export const login = async ({ email, password }) => {
  // try {
    const res = await validate(email, password);
    localStorage.setItem("logged_in", res.data);
    return res.message;
  // } catch (err) {
  //   console.log(err.message);
    
  // }
};
export const logout = () => {
  localStorage.removeItem("logged_in");
};

export const createUser = async (newUser) => {
  await sleep();
  const emailExists = users.some((u) => u.email === newUser.email);
  if (emailExists) return;
  const salt = await bcrypt.genSalt(10);
  const user = { ...newUser, password: await bcrypt.hash(newUser.password, salt) };
  console.log({user})
  users.push(user);
  console.log('User created successfully!');
};
