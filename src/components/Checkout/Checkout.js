import styles from "./Checkout.module.css";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutForm from "./CheckoutForm";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";
import Actions from "../UI/Actions";

const ORDERS_URL = process.env.REACT_APP_FB_ORDERS_URL;

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
  const { items, resetCart } = cartContext;
  const [shippingCost, setShippingCost] = useState(0);
  const [coupon, setCoupon] = useState({
    applied: false,
    coupon: { code: "", discount: "0" },
  });
  const [checkoutTotal, setCheckoutTotal] = useState(props.total);
  const [discount, setDiscount] = useState(0);

  // handling checkout
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [orderId, setOrderId] = useState("");
  const [hasError, setHasError] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);

  const handleSubmit = (customerData) => {
    const orderSummary = {
      date: new Date().toISOString(),
      customer_data: customerData,
      summary,
    };

    // I wanted an id
    const getLastOrderId = async () => {
      setStatusMessage("Placing Order...");
      setIsLoading(true);
      let hasFetchedOrders = false;
      try {
        const response = await fetch(
          ORDERS_URL
        );
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const jsonData = await response.json();
        if (jsonData) {
          hasFetchedOrders = true;
          let maxId = Object.keys(jsonData)[Object.keys(jsonData).length - 1];
          maxId = jsonData[maxId].id;
          for (const order in jsonData) {
            if (jsonData[order].id > maxId) {
              maxId = jsonData[order].id;
            }
          }
          orderSummary["id"] = maxId + 1;
          setOrderId(orderSummary.id);
          setIsLoading(false);
        } else {
          setHasError(true);
          setIsLoading(false);
          setHasLoaded(true);
          setStatusMessage("Something went wrong.");
        }
      } catch (err) {
        setHasError(true);
        setHasLoaded(true);
        setIsLoading(false);
        setStatusMessage("Something went wrong.");
        console.log(err);
      }

      if (hasFetchedOrders) {
        setIsLoading(true);
        try {
          const postResponse = await fetch(ORDERS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderSummary),
          });
          if (!postResponse.ok) {
            throw new Error(
              `${postResponse.status} ${postResponse.statusText}`
            );
          } else {
            setHasPosted(true);
            setHasLoaded(true);
            setHasError(false);
            setIsLoading(false);
            // reset cart
            resetCart();
          }
        } catch (err) {
          console.log(err);
          setStatusMessage("Something went wrong.");
          setHasLoaded(true);
          setHasError(true);
          setIsLoading(false);
        }
      }
    };
    getLastOrderId();
  };

  const totalItems = items.reduce((a, i) => {
    return a + i.quantity;
  }, 0);

  const getAddress = (add) => {
    setShippingCost(+(add.length / totalItems).toFixed(2));
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

  const summary = {
    items,
    productsTotal: +props.total.toFixed(2),
    shipping: +shippingCost.toFixed(2),
    total: +(checkoutTotal + shippingCost).toFixed(2),
    coupon: coupon.coupon.code,
    couponStatus: coupon.applied,
    discount: +discount.toFixed(2),
    itemsAmount: totalItems,
  };

  const showCheckoutAgain = () => {
    setIsLoading(false);
    setHasLoaded(false);
    setHasError(false);
  };

  console.log("re-render");

  return (
    <>
      {(isLoading && !hasLoaded) || (!isLoading && hasLoaded && !hasPosted) ? (
        <div className={styles["processing-order"]}>
          <div>
            <div>{statusMessage}</div>
          </div>
          {hasError && (
            <Actions>
              <button onClick={showCheckoutAgain} value="back">
                Go back
              </button>
            </Actions>
          )}
        </div>
      ) : (
        ""
      )}
      {hasPosted && hasLoaded && !isLoading ? (
        <div className={styles["order-complete"]}>
          <div>
            <p>Order <span>#{orderId}</span> Confirmed</p>
            <p>Thank you for your order!</p>
          </div>
          <Actions>
            <button onClick={props.closeModal} value="close">
              Close
            </button>
          </Actions>
        </div>
      ) : (
        ""
      )}
      {!isLoading && !hasLoaded ? (
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
      ) : (
        ""
      )}
    </>
  );
};

export default Checkout;
