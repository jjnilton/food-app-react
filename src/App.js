import { useState, useEffect } from "react";
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

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const addToCartHandler = (cartFoodObject, quantity = 1) => {
    if (quantity > 0) {
      setCartItems((prevCartItems) => {
        const elementIndex = prevCartItems.findIndex((item) => {
          return cartFoodObject.id === item.id;
        });

        if (elementIndex !== -1) {
          const prevCartItemsCopy = [...prevCartItems];
          prevCartItemsCopy[elementIndex] = {
            ...prevCartItemsCopy[elementIndex],
            quantity: prevCartItemsCopy[elementIndex].quantity + quantity,
          };
          return prevCartItemsCopy;
        } else {
          return [...prevCartItems, { ...cartFoodObject, quantity: quantity }];
        }
      });
    }
  };

  const handleRemoveFromCart = (cartItem, quantity = 1) => {
    setCartItems((prevCartItems) => {
      const elementIndex = prevCartItems.findIndex((item) => {
        return cartItem.id === item.id;
      });

      if (elementIndex !== -1 && cartItem.quantity > 1) {
        const prevCartItemsCopy = [...prevCartItems];
        prevCartItemsCopy[elementIndex] = {
          ...prevCartItemsCopy[elementIndex],
          quantity: prevCartItemsCopy[elementIndex].quantity - quantity,
        };
        return prevCartItemsCopy;
      } else {
        const filteredArray = prevCartItems.filter((item) => {
          return item.id !== cartItem.id;
        });
        return filteredArray;
      }
    });
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
