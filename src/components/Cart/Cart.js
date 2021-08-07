import CartList from "./CartList";
import styles from "./Cart.module.css";
const Cart = (props) => {
  const total = props.cartItems.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  return (
    <div className={styles.cart}>
      <CartList
        items={props.cartItems}
        addCartItem={props.addCartItem}
        removeCartItem={props.removeCartItem}
      ></CartList>
      <div className={styles.total}>
        <div className={styles["total-label"]}>Total</div>{" "}
        <div className={styles["total-value"]}>${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Cart;
