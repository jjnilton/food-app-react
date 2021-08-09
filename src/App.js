import { useState, useEffect } from "react";
import Header from "./components/UI/Header";
import FoodList from "./components/Food/FoodList";
import Modal from "./components/UI/Modal";
import CartProvider from "./store/CartProvider";

const data = [
  {
    id: 0,
    name: "Sushi",
    description: "Finest fish",
    price: 21.99,
  },
  {
    id: 1,
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.99,
  },
  {
    id: 2,
    name: "Barbecue Burger",
    description: "America raw meaty",
    price: 12.99,
  },
  {
    id: 3,
    name: "Green Bowl",
    description: "Healthy... and green...",
    price: 22.99,
  },
];

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible((prevState) => {
      return !prevState;
    });
  };

  // probably not the best way
  useEffect(() => {
    if (modalVisible) {
      document.getElementById("modal").style = "display: block";
      document.getElementById("backdrop").style = "display: block";
    } else {
      document.getElementById("modal").style = "display: none";
      document.getElementById("backdrop").style = "display: none";
    }
  }, [modalVisible]);

  return (
    <CartProvider>
      <Header toggleModal={toggleModal}></Header>
      <FoodList data={data}></FoodList>
      {modalVisible && (
        <Modal
          toggleModal={toggleModal}
          modalVisible={modalVisible}
          // cartItems={cartItems}
          // addCartItem={addToCartHandler}
          // removeCartItem={handleRemoveFromCart}
        ></Modal>
      )}
    </CartProvider>
  );
};

export default App;
