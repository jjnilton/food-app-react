import { useContext, useState, useRef } from "react";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button";
import styles from "./FoodListItem.module.css";

const FoodListItem = (props) => {
  const cartContext = useContext(CartContext);
  const [invalidInput, setInvalidInput] = useState(false);

  const cartItem = {
    id: props.id,
    name: props.name,
    price: props.price,
  };

  const quantityRef = useRef();

  const handleClick = () => {
    if (+quantityRef.current.value > 0) {
      setInvalidInput(false)
      cartContext.addToCart(cartItem, +quantityRef.current.value);
    } else {
      setInvalidInput(true);
    }
  };

  return (
    <li className={styles.container}>
      <div className={styles["item-container"]}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>${props.price}</div>
      </div>
      <div>
        <div className="input-data">
          <label className={styles.label} htmlFor={`item_${props.id}`}>
            Amount
          </label>
          <input
            className={styles.input}
            id={`item_${props.id}`}
            type="number"
            defaultValue="1"
            min="1"
            ref={quantityRef}
          ></input>
          {invalidInput && <div className={styles["invalid-input"]}>Invalid input</div>}
        </div>
        <Button type="button" value="+ Add" action={handleClick}></Button>
      </div>
    </li>
  );
};

export default FoodListItem;
