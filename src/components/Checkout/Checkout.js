import styles from "./Checkout.module.css";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutForm from "./CheckoutForm";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";
import Actions from "../UI/Actions";

const COUPONS = [
  {
    code: "FREE",
    discount: 1,
  },
  {
    code: "HALF",
    discount: 0.5,
  },
  {
    code: "15OFF",
    discount: 0.15,
  },
  {
    code: "FREESHIPPING",
    discount: "free-shipping",
  },
];

const Checkout = (props) => {
  const cartContext = useContext(CartContext);
  const { items } = cartContext;
  const [shippingCost, setShippingCost] = useState(0);
  const [coupon, setCoupon] = useState({
    applied: false,
    coupon: { code: "", discount: "0" },
  });
  const [checkoutTotal, setCheckoutTotal] = useState(props.total);
  const [discount, setDiscount] = useState(0);

  const handleSubmit = (costumerData) => {
    console.log("order", costumerData);
    console.log("summary", summary);
    const orderSummary = {
      costumerData,
      summary,
    };
    console.log(orderSummary);
  };

  const totalItems = items.reduce((a, i) => {
    return a + i.quantity;
  }, 0);

  const getAddress = (add) => {
    setShippingCost(+(add.length / totalItems).toFixed(2));
  };

  const summary = {
    items,
    productsTotal: props.total,
    shipping: +shippingCost.toFixed(2),
    total: +(checkoutTotal + shippingCost).toFixed(2),
    coupon: coupon.coupon.code,
    couponStatus: coupon.applied,
    discount: +discount.toFixed(2),
  };

  const handleCoupon = (code) => {
    if (COUPONS.map((coupon) => coupon.code).includes(code)) {
      const couponIndex = COUPONS.findIndex((coupon) => {
        return coupon.code === code;
      });
      setCoupon({
        applied: true,
        coupon: COUPONS[couponIndex],
      });
      if (COUPONS[couponIndex].discount === "free-shipping") {
        setDiscount(+shippingCost);
      } else {
        setDiscount(props.total * COUPONS[couponIndex].discount);
      }
    }
  };

  useEffect(() => {
    setCheckoutTotal((prevCheckoutTotal) => {
      return prevCheckoutTotal - discount;
    });
  }, [coupon, discount]);

  useEffect(() => {
    if (coupon.coupon.discount === "free-shipping") {
      setDiscount(+shippingCost);
    }
  }, [shippingCost, coupon.coupon.discount]);

  return (
    <>
      <p style={{ "text-align": "center" }}>
        Checkout form: it's almost done....
      </p>
      <div className={styles.checkout}>
        <div className={styles.container}>
          <CheckoutForm
            handleSubmit={handleSubmit}
            sendAddress={getAddress}
          ></CheckoutForm>
          <CheckoutSummary
            summary={summary}
            handleCoupon={handleCoupon}
          ></CheckoutSummary>
        </div>
        <Actions>
          <button onClick={props.goBack} value="back">
            Back
          </button>
          <button form="checkout-form" value="action">
            Place Order
          </button>
        </Actions>
      </div>
    </>
  );
};

export default Checkout;
