import { useState } from "react";

const useInput = (validator) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [userInteracted, setUserInteracted] = useState(false);

  const isValid = validator(enteredValue);
  const hasError = userInteracted && !isValid;

  const handleChange = (event) => {
    setUserInteracted(false);
    setEnteredValue(event.target.value);
  };

  const handleBlur = (event) => {
    setUserInteracted(true);
    setEnteredValue(event.target.value);
  };

  return {
    enteredValue,
    isValid,
    hasError,
    handleChange,
    handleBlur,
  };
};

export default useInput;
