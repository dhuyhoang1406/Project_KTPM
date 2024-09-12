import React, { useEffect, useState } from "react";
import styles from "./GoodsReceiptAdjust.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import TableAddProduct from "./TableAddProduct/TableAddProduct";
import { getAllProduct } from "../../../../services/ProductService";
import useDebounce from "../../../../hooks/useDebounce";
import { error, success } from "../../../../components/Message/Message";
import { getAllSupplier } from "../../../../services/SupplierService";
import { convertPrice } from "../../../../services/FeatureService";
import { useNavigate, useParams } from "react-router-dom";
import { createReceipt, getReceipt } from "../../../../services/ReceiptService";
import { getAllUser } from "../../../../services/UserService";
const GoodsReceiptAdjust = ({ isCEO }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplierName, setSupplierName] = useState("");
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [managers, setManagers] = useState([]);
  const [ceo, setCeo] = useState([]);
  const [manager, setManager] = useState();
  const [chooseManager, setChooseManager] = useState("");
  const [products, setProducts] = useState([]);
  const [suppliers, setSupplers] = useState([]);
  const [chooseProducts, setChooseProducts] = useState([]);
  const [chooseSupplier, setChooseSupplier] = useState("");
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState("");
  const [details, setDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleActionChooseProduct = (id, name) => {
    const index = chooseProducts.findIndex((product) => product.id === id);
    if (index !== -1) {
      const updateChooseProducts = [...chooseProducts];
      updateChooseProducts.splice(index, 1);
      setChooseProducts(updateChooseProducts);
    } else {
      setChooseProducts([
        ...chooseProducts,
        { id: id, name: name, amount: 0, price: 0 },
      ]);
    }
  };
  const handlePrice = (id, price) => {
    const index = chooseProducts.findIndex((product) => product.id === id);
    let updateProduct = { ...chooseProducts[index] };
    updateProduct.price = price;
    const updateProducts = [...chooseProducts];
    updateProducts[index] = updateProduct;
    setChooseProducts(updateProducts);
  };
  const handleAmount = (id, amount) => {
    const index = chooseProducts.findIndex((product) => product.id === id);
    let updateProduct = { ...chooseProducts[index] };
    updateProduct.amount = amount;
    const updateProducts = [...chooseProducts];
    updateProducts[index] = updateProduct;
    setChooseProducts(updateProducts);
  };
  const handleTotal = () => {
    const updateTotal = chooseProducts.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        (currentValue.amount ? currentValue.amount : 0) *
          (currentValue.price ? currentValue.price : 0)
      );
    }, 0);
    setTotal(updateTotal);
  };
  const validateReceipt = (data) => {
    if (data.maQuanLy === "") {
      return { status: "error", message: "Quản lý không được để trống" };
    }
    if (data.maNhaCungCap === "") {
      return { status: "error", message: "Nhà cung cấp không được để trống" };
    }
    if (data.danhSachCTPNK.length !== 0) {
      for (let i = 0; i < data.danhSachCTPNK.length; i++) {
        if (
          data.danhSachCTPNK[i].soLuong === 0 ||
          data.danhSachCTPNK[i].soLuong === "" ||
          data.danhSachCTPNK[i].price === 0 ||
          data.danhSachCTPNK[i].price === ""
        ) {
          return {
            status: "error",
            message: "Sản phẩm không được để trống số lượng và giá",
          };
        }
      }
    } else {
      return {
        status: "error",
        message: "Danh sách sản phẩm không được để trống ",
      };
    }
    return { status: "success", message: "Kiểm duyệt thành công" };
  };
  const handleSubmit = async () => {
    const data = {
      tongGiaTri: total,
      maNhaCungCap: chooseSupplier,
      maQuanLy: chooseManager,
      danhSachCTPNK: chooseProducts.map((product) => {
        return {
          maSP: product.id,
          soLuong: product.amount,
          donGiaNhap: product.price,
          thanhTien: product.price * product.amount,
        };
      }),
    };
    const validate = validateReceipt(data);
    if (validate.status === "success") {
      await createReceipt(data);
    } else {
      error(validate.message);
    }
  };
  const handleCheck = (id) => {
    const index = chooseProducts.findIndex((product) => product.id === id);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (id) {
      getReceipt(id).then((res) => {
        setTotal(res.data.tongGiaTri);
        setDate(res.data.ngayNhapKho);
        setManager(res.data.hoTenQuanLy);
        setSupplierName(res.data.tenNhaCungCap);
        setDetails(res.data.danhSachCTPNK);
      });
    } else {
      getAllSupplier().then((res) => {
        setSupplers(res.data.content);
      });
      getAllUser(1, null, "Manager").then((res) => {
        setManagers(res.data.content);
      });
      getAllUser(1, null, "CEO").then((res) => {
        setCeo(res.data.content);
      });
    }
  }, []);
  useEffect(() => {
    handleTotal();
  }, [chooseProducts]);
  useEffect(() => {
    getAllProduct(debounceSearch, 1, 5).then((res) => {
      setProducts(res.data.content);
    });
  }, [debounceSearch]);
  return (
    <div className={styles.wrapper}>
      <div
        style={{ display: "flex", paddingTop: "1rem", paddingBottom: "1rem" }}
      >
        <h2>Phiếu Nhập Kho</h2>
        <div style={{ marginLeft: "auto" }}>
          <button
            style={{
              fontFamily: "Arial",
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "white",
              color: "rgb(65, 64, 64)",
              border: "1px solid rgb(65, 64, 64)",
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "0.6rem",
              cursor: "pointer",
            }}
            onClick={() => {
              isCEO !== "CEO"
                ? navigate("/system/manager/inventory")
                : navigate("/system/ceo/inventory");
            }}
          >
            Hủy
          </button>
          {id ? (
            <></>
          ) : (
            <button
              style={{
                marginLeft: "1rem",
                fontFamily: "Arial",
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "white",
                backgroundColor: "rgb(65, 64, 64)",
                padding: "1rem",
                borderRadius: "0.6rem",
                cursor: "pointer",
              }}
              onClick={() => setShowModal(true)}
            >
              Thêm Sản Phẩm
            </button>
          )}
        </div>
      </div>
      <div className={styles.boxFeature}>
        {id ? (
          <>
            <label>
              <span style={{ fontWeight: "700", fontSize: "1.2rem" }}>
                Nhà Cung Cấp :{" "}
              </span>
              <input
                style={{
                  height: "3rem",
                  padding: "0.3rem",
                  width: "40rem",
                  backgroundColor: "white",
                }}
                value={supplierName}
                disabled
              />
            </label>
            <label>
              <span style={{ fontWeight: "700", fontSize: "1.2rem" }}>
                Ngày Nhập Kho :{" "}
              </span>
              <input
                style={{
                  height: "3rem",
                  padding: "0.3rem",
                  width: "30rem",
                  backgroundColor: "white",
                }}
                value={date}
                disabled
              />
            </label>
          </>
        ) : (
          <>
            <select
              onChange={(event) => setChooseSupplier(event.target.value)}
              style={{ height: "3rem", padding: "0.3rem", width: "50rem" }}
            >
              <option defaultChecked style={{ display: "block" }}>
                Nhà Cung Cấp
              </option>
              {suppliers?.map((supplier) => {
                return (
                  <option value={supplier.maNCC}>{supplier.tenNCC}</option>
                );
              })}
            </select>
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
              onClick={() => handleSubmit()}
            >
              Lưu
            </button>
          </>
        )}
      </div>
      <div className={styles.boxTable}>
        <div style={{ backgroundColor: "rgb(236, 233, 233)", width: "75%" }}>
          {id ? (
            <TableAddProduct
              id={id}
              heads={["Tên Sản Phẩm", "Số Lượng", "Đơn Giá Nhập", "Thành Tiền"]}
              bodys={details}
            />
          ) : (
            <TableAddProduct
              heads={[
                "Tên Sản Phẩm",
                "Số Lượng",
                "Đơn Giá Nhập",
                "Thành Tiền",
                "Thao Tác",
              ]}
              handleProduct={handleActionChooseProduct}
              bodys={chooseProducts}
              handlePrice={handlePrice}
              handleAmount={handleAmount}
            />
          )}
        </div>
        <div
          style={{
            width: "25%",
            backgroundColor: "rgb(236, 233, 233)",
            padding: "1rem",
          }}
        >
          <label>
            <p style={{ fontSize: "1.3rem", fontWeight: "700" }}>Mã Phiếu</p>
            <input
              style={{
                height: "3rem",
                padding: "0.5rem",
                width: "100%",
                backgroundColor: "white",
                fontWeight: "700",
                marginTop: "0.5rem",
              }}
              value={id && id}
              onFocus={false}
              disabled={true}
            />
          </label>
          <label>
            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                marginTop: "1rem",
              }}
            >
              Tên Người Quản Lý
            </p>
            {id ? (
              <input
                style={{
                  height: "3rem",
                  padding: "0.5rem",
                  width: "100%",
                  backgroundColor: "white",
                  fontWeight: "700",
                  marginTop: "0.5rem",
                }}
                value={manager}
                disabled={id ? true : false}
              />
            ) : (
              <select
                onChange={(event) => setChooseManager(event.target.value)}
                style={{
                  height: "3rem",
                  padding: "0.5rem",
                  width: "100%",
                  backgroundColor: "white",
                  fontWeight: "700",
                  marginTop: "0.5rem",
                }}
                disabled={id ? true : false}
              >
                <option defaultChecked value="">
                  Chọn Quản Lý
                </option>
                {managers?.map((item) => {
                  return <option value={item.maTK}>{item.hoTen}</option>;
                })}
                {ceo?.map((item) => {
                  return <option value={item.maTK}>{item.hoTen}</option>;
                })}
              </select>
            )}
          </label>
          <label>
            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                marginTop: "1rem",
              }}
            >
              Tổng Giá Trị
            </p>
            <input
              style={{
                height: "3rem",
                padding: "0.5rem",
                width: "100%",
                backgroundColor: "white",
                fontWeight: "700",
                marginTop: "0.5rem",
              }}
              value={convertPrice(total)}
              disabled={true}
            />
          </label>
        </div>
      </div>
      {showModal && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal_content}>
            <span className={styles.close_btn}>
              <h3>Chọn Sản Phẩm</h3>
              <FontAwesomeIcon
                onClick={() => setShowModal(false)}
                icon={faXmark}
              />
            </span>
            <div style={{ marginTop: "1rem" }}>
              <div style={{ position: "relative" }}>
                <FontAwesomeIcon className={styles.icon} icon={faSearch} />
                <input
                  onChange={(event) => setSearch(event.target.value)}
                  className={styles.input}
                  placeholder="Tìm kiếm phiếu nhập kho"
                />
              </div>
              <div
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                  marginTop: "1rem",
                }}
              >
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    borderRadius: "1rem",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "rgb(40,40,40)",
                        color: "white",
                      }}
                    >
                      <th style={{ padding: "0.5rem" }}>Mã Sản Phẩm</th>
                      <th style={{ padding: "0.5rem" }}>Hình Ảnh</th>
                      <th style={{ padding: "0.5rem" }}>Tên Sản Phẩm</th>
                      <th style={{ padding: "0.5rem" }}>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length !== 0 ? (
                      products.map((product, index) => {
                        const rowStyle =
                          index % 2 === 0
                            ? { textAlign: "center" }
                            : {
                                textAlign: "center",
                                backgroundColor: "rgb(233,233,233)",
                              };

                        return (
                          <tr style={rowStyle} key={product.maSP}>
                            <td style={{ padding: "0.5rem" }}>
                              {product.maSP}
                            </td>
                            <td style={{ padding: "0.5rem" }}>
                              {product.hinhAnh}
                            </td>
                            <td style={{ padding: "0.5rem" }}>
                              {product.tenSP}
                            </td>
                            <td style={{ padding: "0.5rem" }}>
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleActionChooseProduct(
                                    product.maSP,
                                    product.tenSP
                                  )
                                }
                                checked={handleCheck(product.maSP)}
                              />
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          style={{
                            textAlign: "center",
                            fontWeight: "700",
                            padding: "1rem",
                          }}
                        >
                          Không tìm thấy bất kỳ phiếu nào
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default GoodsReceiptAdjust;
