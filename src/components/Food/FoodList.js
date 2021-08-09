import Card from "../UI/Card";
import FoodListItem from "./FoodListItem";
import styles from "./FoodList.module.css";

const FoodList = (props) => {
  const foodItems = props.data.map((item) => {
    return (
      <FoodListItem
        id={item.id}
        name={item.name}
        description={item.description}
        price={item.price}
        // onAddToCart={props.onAddToCart}
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
