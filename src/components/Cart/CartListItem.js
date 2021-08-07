import styles from "./CartListItem.module.css";

const CartListItem = (props) => {

  const handleAdd = () => {
    props.addCartItem(props.item);
  };

  const handleRemove = () => {
    props.removeCartItem(props.item);
  };

  return (
    <li className={styles.item}>
      <div>
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
        <button className={styles["add-sub"]} onClick={handleRemove}>-</button>
        <button className={styles["add-sub"]} onClick={handleAdd}>+</button>
      </div>
    </li>
  );
};

export default CartListItem;
