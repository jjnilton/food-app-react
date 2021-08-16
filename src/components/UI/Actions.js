import styles from "./Actions.module.css";

const Actions = (props) => {
  return (
    <div className={styles.actions}>
      {props.children}
    </div>
  );
};

export default Actions;