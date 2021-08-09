import CartListItem from "./CartListItem";
import styles from "./CartList.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const CartList = (props) => {
  const cartContext = useContext(CartContext);
  const { items } = cartContext;
  const cartItems = items.map((item) => {
    return (
      <CartListItem
        item={item}
        key={item.id}
        id={item.id}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
      ></CartListItem>
    );
  });

  return (
    cartItems.length > 0 ? <ul className={styles.list}>{cartItems}</ul> : <p>No items, please add something to the cart.</p>

  )
};

export default CartList;
