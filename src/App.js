import { useState, useEffect } from "react";
import Header from "./components/UI/Header";
import FoodList from "./components/Food/FoodList";
import CartProvider from "./store/CartProvider";
import styles from "./App.module.css";
import Cart from "./components/Cart/Cart";

const App = () => {
  const [cartVisible, setCartVisible] = useState(false);

  const toggleCart = () => {
    setCartVisible((prevState) => {
      return !prevState;
    });
  };

  // probably not the best way
  useEffect(() => {
    if (cartVisible) {
      document.getElementById("modal").style = "display: block";
      document.getElementById("backdrop").style = "display: block";
    } else {
      document.getElementById("modal").style = "display: none";
      document.getElementById("backdrop").style = "display: none";
    }
  }, [cartVisible]);

  return (
    <CartProvider>
      <Header toggleCart={toggleCart}></Header>
      <main className={styles.main}>
        <FoodList></FoodList>
      </main>
      {cartVisible && (
        <Cart toggleCart={toggleCart} cartVisible={cartVisible}></Cart>
      )}
    </CartProvider>
  );
};

export default App;
