import React, { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputTextAndNumberComponent from "../InputComponent/InputTextAndNumberComponent";
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const Search = ({ productList = [] }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== "") {
      navigate(`/product?search=${searchValue}`);
    }
  };

  const handleClearInput = () => {
    setSearchValue(""); 
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const value = searchParams.get("search");
  }, [location]);

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.wrapperSearch}
      >
      <div className={styles.searchContainer}>
        <InputTextAndNumberComponent
          className={styles.inputSearch}
          onGetValue={handleSearch}
          onFocus={() => setIsInputFocused(true)} 
          value={searchValue} 
        />
        <span style={{visibility: searchValue ? 'visible' : 'hidden'  }} onClick={handleClearInput}>
          <FontAwesomeIcon icon={faCircleXmark} style={{color:'#f1cd85', position:'absolute', right:'3rem', top:'50%', transform:'translateY(-50%)', cursor:'pointer'}} />
        </span>
        <button
          type="submit"
          style={{
            backgroundColor: "transparent",
            cursor: "pointer",
            padding: "0 5px",
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {searchValue && isInputFocused && productList.length > 0 && (
        <div className={styles.wrapperItemsProduct}>
          {productList.map((product, index) => (
            <div
              className={styles.itemProduct}
              key={index}
              onClick={() => {
                navigate(`/product-details/${product.maSP}`);
                setIsInputFocused(false);
              }}
            >
              <img
                style={{ width: "40px", height: "40px", paddingLeft: "5px" }}
                src={product.anhMinhHoa}
                alt={product.tenSP}
              />
              <span className={styles.nameProduct}>{product.tenSP}</span>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default Search;
