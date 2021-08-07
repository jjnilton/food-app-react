import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import Card from "./Card";
import Cart from "../Cart/Cart";

const Backdrop = (props) => {
  const clickHandler = () => {
    props.toggleModal();
  };

  return <div onClick={clickHandler} className={styles.backdrop}></div>;
};

const Modal = (props) => {
  const handleAction = () => {
    console.log("placing order...");
    console.log(props.cartItems);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop toggleModal={props.toggleModal} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <div className={styles.modal}>
          <Card>
            <Cart
              cartItems={props.cartItems}
              addCartItem={props.addCartItem}
              removeCartItem={props.removeCartItem}
            ></Cart>
            <div className={styles["button-container"]}>
              <button className={styles.close} onClick={props.toggleModal}>Close</button>
              <button className={styles.action} onClick={handleAction}>Order</button>
            </div>
          </Card>
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;
