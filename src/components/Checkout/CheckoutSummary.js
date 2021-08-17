import styles from "./CheckoutSummary.module.css";
import { useRef, useState } from "react";

const CheckoutSummary = (props) => {
  const couponRef = useRef();
  const [userInteracted, setUserInteracted] = useState(false);

  const cartItems = props.summary.items.map((item) => {
    return (
      <li>
        {item.name} (x{item.quantity})
      </li>
    );
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserInteracted(true);
    props.handleCoupon(couponRef.current.value);
  };

  const handleFocus = () => {
    setUserInteracted(false);
  };

  return (
    <div className={styles.summary}>
      <div>Summary</div>
      <ul>{cartItems}</ul>
      <div className={styles["subtotal"]}>
        <div>Products</div>
        <div>${props.summary.productsTotal.toFixed(2)}</div>
      </div>
      <div className={styles["shipping"]}>
        <div>Shipping</div>
        <div>${props.summary.shipping.toFixed(2)}</div>
      </div>
      {props.summary.couponStatus && (
        <div className={styles["coupon"]}>
          <div>Discount</div>
          <div>-${props.summary.discount}</div>
        </div>
      )}
      <div className={styles["total"]}>
        <div>Total</div>
        <div>${props.summary.total.toFixed(2)}</div>
      </div>
      <form className={styles["coupon-form"]} onSubmit={handleSubmit}>
        <label htmlFor="coupon">Coupon</label>
        <div>
          <input
            className={
              !props.summary.couponStatus && userInteracted
                ? styles.invalid
                : ""
            }
            ref={couponRef}
            type="text"
            disabled={props.summary.couponStatus}
            onFocus={handleFocus}
          />
          <button disabled={props.summary.couponStatus}>Apply</button>
          {!props.summary.couponStatus && userInteracted ? <div className={styles["invalid-message"]}>Invalid coupon.</div> : ""}
        </div>
      </form>
    </div>
  );
};

export default CheckoutSummary;
