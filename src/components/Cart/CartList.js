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
        id={item.id}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        // addCartItem={props.addCartItem}
        // removeCartItem={props.removeCartItem}
      ></CartListItem>
    );
  });

  return <ul className={styles.list}>{cartItems}</ul>;
};

export default CartList;
