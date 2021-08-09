import styles from "./CartListItem.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const CartListItem = (props) => {
  const cartContext = useContext(CartContext);

  const handleAdd = () => {
    // props.addCartItem(props.item);
    cartContext.addToCart(props.item)
  };

  const handleRemove = () => {
    // props.removeCartItem(props.item);
    cartContext.delFromCart(props.item)
  };

  return (
    <li className={styles.item}>
      <div className={styles["item-container"]}>
        <div className={styles["item-name"]}>{props.name}</div>
        <div className={styles["item-price-quantity"]}>
          <div className={styles["item-price"]}>${props.price}</div>
          <div className={styles.quantity}>x {props.quantity}</div>
        </div>
      </div>
      <div>
        <div className={styles["subtotal"]}>
          <div>subtotal</div>
          <div>${(props.price * props.quantity).toFixed(2)}</div>
        </div>
        <div className={styles["add-sub-container"]}>
          <button className={styles["add-sub"]} onClick={handleRemove}>
            -
          </button>
          <button className={styles["add-sub"]} onClick={handleAdd}>
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartListItem;
