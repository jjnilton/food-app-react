import { useContext, useEffect, useRef, useState } from "react";
import CartContext from "../../store/cart-context";
import styles from "./CartButton.module.css";

const CartButton = (props) => {
  const [buttonEffect, setButtonEffect] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const isMount = useRef(true);

  useEffect(() => {
    if (isMount.current) {
      isMount.current = false;
    } else {
      setButtonEffect(true);
      const timer = setTimeout(() => {
        setButtonEffect(false);
      }, 100);
      return () => {
        clearTimeout(timer);
      }
    }
  }, [items]);

  const clickHandler = () => {
    props.toggleModal();
  };

  const getTotalItems = (cartItemsArray) => {
    const total = cartItemsArray.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
    return total;
  };

  return (
    <button
      className={`${styles.cartButton} ${
        buttonEffect ? styles.cartButtonEffect : ""
      }`}
      onClick={clickHandler}
    >
      <span className={styles["cart-label"]}>🛒 Your Cart</span>
      <span className={styles["items-quantity"]}>{getTotalItems(items)}</span>
    </button>
  );
};

export default CartButton;
