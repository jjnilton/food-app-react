import CartButton from "./CartButton";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <h1>Food App</h1>
      <CartButton
        items={props.cartItems}
        toggleCart={props.toggleCart}
        placeOrder={props.placeOrder}
      ></CartButton>
    </header>
  );
};

export default Header;
