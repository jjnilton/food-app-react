import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import Card from "./Card";
import Cart from "../Cart/Cart";

const Backdrop = (props) => {
  const clickHandler = () => {
    props.toggleCart();
  };

  return <div onClick={clickHandler} className={styles.backdrop}></div>;
};

const Modal = (props) => {
  const handleAction = () => {
    console.log("placing order...");
  };

  console.log(props)
  console.log(props.children)

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop toggleCart={props.toggleCart} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <div className={styles.modal}>
          <Card>{props.children}</Card>
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;
