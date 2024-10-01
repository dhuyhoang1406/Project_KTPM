import React, { useEffect, useRef, useState } from "react";
import styles from "./ProductsAdjust.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Select from "../../../../components/Select/Select";
import {
  getAllCategories,
  getAllCategoriesWithOutPageable,
} from "../../../../services/CategoriesService";
import {
  createProduct,
  getDetailsProduct,
  updateProduct,
} from "../../../../services/ProductService";
import { error, success } from "../../../../components/Message/Message";
const ProductsAdjust = ({ isCEO }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const imageRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    name: "",
    concentration: "",
    volume: "",
    price: "",
    origin: "",
    label: "",
    category: {
      maLoaiSanPham: "",
      tenLoaiSanPham: "",
    },
  });
  const handleCategoryChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10); // Chuyển đổi sang số
    const selectedCategory = categories.find(
      (cat) => cat.maLoaiSanPham === selectedValue
    );
    console.log("Selected Value:", selectedValue);
    console.log("Selected Category:", selectedCategory);
    setData({
      ...data,
      category: selectedCategory || { maLoaiSanPham: "", tenLoaiSanPham: "" },
    });
  };

  const validProduct = () => {
    if (
      data.name === "" ||
      data.volume === "" ||
      data.concentration === "" ||
      data.price === "" ||
      data.origin === "" ||
      data.label === "" ||
      data.category.maLoaiSanPham === "" ||
      data.category.tenLoaiSanPham === ""
    ) {
      error("Vui lòng không để trống bất kì trường nào");
      return false;
    }
    if (!selectedImage) {
      return false;
    }
    const namePattern = /^[^\s][\p{L}\s]+$/u;
    if (!namePattern.test(data.origin)) {
      error(
        "Xuất xứ chỉ được chứa chữ cái và không bắt đầu bằng khoảng trắng!"
      );
      return;
    }
    if (data.concentration > 70) {
      error("Nồng độ cồn không vượt quá 70%!");
      return;
    }
    for (let key in data) {
      if (data.hasOwnProperty("category")) {
        if (
          data.category.maLoaiSanPham === "" ||
          data.category.tenLoaiSanPham === ""
        ) {
          return false;
        }
      } else {
        if (data[key] === "") {
          return false;
        }
      }
    }
    return true;
  };

  const handleConcentrationChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) && (value === "" || !value.startsWith("0"))) {
      setData({ ...data, concentration: value });
    }
  };

  const handleVolumeChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) && (value === "" || !value.startsWith("0"))) {
      setData({ ...data, volume: value });
    }
  };

  const handleSubmit = async () => {
    if (validProduct(data)) {
      if (id) {
        await updateProduct(id, {
          tenSP: data.name,
          xuatXu: data.origin,
          theTich: data.volume,
          nongDoCon: data.concentration,
          // gia: data.price,
          thuongHieu: data.label,
          anhMinhHoa: selectedImage,
          maLoaiSanPham: data.category.maLoaiSanPham,
        });
      } else {
        await createProduct({
          tenSP: data.name,
          xuatXu: data.origin,
          theTich: data.volume,
          nongDoCon: data.concentration,
          // gia: parseInt(0),
          thuongHieu: data.label,
          anhMinhHoa: selectedImage,
          maLoaiSanPham: data.category.maLoaiSanPham,
        });
      }
    } else {
      // error("Các thông tin sản phẩm không được để trống");
    }
  };
  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Định dạng ảnh không phù hợp");
    }
  };
  useEffect(() => {
    if (id) {
      getDetailsProduct(id).then((res) => {
        setSelectedImage(res.data.anhMinhHoa);
        setData({
          name: res.data.tenSP,
          volume: res.data.theTich,
          concentration: res.data.nongDoCon,
          price: res.data.gia,
          label: res.data.thuongHieu,
          origin: res.data.xuatXu,
          category: {
            maLoaiSanPham: res.data.maLoaiSanPham,
            tenLoaiSanPham: res.data.tenLoaiSanPham,
          },
        });
      });
    }
    getAllCategoriesWithOutPageable()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);
  return (
    <div className={styles.wrapper}>
      <div
        style={{
          display: "flex",
          paddingTop: "1rem",
          alignItems: "center",
          gap: "1rem",
          paddingBottom: "1rem",
        }}
      ></div>
      <div className={styles.boxFeature}>
        <div>
          <h2 style={{ fontSize: "2.3rem" }}>Sản phẩm</h2>
          <p style={{ fontSize: "1.1rem", fontWeight: "700" }}>
            Sản Phẩm / Xem và chỉnh sửa
          </p>
        </div>
        <div>
          <button
            style={{
              fontFamily: "Arial",
              fontSize: "1.5rem",
              fontWeight: "700",
              border: "1px solid rgb(140,140,140)",
              backgroundColor: "white",
              color: "rgb(80,80,80)",
              padding: "1rem 2rem 1rem 2rem",
              borderRadius: "0.6rem",
              cursor: "pointer",
            }}
            onClick={() => {
              isCEO !== "CEO"
                ? navigate("/system/manager/products")
                : navigate("/system/ceo/products");
            }}
          >
            Hủy
          </button>
          <button
            style={{
              marginLeft: "1rem",
              fontFamily: "Arial",
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "white",
              backgroundColor: "rgb(65, 64, 64)",
              padding: "1rem 2rem 1rem 2rem",
              borderRadius: "0.6rem",
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            Lưu
          </button>
        </div>
      </div>
      <div className={styles.boxTable}>
        <h2>Thông Tin Sản Phẩm</h2>
        <div
          style={{
            display: "flex",
            padding: "0rem 1rem 0rem 1rem",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ fontWeight: "700", fontSize: "2rem" }}>
              Chi tiết Sản Phẩm
            </p>
            <div style={{ paddingLeft: "1rem" }}>
              <p className={styles.text}>Tên Sản Phẩm</p>
              {id ? (
                <span
                  className={styles.input}
                  style={{ width: "40rem", border: "none" }}
                >
                  {data.name}
                </span>
              ) : (
                <>
                  <input
                    className={styles.input}
                    value={data.name}
                    onChange={(event) =>
                      setData({ ...data, name: event.target.value })
                    }
                    style={{ width: "40rem" }}
                    placeholder="Nhập Tên Sản Phẩm"
                  />
                  <span
                    style={{
                      marginLeft: "1rem",
                      fontWeight: "700",
                      color: "rgb(150, 150, 150)",
                    }}
                  >
                    * Tên sản phẩm không được để trống *
                  </span>
                </>
              )}
              <div style={{ display: "flex", gap: "2rem" }}>
                <div>
                  <p className={styles.text}>Nồng Độ Cồn</p>
                  <input
                    type="text"
                    value={data.concentration}
                    onChange={handleConcentrationChange}
                    style={{ width: "20rem" }}
                    className={styles.input}
                    placeholder="Nồng Độ"
                  />
                </div>
                <div>
                  <p className={styles.text}>Dung Tích</p>
                  <input
                    type="text"
                    value={data.volume}
                    onChange={handleVolumeChange}
                    className={styles.input}
                    style={{ width: "20rem" }}
                    placeholder="Dung Tích"
                  />
                </div>
                <div>
                  <p className={styles.text}>Loại Sản Phẩm</p>
                  <select
                    value={data.category.maLoaiSanPham}
                    onChange={handleCategoryChange}
                    style={{
                      height: "3rem",
                      padding: "0.3rem",
                      width: "40rem",
                    }}
                  >
                    <option value="">Mặc định</option>
                    {categories.map((category) => (
                      <option
                        value={category.maLoaiSanPham}
                        key={category.maLoaiSanPham}
                      >
                        {category.tenLoaiSanPham}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* <span style={{marginLeft:"1rem",fontWeight:"700",color:"rgb(150, 150, 150)"}}>* Nồng Độ Cồn Không Quá 70% *</span> */}
              <div style={{ display: "flex", gap: "2rem" }}>
                <div>
                  <p className={styles.text}>Xuất xứ</p>
                  <input
                    value={data.origin}
                    onChange={(event) =>
                      setData({ ...data, origin: event.target.value })
                    }
                    className={styles.input}
                    style={{ width: "40rem" }}
                    placeholder="Xuất Xứ Nguồn Gốc Sản Phẩm"
                  />
                </div>
              </div>
              <div>
                <p className={styles.text}>Thương Hiệu</p>
                <input
                  value={data.label}
                  style={{ width: "50rem" }}
                  onChange={(event) =>
                    setData({ ...data, label: event.target.value })
                  }
                  className={styles.input}
                  placeholder="Thương Hiệu Sản Phẩm"
                />
              </div>
            </div>
            <p
              style={{
                fontWeight: "700",
                color: "rgb(100,100,100)",
                lineHeight: "2",
                marginTop: "1rem",
              }}
            >
              Lưu ý các sản phẩm được đưa vào doanh nghiệp phải đám bảo được các
              quy chuẩn như sau :
              <br />
              * Nguồn gốc xuất xứ rõ ràng *
              <br />
              * Sản phẩm từ nhà cung cấp được qua kiểm duyệt sàn lọc trước khi
              đưa vào doanh nghiệp *
              <br />
              * Đảm bảo chất lượng cao nhất cho từng sản phẩm *
              <br />* Nồng độ cồn không vượt quá 70%*
            </p>
          </div>
          <div>
            <p style={{ fontWeight: "700", fontSize: "2rem" }}>
              Hình Ảnh Sản Phẩm
            </p>
            <div>
              {selectedImage ? (
                <img
                  src={selectedImage}
                  onClick={() => imageRef.current.click()}
                  alt="Selected"
                  style={{
                    maxWidth: "40rem",
                    maxHeight: "40rem",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <div
                  className={styles.image}
                  onClick={() => imageRef.current.click()}
                >
                  <FontAwesomeIcon
                    style={{
                      width: "5rem",
                      height: "5rem",
                      color: "rgb(11, 140, 246)",
                    }}
                    icon={faCamera}
                  />
                </div>
              )}
              <input
                ref={imageRef}
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsAdjust;
