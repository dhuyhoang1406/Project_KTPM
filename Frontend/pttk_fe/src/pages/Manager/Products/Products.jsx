import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import StaffPagination from "../../../layouts/components/Staff/StaffPagination/StaffPagination";
import Table from "./Table/Table";
import { useNavigate } from "react-router-dom";
import { getAllProduct } from "../../../services/ProductService";
import useDebounce from "../../../hooks/useDebounce";
import {
  getAllCategories,
  getAllCategoriesWithOutPageable,
} from "../../../services/CategoriesService";
const Products = ({ isCEO }) => {
  const [change, setChange] = useState(false);
  const [amount, setAmount] = useState(0);
  const [page, setPage] = useState(1);
  const [volume, setVolume] = useState("0");
  const [concentration, setConcentration] = useState("0");
  const [categories, setCategories] = useState([]);
  const [chooseCategory, setChooseCategory] = useState("");
  const [price, setPrice] = useState("0");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const debouncedSearch = useDebounce(search, 500);
  const navigate = useNavigate();
  const handleChange = () => {
    setChange(!change);
  };
  const handleReset = () => {
    setSearch("")
    setConcentration("0");
    setVolume("0");
    setPrice("0");
    setChooseCategory("");
    setPage(1);
    setChange(!change);
    document.getElementById("concentration-select").value = "0";
    document.getElementById("volume-select").value = "0";
    document.getElementById("price-select").value = "0";
    document.getElementById("category-select").value = "";
  };

  useEffect(() => {
    const theTichMin =
      volume === "0"
        ? null
        : volume === "1"
        ? 0
        : volume === "2"
        ? 250
        : volume === "3"
        ? 500
        : 1000;
    const theTichMax =
      volume === "0"
        ? null
        : volume === "1"
        ? 250
        : volume === "2"
        ? 500
        : volume === "3"
        ? 1000
        : 1500;
    const nongDoMin =
      concentration === "0"
        ? null
        : concentration === "1"
        ? 0
        : concentration === "2"
        ? 20
        : concentration === "3"
        ? 40
        : 60;
    const nongDoMax =
      concentration === "0"
        ? null
        : concentration === "1"
        ? 20
        : concentration === "2"
        ? 40
        : concentration === "3"
        ? 60
        : 100;
    const giaMin =
      price === "0"
        ? null
        : price === "1"
        ? 0
        : price === "2"
        ? 500000
        : price === "3"
        ? 1000000
        : 3000000;
    const giaMax =
      price === "0"
        ? null
        : price === "1"
        ? 500000
        : price === "2"
        ? 1000000
        : price === "3"
        ? 3000000
        : 12000000;
    getAllProduct(
      debouncedSearch,
      page,
      30,
      theTichMin,
      theTichMax,
      nongDoMin,
      nongDoMax,
      giaMin,
      giaMax,
      chooseCategory
    ).then((res) => {
      setAmount(res.data.totalElements);
      setProducts(res.data.content);
    });
  }, [
    page,
    debouncedSearch,
    volume,
    concentration,
    price,
    change,
    chooseCategory,
  ]);
  useEffect(() => {
    getAllCategoriesWithOutPageable().then((res) => {
      setCategories(res.data);
    });
  }, []);
  return (
    <div className={styles.wrapper}>
      <div
        style={{ display: "flex", paddingTop: "1rem", paddingBottom: "1rem" }}
      >
        <h2>Sản Phẩm</h2>
        <button
          style={{
            marginLeft: "auto",
            fontFamily: "Arial",
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "white",
            backgroundColor: "rgb(65, 64, 64)",
            padding: "1rem",
            borderRadius: "0.6rem",
            cursor: "pointer",
          }}
          onClick={() => {
            isCEO !== "CEO"
              ? navigate("/system/manager/products/add")
              : navigate("/system/ceo/products/add");
          }}
        >
          Tạo Sản Phẩm
        </button>
      </div>
      <div className={styles.boxFeature}>
        <div style={{ position: "relative" }}>
          <FontAwesomeIcon className={styles.icon} icon={faSearch} />
          <input
            value={search}
            className={styles.input}
            style={{ width: "30rem" }}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm kiếm sản phẩm"
          />
        </div>
        <select
          id="concentration-select"
          onChange={(event) => setConcentration(event.target.value)}
          style={{ height: "3rem", padding: "0.3rem" }}
        >
          <option value={0}>Mặc Định</option>
          <option value={1}>Dưới 20%</option>
          <option value={2}>20%-40%</option>
          <option value={3}>40%-60%</option>
          <option value={4}>Trên 60%</option>
        </select>
        <select
          id="volume-select"
          onChange={(event) => setVolume(event.target.value)}
          style={{ height: "3rem", padding: "0.3rem" }}
        >
          <option value={0}>Mặc Định</option>
          <option value={1}>Dưới 250ML</option>
          <option value={2}>250ML-500ML</option>
          <option value={3}>500ML-1L</option>
          <option value={4}>Trên 1L</option>
        </select>
        <select
          id="price-select"
          onChange={(event) => setPrice(event.target.value)}
          style={{ height: "3rem", padding: "0.3rem" }}
        >
          <option value={0}>Mặc Định</option>
          <option value={1}>Dưới 500k</option>
          <option value={2}>500k-1tr</option>
          <option value={3}>1tr-3tr</option>
          <option value={4}>Trên 3tr</option>
        </select>
        <select
          id="category-select"
          onChange={(event) => setChooseCategory(event.target.value)}
          style={{ height: "3rem", padding: "0.3rem" }}
        >
          <option value="">Mặc định</option>
          {categories?.map((category) => (
            <option
              value={category.tenLoaiSanPham}
              key={category.tenLoaiSanPham}
            >
              {category.tenLoaiSanPham}
            </option>
          ))}
        </select>
        <button
          onClick={handleReset}
          style={{
            marginLeft: "1rem",
            height: "3rem",
            padding: "2rem",
            cursor: "pointer",
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            background:'#333',
            color:'#fff',
            borderRadius: "1rem",
            fontWeight:'bold'
          }}
        >
          Reset
        </button>
        {amount !== 0 && (
          <div style={{ marginLeft: "auto" }}>
            <StaffPagination
              onChange={setPage}
              itemsPerPage={30}
              amount={amount}
            />
          </div>
        )}
      </div>

      <div className={styles.boxTable}>
        <Table
          isCEO={isCEO}
          heads={[
            "Mã",
            "Ảnh",
            "Tên",
            "Loại",
            "Giá Tiền",
            "Nồng Độ",
            "Thể Tích",
            "Xuất xứ",
            "Thương Hiệu",
            "Số lượng",
            "Thao tác",
          ]}
          bodys={products}
          setChange={handleChange}
        />
      </div>
    </div>
  );
};
export default Products;
