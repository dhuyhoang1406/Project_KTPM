import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearProducts, searchProducts } from '../../redux/slides/productSlide';

const InputTextAndNumberComponent = ({type = 'text', placeholder = 'Find your perfect bottle...',  onGetValue,styles, ...rests }) => {

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const searchValue = e.target.value;
    onGetValue(searchValue)
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
    if (searchValue === '') {
      dispatch(clearProducts()); // Gọi action clearProducts nếu giá trị input bị xóa hết
    } else {
      dispatch(searchProducts(searchValue));
    }
    dispatch(searchProducts(searchValue))
  };

  const [searchValue, setSearchValue] = useState('');

  return (
    <input
    style={styles}
      type={type}
      value={searchValue}
      placeholder={placeholder}
      spellCheck={false}
      onChange={handleChange}
      {...rests}
    />
  );
};

export default InputTextAndNumberComponent;