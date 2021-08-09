import CartContext from "./cart-context";
import { useReducer } from "react";

const cartReducer = (state, action) => {
  const elementIndex = state.findIndex((item) => item.id === action.item.id);
  if (action.type === "ADD") {
    // this validation should be on the form...
    if (action.quantity > 0) {
      // increase amount if item exists
      if (elementIndex !== -1) {
        const updatedItems = [...state];
        updatedItems[elementIndex] = {
          ...updatedItems[elementIndex],
          quantity: updatedItems[elementIndex].quantity + action.quantity,
        };
        return updatedItems;
      } else {
        // add new item
        return [...state, { ...action.item, quantity: action.quantity }];
      }
    }
  }
  if (action.type === "DEL") {
    // decrease item amount if quantity > 1
    if (elementIndex !== -1 && action.item.quantity > 1) {
      const updatedItems = [...state];
      updatedItems[elementIndex] = {
        ...updatedItems[elementIndex],
        quantity: updatedItems[elementIndex].quantity - action.quantity,
      };
      return updatedItems;
    } else {
      // remove item from cart
      const updatedItems = state.filter((item) => item.id !== action.item.id);
      return updatedItems;
    }
  }
  return [];
};

const CartProvider = (props) => {
  const [cartItems, dispatchCartItems] = useReducer(cartReducer, []);

  const addToCartHandler = (cartFoodObject, quantity = 1) => {
    dispatchCartItems({
      type: "ADD",
      item: cartFoodObject,
      quantity: quantity,
    });
  };

  const handleRemoveFromCart = (cartFoodObject, quantity = 1) => {
    dispatchCartItems({
      type: "DEL",
      item: cartFoodObject,
      quantity: quantity,
    });
  };

  const cartContext = {
    items: cartItems,
    addToCart: addToCartHandler,
    delFromCart: handleRemoveFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
