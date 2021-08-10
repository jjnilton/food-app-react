import { useContext, useState, useRef } from "react";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button";
import Input from "../UI/Input";
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
    if (+quantityRef.current.value > 0 && +quantityRef.current.value < 6) {
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
          <Input ref={quantityRef} className={styles.input} id={`item_${props.id}`} type="number" defaultValue="1" min="1" max="5"></Input>
        </div>
        <Button type="button" value="+ Add" action={handleClick}></Button>
        {invalidInput ? <div className={styles["invalid-input"]}>Invalid input</div> : <div className={styles["valid-input"]}></div>}
      </div>
    </li>
  );
};

export default FoodListItem;
