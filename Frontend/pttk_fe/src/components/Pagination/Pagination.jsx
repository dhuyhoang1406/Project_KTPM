import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Pagination.module.scss";
import React, { useState } from "react";

const Pagination = ({ itemsPerPage, onChange, amount, currentPage }) => {

  // Total number of pages
  const totalPages = Math.ceil(amount / itemsPerPage);

  const increasePage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      onChange(newPage);
    }
  };

  const decreasePage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      onChange(newPage);
    }
  };

  const renderPage = () => {
    let paginate = [];

    if (totalPages === 0) {
      paginate.push(
        <div key={"noResults"} className={styles.noResults}>
          Không có sản phẩm thỏa yêu cầu
        </div>
      );
      return paginate;
    }

    if (totalPages === 1) {
      return;
    }

    if (totalPages <= 10) {
      paginate.push(
        <button
          key={"chervonLeft"}
          className={styles.button}
          onClick={decreasePage}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      );

      paginate.push(
        Array.from({ length: totalPages }, (_, index) => (
          currentPage === index + 1 ? (
            <button
              className={styles.chooseButton}
              key={index}
              onClick={() => {
                onChange(index + 1);
              }}
            >
              {index + 1}
            </button>
          ) : (
            <button
              className={styles.button}
              key={index}
              onClick={() => {
                onChange(index + 1);
              }}
            >
              {index + 1}
            </button>
          )
        ))
      );

      paginate.push(
        <button
          key={"chervonRight"}
          className={styles.button}
          onClick={increasePage}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      );

      return paginate;
    } else {
      // Remaining code...
    }
  };

  return <div className={styles.pagination}>{renderPage()}</div>;
};

export default Pagination;