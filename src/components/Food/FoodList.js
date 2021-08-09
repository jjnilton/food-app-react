import Card from "../UI/Card";
import FoodListItem from "./FoodListItem";
import styles from "./FoodList.module.css";

const data = [
  {
    id: 0,
    name: "Coxinha",
    description: "The stuff!",
    price: 21.99,
  },
  {
    id: 1,
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.99,
  },
  {
    id: 2,
    name: "Barbecue Burger",
    description: "America raw meaty.",
    price: 12.99,
  },
  {
    id: 3,
    name: "Green Bowl",
    description: "Healthy... and green...",
    price: 22.99,
  },
];

const FoodList = (props) => {
  const foodItems = data.map((item) => {
    return (
      <FoodListItem
        key={item.id}
        id={item.id}
        name={item.name}
        description={item.description}
        price={item.price}
      ></FoodListItem>
    );
  });

  return (
    <Card>
      <ul className={styles.list}>{foodItems}</ul>
    </Card>
  );
};

export default FoodList;
