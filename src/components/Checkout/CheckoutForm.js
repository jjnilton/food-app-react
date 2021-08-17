import styles from "./CheckoutForm.module.css";
import { useRef, useState } from "react";
import useInput from "../../hooks/use-input";

const CheckoutForm = (props) => {
  const [checkedRadio, setCheckedRadio] = useState("credit-card");
  const firstNameRef = useRef();
  const lastNameRef = useRef();

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
      firstNameBlur();
      lastNameBlur();
      documentBlur();
      addressBlur();
      creditCardBlur();
      creditCardSecretBlur();
      creditCardExpirationBlur();
      creditCardOwnerBlur();
    }
  };

  const handleRadioChange = (event) => {
    setCheckedRadio(event.target.value);
  };

  const handleAddressChange = (event) => {
    props.sendAddress(event.target.value);
    addressChange(event);
  };

  const handleCheckbox = (event) => {
    if (event.target.checked) {
      creditCardOwnerChange({
        target: { value: `${firstNameValue} ${lastNameValue}` },
      });
      creditCardOwnerBlur();
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
              className={firstNameError ? styles.invalid : undefined}
              ref={firstNameRef}
              name="first-name"
              type="text"
              value={firstNameValue}
              onChange={firstNameChange}
              onBlur={firstNameBlur}
            />
            {firstNameError && (
              <div className={styles["invalid-message"]}>Invalid name.</div>
            )}
          </div>
          <div>
            <label htmlFor="last-name">Last Name</label>
            <input
              className={lastNameError ? styles.invalid : undefined }
              ref={lastNameRef}
              name="last-name"
              type="text"
              value={lastNameValue}
              onChange={lastNameChange}
              onBlur={lastNameBlur}
            />
            {lastNameError && (
              <div className={styles["invalid-message"]}>
                Invalid last name.
              </div>
            )}
          </div>
        </div>
        <label htmlFor="document">Document</label>
        <input
          className={documentError ? styles.invalid : undefined}
          name="document"
          type="text"
          value={documentValue}
          onChange={documentChange}
          onBlur={documentBlur}
        />
        {documentError && (
          <div className={styles["invalid-message"]}>Invalid document.</div>
        )}
      </fieldset>
      <fieldset className={styles["address-info"]}>
        <legend>Delivery info</legend>
        <label htmlFor="address">Address</label>
        <input
          className={addressError ? styles.invalid : undefined}
          name="address"
          type="text"
          value={addressValue}
          onChange={handleAddressChange}
          onBlur={addressBlur}
        />
        {addressError && (
          <div className={styles["invalid-message"]}>Invalid address.</div>
        )}
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
              className={creditCardError ? styles.invalid : undefined}
              name="credit-card-number"
              type="text"
              onChange={creditCardChange}
              onBlur={creditCardBlur}
              value={creditCardValue}
            />
            {creditCardError && (
              <div className={styles["invalid-message"]}>
                Invalid credit card number.
              </div>
            )}
            <div className={styles["secret-and-expiration"]}>
              <div>
                <label htmlFor="credit-card-secret">Secret</label>
                <input
                  className={creditCardSecretError ? styles.invalid : undefined}
                  name="credit-card-secret"
                  type="text"
                  maxLength="3"
                  onChange={creditCardSecretChange}
                  onBlur={creditCardSecretBlur}
                  value={creditCardSecretValue}
                />
                {creditCardSecretError && (
                  <div className={styles["invalid-message"]}>
                    Invalid card secret.
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="expiration-date">Expiration Date</label>
                <input
                  className={creditCardExpirationError ? styles.invalid : undefined}
                  name="expiration-date"
                  type="text"
                  placeholder="YY/mm"
                  maxLength="5"
                  onChange={creditCardExpirationChange}
                  onBlur={creditCardExpirationBlur}
                  value={creditCardExpirationValue}
                />
                {creditCardSecretError && (
                  <div className={styles["invalid-message"]}>
                    Invalid expiration.
                  </div>
                )}
              </div>
            </div>
            <div className={styles["credit-card-owner-container"]}>
              <label htmlFor="card-owner">Name</label>
              <div>
                <input
                  name="same-name"
                  type="checkbox"
                  onChange={handleCheckbox}
                />
                <label className={styles["same-name"]} htmlFor="same-name">
                  Copy from user info
                </label>
              </div>
            </div>
            <input
              className={creditCardOwnerError ? styles.invalid : undefined}
              name="card-owner"
              type="text"
              value={creditCardOwnerValue}
              onChange={creditCardOwnerChange}
              onBlur={creditCardOwnerBlur}
            />
            {creditCardOwnerError && (
              <div className={styles["invalid-message"]}>
                Invalid credit card name.
              </div>
            )}
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
