import { useState, useEffect } from "react";
import Header from "./components/UI/Header";
import FoodList from "./components/Food/FoodList";
import Modal from "./components/UI/Modal";
import CartProvider from "./store/CartProvider";
import styles from "./App.module.css";

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
      <main className={styles.main}>
        <FoodList></FoodList>
      </main>
      {modalVisible && (
        <Modal toggleModal={toggleModal} modalVisible={modalVisible}></Modal>
      )}
    </CartProvider>
  );
};

export default App;
