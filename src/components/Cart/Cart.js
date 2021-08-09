import CartList from "./CartList";
import styles from "./Cart.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const { items } = cartContext;

  const total = items.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  return (
    <div className={styles.cart}>
      <CartList></CartList>
      <div className={styles.total}>
        <div className={styles["total-label"]}>Total</div>{" "}
        <div className={styles["total-value"]}>${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Cart;
