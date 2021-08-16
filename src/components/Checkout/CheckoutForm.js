import styles from "./CheckoutForm.module.css";
import { useRef, useState } from "react";
import useInput from "../../hooks/use-input";

const CheckoutForm = (props) => {
  const [checkedRadio, setCheckedRadio] = useState("credit-card");

  const [dataFilled, setDataFilled] = useState(false);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const documentRef = useRef();
  const addressRef = useRef();
  const creditCardNumberRef = useRef();
  const creditCardSecretRef = useRef();
  const creditCardExpirationRef = useRef();
  const creditCardOwnerRef = useRef();

  const {
    enteredValue: firstNameValue,
    isValid: firstNameValid,
    hasError: firstNameError,
    handleChange: firstNameChange,
    handleBlur: firstNameBlur,
  } = useInput((value) => value.trim().length > 0);

  const {
    enteredValue: lastNameValue,
    isValid: lastNameValid,
    hasError: lastNameError,
    handleChange: lastNameChange,
    handleBlur: lastNameBlur,
  } = useInput((value) => value.trim().length > 0);

  const {
    enteredValue: documentValue,
    isValid: documentValid,
    hasError: documentError,
    handleChange: documentChange,
    handleBlur: documentBlur,
  } = useInput((value) => value.trim().length > 4);

  const {
    enteredValue: addressValue,
    isValid: addressValid,
    hasError: addressError,
    handleChange: addressChange,
    handleBlur: addressBlur,
  } = useInput((value) => value.trim().length > 4);

  const {
    enteredValue: creditCardValue,
    isValid: creditCardValid,
    hasError: creditCardError,
    handleChange: creditCardChange,
    handleBlur: creditCardBlur,
  } = useInput((value) => value.trim().length >= 16);

  const {
    enteredValue: creditCardSecretValue,
    isValid: creditCardSecretValid,
    hasError: creditCardSecretError,
    handleChange: creditCardSecretChange,
    handleBlur: creditCardSecretBlur,
  } = useInput((value) => value.trim().length === 3);

  const {
    enteredValue: creditCardExpirationValue,
    isValid: creditCardExpirationValid,
    hasError: creditCardExpirationError,
    handleChange: creditCardExpirationChange,
    handleBlur: creditCardExpirationBlur,
  } = useInput((value) => value.trim().length === 5);

  const {
    enteredValue: creditCardOwnerValue,
    isValid: creditCardOwnerValid,
    hasError: creditCardOwnerError,
    handleChange: creditCardOwnerChange,
    handleBlur: creditCardOwnerBlur,
  } = useInput((value) => value.trim().length > 4);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      const customerData = {
        client: {
          firstName: firstNameValue,
          lastName: lastNameValue,
          document: documentValue,
        },
        shipping: {
          address: addressValue,
        },
        payment: {
          method: checkedRadio,
          creditCardInfo: {
            end: creditCardValue,
            expiration: creditCardExpirationValue,
            owner: creditCardOwnerValue,
          },
        },
      };
      props.handleSubmit(customerData);
    } else {
      console.log("form invalid")
    }
  };

  const handleRadioChange = (event) => {
    setCheckedRadio(event.target.value);
  };

  const handleAddressChange = (event) => {
    props.sendAddress(event.target.value);
    addressChange(event);
  };

  const handleCopyName = (event) => {
    if (event.target.checked) {
      const name = {
        target: {
          value: `${firstNameValue} ${lastNameValue}`,
        },
      };
      creditCardOwnerChange(name);
    } else {
      creditCardOwnerChange({ target: { value: "" } });
    }
  };

  const creditCardInfoValid =
    creditCardValid &&
    creditCardSecretValid &&
    creditCardExpirationValid &&
    creditCardOwnerValid;
  const isFormValid =
    firstNameValid &&
    lastNameValid &&
    documentValid &&
    addressValid &&
    creditCardInfoValid;

  return (
    <form
      id="checkout-form"
      className={styles["checkout-form"]}
      method="post"
      onSubmit={handleSubmit}
    >
      <fieldset className={styles["client-info"]}>
        <legend>User information</legend>
        <div className={styles["first-and-second-name"]}>
          <div>
            <label htmlFor="first-name">First Name</label>
            <input
              className={firstNameError && styles.invalid}
              ref={firstNameRef}
              name="first-name"
              type="text"
              value={firstNameValue}
              onChange={firstNameChange}
              onBlur={firstNameBlur}
            />
          </div>
          <div>
            <label htmlFor="last-name">Last Name</label>
            <input
              className={lastNameError && styles.invalid}
              ref={lastNameRef}
              name="last-name"
              type="text"
              value={lastNameValue}
              onChange={lastNameChange}
              onBlur={lastNameBlur}
            />
          </div>
        </div>
        <label htmlFor="document">Document</label>
        <input
          className={documentError && styles.invalid}
          ref={documentRef}
          name="document"
          type="text"
          value={documentValue}
          onChange={documentChange}
          onBlur={documentBlur}
        />
      </fieldset>
      <fieldset className={styles["address-info"]}>
        <legend>Delivery info</legend>
        <label htmlFor="address">Address</label>
        <input
          className={addressError && styles.invalid}
          ref={addressRef}
          name="address"
          type="text"
          value={addressValue}
          onChange={handleAddressChange}
          onBlur={addressBlur}
        />
      </fieldset>
      <fieldset className={styles["payment-info"]}>
        <legend>Payment information</legend>
        <div className={styles["payment-options"]}>
          <input
            type="radio"
            name="payment-method"
            id="credit-card"
            value="credit-card"
            onChange={handleRadioChange}
            checked={checkedRadio === "credit-card"}
          />
          <label htmlFor="credit-card">Credit card</label>
          <input
            type="radio"
            name="payment-method"
            id="libera-pay"
            value="libera-pay"
            onChange={handleRadioChange}
            checked={checkedRadio === "libera-pay"}
          />
          <label htmlFor="libera-pay">LiberaPay</label>
        </div>
        {checkedRadio === "credit-card" && (
          <div className={styles["credit-card-info"]}>
            <label htmlFor="credit-card-number">Number</label>
            <input
              className={creditCardError && styles.invalid}
              ref={creditCardNumberRef}
              name="credit-card-number"
              type="text"
              onChange={creditCardChange}
              onBlur={creditCardBlur}
              value={creditCardValue}
            />
            <div className={styles["secret-and-expiration"]}>
              <div>
                <label htmlFor="credit-card-secret">Secret</label>
                <input
                  className={creditCardSecretError && styles.invalid}
                  ref={creditCardSecretRef}
                  name="credit-card-secret"
                  type="text"
                  maxLength="3"
                  onChange={creditCardSecretChange}
                  onBlur={creditCardSecretBlur}
                  value={creditCardSecretValue}
                />
              </div>
              <div>
                <label htmlFor="expiration-date">Expiration Date</label>
                <input
                  className={creditCardExpirationError && styles.invalid}
                  ref={creditCardExpirationRef}
                  name="expiration-date"
                  type="text"
                  placeholder="YY/mm"
                  maxLength="5"
                  onChange={creditCardExpirationChange}
                  onBlur={creditCardExpirationBlur}
                  value={creditCardExpirationValue}
                />
              </div>
            </div>
            <label htmlFor="card-owner">Name</label>
            <input name="same-name" type="checkbox" onChange={handleCopyName} />
            <label htmlFor="same-name">Same as client</label>
            <input
              className={creditCardOwnerError && styles.invalid}
              ref={creditCardOwnerRef}
              name="card-owner"
              type="text"
              value={creditCardOwnerValue}
              onChange={creditCardOwnerChange}
              onBlur={creditCardOwnerBlur}
            />
          </div>
        )}
        {checkedRadio === "libera-pay" && (
          <div>
            <p>
              You will be redirected to the page after completing the order.
            </p>
          </div>
        )}
      </fieldset>
    </form>
  );
};

export default CheckoutForm;
