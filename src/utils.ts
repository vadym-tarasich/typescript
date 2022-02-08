import { ListRecord } from "./types";
import { random, round, uniqueId, startCase } from "lodash";
import * as wcc from "world-countries-capitals";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum();

export function generateRandomGrades(): number[] {
  const length = random(1, 10);
  const result = [];
  for (let i = 0; i <= length; i++) {
    result.push(round(random(5, 10, true), 1));
  }

  return result;
}

function getRandomCity() {
  return startCase(
    wcc.getCountryDetailsByName(wcc.getRandomCountry())[0].capital
  );
}

export function getRandomFood() {
  const food = [
    "Bread",
    "Croissant",
    "Baguette Bread",
    "Pretzel",
    "Pancakes",
    "Cheese Wedge",
    "Meat On Bone",
    "Poultry Leg",
    "Cut of Meat",
    "Bacon",
    "Hamburger",
    "French Fries",
    "Pizza",
    "Hot Dog",
    "Sandwich",
    "Taco",
    "Burrito",
    "Stuffed Flatbread",
    "Egg",
    "Shallow Pan of Food",
    "Pot of Food",
    "Cornflakes",
    "Green Salad",
    "Popcorn",
    "Canned Food",
    "Bento Food",
    "Rice Cracker",
    "Rice Ball",
    "Cooked Rice",
    "Curry Rice",
    "Steaming Bowl",
    "Spaghetti",
    "Roasted Sweet Potato",
    "Oden",
    "Sushi",
    "Fried Shrimp",
    "Fish Cake with Swirl",
    "Dango",
    "Dumpling",
    "Fortune Cookie",
    "Takeout Box",
    "Soft Ice Cream",
    "Shaved Ice",
    "Ice Cream",
    "Doughnut",
    "Cookie",
    "Birthday Cake",
    "Shortcake",
    "Pie",
    "Chocolate Bar",
    "Candy",
    "Lollipop",
    "Custard",
    "Honey Pot"
  ];

  return food[random(0, food.length - 1)];
}

export function createCityGenerator() {
  return (): ListRecord => {
    const favouriteDish = getRandomFood();
    const foodNote =
      random(0, 1, true) > 0.5 ? lorem.generateWords(random(0, 3)) : undefined;
    return {
      id: uniqueId(),
      name: getRandomCity(),
      date: `${random(1, 28)}.${random(1, 12)}.${random(1999, 2021)}`,
      favouriteDish: {
        name: favouriteDish,
        ...(foodNote ? { note: foodNote } : {})
      },
      grades: generateRandomGrades()
    };
  };
}
