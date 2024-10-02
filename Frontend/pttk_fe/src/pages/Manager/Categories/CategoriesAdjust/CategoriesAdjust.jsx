import React, { useEffect, useState } from "react";
import styles from "./CategoriesAdjust.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../../../services/CategoriesService";
import { error } from "../../../../components/Message/Message";
const CategoriesAdjust = ({ isCEO }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      getCategory(id).then((res) => {
        setName(res.data.tenLoaiSanPham);
      });
    }
  }, [id]);
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
          <h2 style={{ fontSize: "2.3rem" }}>Loại Sản Phẩm</h2>
          <p style={{ fontSize: "1.1rem", fontWeight: "700" }}>
            Loại Sản Phẩm / Xem và chỉnh sửa
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
                ? navigate("/system/manager/categories")
                : navigate("/system/ceo/categories");
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
              padding: "1rem 2rem",
              borderRadius: "0.6rem",
              cursor: "pointer",
            }}
            onClick={async () => {
              if (!name) {
                return error("Vui lòng nhập tên loại sản phẩm");
              }

              try {
                if (id) {
                  await updateCategory(id, { tenLoaiSanPham: name });
                } else {
                  await createCategory({ tenLoaiSanPham: name });
                }
              } catch (err) {
                error("Có lỗi xảy ra khi lưu loại sản phẩm");
              }
            }}
          >
            Lưu
          </button>
        </div>
      </div>
      <div className={styles.boxTable}>
        <h2>Thông tin loại sản phẩm</h2>
        <div
          style={{
            display: "flex",
            padding: "0rem 1rem 0rem 1rem",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ fontWeight: "700", fontSize: "1.5rem" }}>
              Chi tiết loại sản phẩm
            </p>
            <div>
              <div style={{ display: "flex", gap: "2rem" }}>
                <div>
                  <p className={styles.text}>Mã loại sản phẩm</p>
                  <input
                    disabled
                    value={id && id}
                    className={styles.input}
                    style={{ width: "40rem", backgroundColor: "white" }}
                  />
                </div>
                <div>
                  <p className={styles.text}>Tên loại sản phẩm</p>
                  <input
                    className={styles.input}
                    value={name && name}
                    onChange={(event) => setName(event.target.value)}
                    style={{ width: "70rem" }}
                    placeholder="Tên loại sản phẩm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoriesAdjust;
