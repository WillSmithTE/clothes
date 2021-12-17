import { ClothingItem } from "../../types";
import IMAGE_01 from "../images/01.jpg";
import IMAGE_02 from "../images/02.jpg";
import IMAGE_03 from "../images/03.jpg";
import IMAGE_04 from "../images/04.jpg";
import IMAGE_05 from "../images/05.jpg";
import IMAGE_06 from "../images/06.jpg";
import IMAGE_07 from "../images/07.jpg";
import IMAGE_08 from "../images/08.jpg";
import IMAGE_09 from "../images/09.jpg";
import IMAGE_10 from "../images/10.jpg";

const brands = ['Forever 21', 'Mango', 'Princess Polly', 'Urban Outfitters', 'Uniqlo', 'PacSun', 'Nasty Gal', 'Pretty Little Thing', 'Asos']

const data: ClothingItem[] = [
  {
    id: '1',
    name: "Leanne Graham",
    price: 25,
    match: "78",
    description:
      "Tight-fit mens white tee",
    message:
      "I will go back to Gotham and I will fight men Iike this but I will not become an executioner.",
    image: IMAGE_01,
  },
  {
    id: '2',
    name: "Clementine Bauch",
    price: 80,
    match: "93",
    description:
      "Sleazy blue denim jacket with mustard collar",
    message: "Someone like you. Someone who'll rattle the cages.",
    image: IMAGE_02,
  },
  {
    id: '3',
    name: "Ervin Howell",
    match: "45",
    price: 65,
    description:
      "Fully sick matching yellow tracky, with crop-top top",
    message:
      "Oh, hee-hee, aha. Ha, ooh, hee, ha-ha, ha-ha. And I thought my jokes were bad.",
    image: IMAGE_03,
  },
  {
    id: '4',
    price: 35,
    name: "John Lebsack",
    match: "88",
    description:
      "Basic black Yahweh Yireh tee",
    message: "Bats frighten me. It's time my enemies shared my dread.",
    image: IMAGE_04,
  },
  {
    id: '5',
    price: 45,
    name: "James Dietrich",
    match: "76",
    description:
      "Tidy white pullover - don't spill your curry on this thing",
    message: "It's not who I am underneath but what I do that defines me.",
    image: IMAGE_05,
  },
  {
    id: '6',
    price: 90,
    name: "Patricia Schulist",
    match: "95",
    description:
      "Full-length orangey-yellow traditional dress",
    message:
      "You have nothing, nothing to threaten me with. Nothing to do with all your strength.",
    image: IMAGE_06,
  },
  {
    id: '7',
    name: "Chelsey Weissnat",
    match: "67",
    price: 85,
    description:
      "Wavey red wedding dress",
    message:
      "Never start with the head. The victim gets all fuzzy. He can't feel the next... See?",
    image: IMAGE_07,
  },
  {
    id: '8',
    name: "Nicky Runol",
    price: 45,
    match: "85",
    description:
      "Dotty blue button-up",
    age: "27",
    location: "Irvine, CA",
    info1: 'Straight, Single, 5"10',
    info2: "Tea Totaller, Loves Photography & Travel",
    info3: "Beaches, Mountain, Cafe, Movies",
    info4: "Last seen: 23h ago",
    message:
      "And as for the television's so-called plan, Batman has no jurisdiction.",
    image: IMAGE_08,
  },
  {
    id: '9',
    price: 75,
    name: "Glenna Reichert",
    match: "74",
    description:
      "Autumn-style bomber jacket - extra waterproof",
    message:
      "This is what happens when an unstoppable force meets an immovable object.",
    image: IMAGE_09,
  },
  {
    id: '10',
    price: 15,
    name: "Kurtis DuBuque",
    match: "98",
    description:
      "Cute purple-and-grey tie for your cousin's wedding",
    message:
      "You want order in Gotham. Batman must take off his mask and turn himself in.",
    image: IMAGE_10,
  },
];

export const clothes = data.map((item, index) => {
  const brand = index > brands.length - 1 ? brands[index - brands.length] : brands[index]
  return {
    ...item,
    brand
  }
});
