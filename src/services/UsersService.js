import { sleep } from "../utils/methods";

const users = [
  {
    id: "1",
    first_name: "Adi",
    last_name: "Lev",
    address: "54 Ha Lamed He, Givatayim",
    credit_cards: [
      {
        credit_num: 1234123412341111,
        credit_exp: "05/2024",
        cvv: 846,
      },
      {
        credit_num: 1234123412342222,
        credit_exp: "05/2024",
        cvv: 846,
      },
    ],
    email: "lev733@gmail.com",
    password: "Adi123",
  },
  {
    id: "2",
    first_name: "Leanne",
    last_name: "Graham",
    address: "8 Ha Nasi, Givat Shmuel",
    credit_cards: [
      {
        credit_num: 1234123412343333,
        credit_exp: "05/2024",
        cvv: 847,
      },
      {
        credit_num: 1234123412344444,
        credit_exp: "05/2024",
        cvv: 847,
      },
    ],
    email: "Sincere@april.biz",
    password: "Leanne123",
  },
  {
    id: "3",
    first_name: "Ervin",
    last_name: "Howell",
    address: "11 Jabotinsky, Bnei Brak",
    credit_cards: [
      {
        credit_num: 1234123412345555,
        credit_exp: "05/2024",
        cvv: 889,
      },
    ],
    email: "Shanna@melissa.tv",
    password: "Ervin123",
  },
  {
    id: "4",
    first_name: "Clementine",
    last_name: "Bauch",
    address: "135 Jabotinsky, Ramat Gan",
    credit_cards: [
      {
        credit_num: 1234123412346666,
        credit_exp: "05/2024",
        cvv: 864,
      },
      {
        credit_num: 1234123412341234,
        credit_exp: "05/2024",
        cvv: 337,
      },
    ],
    email: "Nathan@yesenia.net",
    password: "Clementine123",
  },
  {
    id: "5",
    first_name: "Patricia",
    last_name: "Lebsack",
    address: "22 Arlozorov, Tel Aviv",
    credit_cards: [
      {
        credit_num: 1234123412347777,
        credit_exp: "05/2024",
        cvv: 168,
      },
    ],
    email: "Julianne.OConner@kory.org",
    password: "Patricia123",
  },
];

export const getUser = async (id) => {
  await sleep();
  return users.find((user) => user.id === id);
};

export const login = (email, password) => {
  const loginResponse = { isApproved: false };
  const user = users.find((u) => u.email === email);
  if (!user) return loginResponse;
  if (user.password !== password) return loginResponse;
  loginResponse.isApproved = true;
  localStorage.setItem("logged_in", loginResponse.isApproved);
  return loginResponse;
};

export const logout = () => {
  localStorage.removeItem("logged_in");
};

export const createUser = async (newUser) => {
  await sleep();
  const emailExists = users.some((u) => u.email === newUser.email);
  if (emailExists) return;
  console.log({ newUser });
  users.push(newUser);
  console.log("User created successfully!");
};
