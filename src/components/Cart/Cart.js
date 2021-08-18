import CartList from "./CartList";
import styles from "./Cart.module.css";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import Checkout from "../Checkout/Checkout";
import Actions from "../UI/Actions";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const { items } = cartContext;
  const [showCheckout, setShowCheckout] = useState(false);

  const total = items.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  const toggleCheckout = () => {
    setShowCheckout((prevShowCheckout) => {
      return !prevShowCheckout;
    });
  };

  return (
    <Modal toggleCart={props.toggleCart} action="action">
      {!showCheckout && (
        <>
          <div className={styles.cart}>
            <CartList></CartList>
            <div className={styles.total}>
              <div className={styles["total-label"]}>Total</div>
              <div className={styles["total-value"]}>${total.toFixed(2)}</div>
            </div>
          </div>
          <Actions>
            <button onClick={props.toggleCart} value="close">
              Close
            </button>
            <button onClick={toggleCheckout} value="action" disabled={total < 1}>
              Go To Checkout
            </button>
          </Actions>
        </>
      )}
      {showCheckout && (
        <Checkout total={total} goBack={toggleCheckout} closeModal={props.toggleCart}></Checkout>
      )}
    </Modal>
  );
};

export default Cart;
