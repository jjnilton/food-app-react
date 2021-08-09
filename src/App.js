import { useState, useEffect, useReducer } from "react";
import Header from "./components/UI/Header";
import FoodList from "./components/Food/FoodList";
import Modal from "./components/UI/Modal";

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

const cartReducer = (state, action) => {
  const elementIndex = state.findIndex(item => item.id === action.item.id)
  if (action.type === "ADD") {
    // this validation should be on the form...
    if (action.quantity > 0) {
      // increase amount if item exists
      if (elementIndex !== -1) {
        const updatedItems = [...state]
        updatedItems[elementIndex] = {...updatedItems[elementIndex], quantity: updatedItems[elementIndex].quantity + action.quantity}
        return updatedItems
      } else {
        // add new item
        return [...state, {...action.item, quantity: action.quantity}]
      }
    }
  }
  if (action.type === "DEL") {
    // decrease item amount if quantity > 1
    if (elementIndex !== -1 && action.item.quantity > 1) {
      const updatedItems = [...state]
      updatedItems[elementIndex] = {...updatedItems[elementIndex], quantity: updatedItems[elementIndex].quantity - action.quantity}
      return updatedItems
    } else {
      // remove item from cart
      const updatedItems = state.filter(item => item.id !== action.item.id)
      return updatedItems
    }
  }
  return [];
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cartItems, dispatchCartItems] = useReducer(cartReducer, []);

  const addToCartHandler = (cartFoodObject, quantity = 1) => {
    dispatchCartItems({ type: "ADD", item: cartFoodObject, quantity: quantity });
  };

  const handleRemoveFromCart = (cartFoodObject, quantity = 1) => {
    dispatchCartItems({ type: "DEL", item: cartFoodObject, quantity: quantity});
  };

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
    <>
      <Header cartItems={cartItems} toggleModal={toggleModal}></Header>
      <FoodList data={data} onAddToCart={addToCartHandler}></FoodList>
      {modalVisible && (
        <Modal
          toggleModal={toggleModal}
          modalVisible={modalVisible}
          cartItems={cartItems}
          addCartItem={addToCartHandler}
          removeCartItem={handleRemoveFromCart}
        ></Modal>
      )}
    </>
  );
};

export default App;
