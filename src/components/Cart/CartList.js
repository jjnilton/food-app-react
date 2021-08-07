import CartListItem from "./CartListItem";
import styles from "./CartList.module.css";

const CartList = (props) => {
  const cartItems = props.items.map((item) => {
    return (
      <CartListItem
        item={item}
        id={item.id}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        addCartItem={props.addCartItem}
        removeCartItem={props.removeCartItem}
      ></CartListItem>
    );
  });

  return <ul className={styles.list}>{cartItems}</ul>;
};

export default CartList;
