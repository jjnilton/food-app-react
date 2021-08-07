import { useRef } from "react";
import Button from "../UI/Button";
import styles from "./FoodListItem.module.css";

const FoodListItem = (props) => {
  const cartItem = {
    id: props.id,
    name: props.name,
    price: props.price,
  };

  const quantityRef = useRef();

  const handleClick = () => {
    props.onAddToCart(cartItem, +quantityRef.current.value);
  };

  return (
    <li className={styles.container}>
      <div>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>${props.price}</div>
      </div>
      <div>
        <div>
          <label className={styles.label} htmlFor="quantity">Amount</label>
          <input className={styles.input} id="quantity" type="number" defaultValue="1" min="1" ref={quantityRef}></input>
        </div>
        <Button type="button" value="+ Add" action={handleClick}></Button>
      </div>
    </li>
  );
};

export default FoodListItem;
