import React, { useState } from 'react';

const InputNumberComponent = ({style, type = 'text', placeholder = '1', ...rest }) => {
  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ') && !searchValue.startsWith(0)) {
      setSearchValue(searchValue);
    }
  };

  const validateInput = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
  // khi phím được nhấn không phải là số, backspace
  // cho phép quét khối
    if (!/^\d$/.test(keyValue) && keyCode !== 8 && !e.target.selectionStart) {
      e.preventDefault();
      setSearchValue(e.target.value);
    }
  };

  const [searchValue, setSearchValue] = useState(1);

  return (
    <input
    style={style}
      type={type}
      value={searchValue}
      placeholder={placeholder}
      spellCheck={false}
      onChange={handleChange}
      onKeyDown={validateInput}
      {...rest}
    />
  );
};

export default InputNumberComponent;