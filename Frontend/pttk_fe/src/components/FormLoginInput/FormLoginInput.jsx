import React from "react";
import styles from "./FormLoginInput.module.scss";

const FormLoginInput = ({
  label,
  labelUppercase,
  placeholder,
  message,
  type = 'text',
  value,
  ...rest
}) => {

  return (
    <div className={styles.formGroup}>
      <label htmlFor={label} className={styles.formLabel}>
        {labelUppercase}
      </label>
      <input
        id={label}
        name={label}
        type={type}
        placeholder={placeholder}
        className={styles.formControl}
        value={value}
        {...rest}
      />
      <span className={styles.formMessage}>{message}</span>
    </div>
  );
};

export default FormLoginInput;
