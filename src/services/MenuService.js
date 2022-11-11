import { sleep } from "../utils/methods";

const menu = [
  {
    id: "starters1",
    title: "Edamame",
    description: "Salted, boiled soy beans",
    price: 16,
    category: "starters",
  },
  {
    id: "starters2",
    title: "Egg roll",
    description: "Crunchy deep fried, filled with vegetables",
    price: 22,
    category: "starters",
  },
  {
    id: "starters3",
    title: "Chicken ball",
    description: "Crispy chicken balls served with sweet & sour sauce",
    price: 28,
    category: "starters",
  },
  {
    id: "starters4",
    title: "Spicy chilli wings",
    description: "6 pcs chicken wings in sweet & spicy chilli sauce",
    price: 28,
    category: "starters",
  },
  {
    id: "wok1",
    title: "Traditional fried rice",
    description:
      "Wok fried rice with egg, mushroom, cabbage, green onion and roasted garlic",
    price: 44,
    category: "wok",
  },
  {
    id: "wok2",
    title: "Udon makaou",
    description:
      "Combination of green curry, coconut milk, herbs, with broccoli, spring onion, mushroom, green pepper, served with udon noodle",
    price: 55,
    category: "wok",
  },
  {
    id: "wok3",
    title: "Pad thai",
    description:
      "Rice noodle with egg, cabbage, carrots, mung bean, green onion, peanuts, cilantro",
    price: 48,
    category: "wok",
  },
  {
    id: "wok4",
    title: "Yaki-udon",
    description:
      "Udon noodle with cabbage, carrot, mushroom, mung bean, chives and yakisoba sauce",
    price: 52,
    category: "wok",
  },
  {
    id: "wok5",
    title: "Sweet and sour",
    description:
      "Chicken balls, tofu or cod tempura in sweet and sour sauce, mushrooms, peppers, onion, pineapple,, and peanuts, served with steamed rice",
    price: 55,
    category: "wok",
  },
  {
    id: "ramen1",
    title: "Vegetable ramen",
    description:
      "Traditional main dish soup with udon noodle, egg, green onion",
    price: 48,
    category: "ramen",
  },
  {
    id: "ramen2",
    title: "Chicken ramen",
    description:
      "Traditional main dish soup with udon noodle, chicken, egg, green onion",
    price: 52,
    category: "ramen",
  },
  {
    id: "ramen3",
    title: "Beef ramen",
    description:
      "Traditional main dish soup with udon noodle, beef, egg, green onion",
    price: 55,
    category: "ramen",
  },
  {
    id: "sushi1",
    title: "Vegetable maki",
    description: "One piece of vegetable or fruit",
    price: 28,
    category: "sushi",
  },
  {
    id: "sushi2",
    title: "I/O vegetable / fruit maki",
    description: "Choice one piece of two vegetable or fruits",
    price: 32,
    category: "sushi",
  },
  {
    id: "sushi3",
    title: "Fish maki",
    description: "One piece of fish",
    price: 32,
    category: "sushi",
  },
  {
    id: "sushi4",
    title: "I/O Fish maki",
    description: "Choice one piece of fish and one piece of vegetable",
    price: 34,
    category: "sushi",
  },
  {
    id: "sushi5",
    title: "Maki tempura",
    description: "Choice of one vegetable or fish",
    price: 32,
    category: "sushi",
  },
];

export const getMenu = async (category) => {
  await sleep();
  return menu.filter((item) => item.category === category);
}
