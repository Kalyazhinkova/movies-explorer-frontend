import { useState, useCallback } from 'react';

function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const input = e.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;
    setValues({ ...values, [input.name]: value });
    setErrors({ ...errors, [input.name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
}

export default useFormValidation;
