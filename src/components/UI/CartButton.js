import { useEffect, useState } from "react";
import styles from "./CartButton.module.css";

const CartButton = (props) => {
    const [effect, setEffect] = useState(false);
    
    useEffect(() => {

        return () => {
            setTimeout(() => {
                setEffect(false)
            }, 100)
            setEffect(true)
        }
        
    }, [props.items])

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
    <button className={`${styles.cartButton} ${effect ? styles.cartButtonEffect : "puts"}`} onClick={clickHandler}>
      <span className={styles["cart-label"]}>🛒 Your Cart</span><span className={styles["items-quantity"]}>{getTotalItems(props.items)}</span>
    </button>
  );
};

export default CartButton;
