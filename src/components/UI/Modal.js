import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import Card from "./Card";

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

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop toggleCart={props.toggleCart} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <div className={styles.modal}>
          <Card>
            {props.children}
          </Card>
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;
