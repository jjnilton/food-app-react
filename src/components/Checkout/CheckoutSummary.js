import styles from "./CheckoutSummary.module.css";
import { useRef, useState } from "react";

const CheckoutSummary = (props) => {
  const couponRef = useRef();
  const [userInteracted, setUserInteracted] = useState(false);

  const cartItems = props.summary.items.map((item) => {
    return (
      <li className={styles.list} key={item.id}>
        <div>{item.name}</div>
        <div>${item.price.toFixed(2)}</div>
        <div>x{item.quantity}</div>
        <div>${(item.price * item.quantity).toFixed(2)}</div>
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
      <div>
        <h2>Summary</h2>
      </div>
      <ul>
        <div className={styles["list-header"]}>
          <div>Item</div>
          <div>Price</div>
          <div>Qty</div>
          <div>Subtotal</div>
        </div>
        {cartItems}
      </ul>
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
          <div>-${props.summary.discount.toFixed(2)}</div>
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
                : undefined
            }
            ref={couponRef}
            type="text"
            disabled={props.summary.couponStatus}
            onFocus={handleFocus}
          />
          <button disabled={props.summary.couponStatus}>Apply</button>
          {!props.summary.couponStatus && userInteracted ? (
            <div className={styles["invalid-message"]}>Invalid coupon.</div>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckoutSummary;
