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
    setShowCheckout((prevState) => {
      return !showCheckout;
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
            <button onClick={props.goBack} value="close">
              Close
            </button>
            <button onClick={toggleCheckout} value="action">
              Go To Checkout
            </button>
          </Actions>
        </>
      )}
      {showCheckout && (
        <Checkout total={total} goBack={toggleCheckout}></Checkout>
      )}
    </Modal>
  );
};

export default Cart;
