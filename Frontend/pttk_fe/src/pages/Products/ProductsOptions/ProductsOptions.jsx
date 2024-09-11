import React, { useEffect, useState } from "react";
import styles from "./ProductsOptions.module.scss";
import Product from "./Product/Product";
import Pagination from "../../../components/Pagination/Pagination";
import * as ProductService from "../../../services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetSort } from "../../../redux/slides/sortSlide";

const ProductsOptions = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const sortValue = useSelector((state) => state.sort);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const dispatch = useDispatch()

  const fetchAPiProduct = async () => {
    try {
      const res = await ProductService.getAllProductForUser();
      if (res?.data?.content) {
        setProducts(res.data.content);
      }
    } catch (error) {
      console.error("Lỗi: ", error);
    }
  };

  useEffect(() => {
    fetchAPiProduct();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get('search');
    setSearchQuery(searchValue || ''); // Thiết lập searchQuery hoặc chuỗi rỗng nếu không có giá trị
  }, [location]);

  useEffect(() => {
    if (products.length > 0) {
      let sorted = [...products];

      // Kiểm tra và thực hiện sắp xếp nếu có lựa chọn sắp xếp
      if(sortOption === "allProduct"){
        dispatch(resetSort())
      }else if (sortOption === "lowToHigh") {
        sorted.sort((a, b) => a.gia - b.gia);
      } else if (sortOption === "highToLow") {
        sorted.sort((a, b) => b.gia - a.gia);
      }

      // Lọc sản phẩm dựa trên các yêu cầu
      let filteredProducts = sorted.filter((product) => {
        let flag = true;

        // Lọc theo nồng độ
        if (
          sortValue.concentrationSelected &&
          sortValue.concentrationSelected !== ""
        ) {
          setSearchQuery('')
          if (sortValue.concentrationSelected === "Trên 60") {
            flag = flag && product.nongDoCon > 60;
          } else if (sortValue.concentrationSelected === "Dưới 20") {
            flag = flag && product.nongDoCon < 20;
          } else {
            const concentrationRange =
              sortValue.concentrationSelected.split(" - ");
            const minConcentration = parseInt(concentrationRange[0]);
            const maxConcentration = parseInt(concentrationRange[1]);

            flag =
              flag &&
              product.nongDoCon >= minConcentration &&
              product.nongDoCon < maxConcentration;
          }
        }

        // Lọc theo dung tích
        if (sortValue.capacitySelected && sortValue.capacitySelected !== "") {
          setSearchQuery('')
          if (sortValue.capacitySelected === "Trên 2000ML") {
            flag = flag && product.theTich >= 2000;
          } else {
            const capacityRange = sortValue.capacitySelected.split(" - ");
            const minCapacity = parseInt(capacityRange[0].replace("ML", ""));
            const maxCapacity = parseInt(capacityRange[1].replace("ML", ""));
            flag =
              flag &&
              product.theTich >= minCapacity &&
              product.theTich < maxCapacity;
          }
        }

        // Lọc theo thương hiệu
        if (sortValue.brandSelected && sortValue.brandSelected !== "") {
          setSearchQuery('')
          flag = flag && product.tenLoaiSanPham === sortValue.brandSelected;
        }

        //loc theo gia
          if (sortValue.PriceSelected && sortValue.PriceSelected !== "") {
            setSearchQuery('');
            const productPrice = parseFloat(product.gia);

            if (sortValue.PriceSelected === "Trên 3.000.000đ") {
              flag = flag && productPrice > 3000000;
            } else if (sortValue.PriceSelected === "Dưới 500.000đ") {
              flag = flag && productPrice < 500000;
            } else if (sortValue.PriceSelected === "500.000đ - 1.000.000đ") {
              flag = flag && productPrice >= 500000 && productPrice <= 1000000;
            } else if (sortValue.PriceSelected === "1.000.000đ - 3.000.000đ") {
              flag = flag && productPrice >= 1000000 && productPrice <= 3000000;
            }
          }

        // Lọc theo từ khóa tìm kiếm
        if (searchQuery !== '' && !product.tenSP.toLowerCase().includes(searchQuery.toLowerCase())) {
          flag = false;
        }
        
        return flag;
      });

      setSortedProducts(filteredProducts);
    }
    if(sortedProducts.length > 0) {
      setCurrentPage(1)
    }
  }, [
    sortOption,
    products,
    sortValue.concentrationSelected,
    sortValue.capacitySelected,
    sortValue.brandSelected,
    sortValue.PriceSelected,
    searchQuery
  ]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrapper}>
        <select className={styles.select} onChange={handleSortChange}>
          <option value="default" defaultValue={true}>
            Thứ tự mặc định
          </option>
          <option value="lowToHigh">Theo thứ tự giá: Thấp đến cao</option>
          <option value="highToLow">Theo thứ tự giá: Cao đến thấp</option>
          <option value="allProduct">Tất cả sản phẩm</option>
        </select>
      </div>
      <div className={styles.products}>
        {currentItems.map((product) => (
          <Product key={product.maSP} product={product} />
        ))}
      </div>
      <Pagination
        amount={sortedProducts.length}
        key={"paginate"}
        itemsPerPage={itemsPerPage}
        onChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductsOptions;
