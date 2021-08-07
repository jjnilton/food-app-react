import styles from "./Button.module.css";

const Button = (props) => {
  return <button className={styles.button} type={props.type} onClick={props.action}>{props.value}</button>;
};

export default Button;