import React, { useEffect, useState } from "react";
import {
  WrapperItemOrder,
  WrapperListOrder,
  WrapperHeaderItem,
  WrapperFooterItem,
  WrapperContainer,
  WrapperStatus,
} from "./style";
import OrderDetails from "./components/OrderDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import * as OrderService from "../../services/OrderService";
import { convertPrice } from "../../utils";
import * as message from "../../components/Message/Message";
import StepComponent from "../../components/StepComponent/StepComponent";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const [detail, setDetail] = useState(false);
  const [data, setData] = useState([]);
  const [idBill, setIdBill] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchdata();
  }, []);

  const handleFetchdata = async () => {
    const Username = localStorage.getItem("Username");
    const Password = localStorage.getItem("Password");
    const id = localStorage.getItem("id");
    const account = { Username, Password };
    try {
      const res = await OrderService.getOrderByUserId(id, account);
      setData(res.content);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelOrder = async (id) => {
    const Username = localStorage.getItem("Username");
    const Password = localStorage.getItem("Password");
    const account = { Username, Password };
    console.log(id);
    console.log(account);
    try {
      const res = await OrderService.cancelOrder(
        id,
        { trangThai: "Huy" },
        account
      );
      message.success("Hủy đơn hàng thành công!!");
      window.location.reload();
      navigate("/profile-user/2");
    } catch (error) {
      console.error(error);
      message.error("Hủy đơn hàng thất bại!!");
    }
  };

  const renderProduct = (product) => (
    <WrapperHeaderItem key={product.tenSanPham}>
      <img
        src={product.anhMinhHoa}
        style={{
          width: "70px",
          height: "70px",
          objectFit: "cover",
          border: "1px solid rgb(238, 238, 238)",
          padding: "2px",
        }}
        alt="ảnh"
      />
      <div
        style={{
          width: 260,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          marginLeft: "10px",
        }}
      >
        {product.tenSanPham}
      </div>
      <span style={{ fontSize: "13px", color: "#242424", marginLeft: "auto" }}>
        Đơn giá :{convertPrice(product.donGia)}
      </span>
      <span style={{ fontSize: "13px", color: "#242424", marginLeft: "auto" }}>
        Số lượng :{product.soLuong}
      </span>
      <span style={{ fontSize: "13px", color: "#242424", marginLeft: "auto" }}>
        Thành tiền :{convertPrice(product.thanhTien)}
      </span>
    </WrapperHeaderItem>
  );

  const itemsDeliveryNormal = [
    {
      title: "Chờ Duyệt",
      description: "Đơn hàng của bạn đang trong quá trình xác nhận",
    },
    {
      title: "Đã Duyệt",
      description: "Đơn hàng của bạn đã được duyệt",
    },
    {
      title: "Giao Thành Công",
      description: "Đơn hàng của bạn đã được vận chuyển hoàn tất",
    },
  ];

  const itemsDeliveryCancel = [
    {
      title: "Hủy",
      description: "Đơn hàng của bạn đã bị hủy",
    },
  ];

  return (
    <WrapperContainer>
      <div style={{ height: "100%", width: "970px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            columnGap: "1rem",
            alignItems: "center",
            userSelect: "none",
          }}
        >
          {detail && (
            <span
              style={{ cursor: "pointer", padding: "1rem" }}
              onClick={() => {
                setDetail(false);
              }}
            >
              <FontAwesomeIcon
                icon={faBackward}
                style={{ fontSize: "2rem", cursor: "pointer" }}
              />
            </span>
          )}
          <h1 style={{ fontWeight: "normal", marginBottom: "1rem" }}>
            Đơn hàng của tôi
          </h1>
        </div>
        {detail ? (
          <div>
            {data.map((product, index) => {
              if (product.maDH === idBill) {
                return (
                  <div
                    key={index}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <StepComponent
                      items={
                        product.trangThaiMoiNhat === "Huy"
                          ? itemsDeliveryCancel
                          : itemsDeliveryNormal
                      }
                      current={
                        product.trangThaiMoiNhat === "ChoDuyet"
                          ? 1
                          : product.trangThaiMoiNhat === "DaDuyet"
                          ? 2
                          : product.trangThaiMoiNhat === "GiaoThanhCong"
                          ? 3
                          : 1
                      }
                    />
                    {product.danhSachCTDH.map((item, itemIndex) => (
                      <OrderDetails
                        key={index + "-" + itemIndex}
                        product={item}
                      />
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <WrapperListOrder>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <WrapperItemOrder key={index}>
                  <WrapperStatus>
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Ngày đặt hàng: {item.ngayDat}
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Địa chỉ: {item.diaChiGiaoHang}
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Trạng thái:
                      <span
                        style={{
                          color: "rgb(90, 32, 193)",
                          fontWeight: "bold",
                        }}
                      >
                        {item.trangThaiMoiNhat === "ChoDuyet"
                          ? "Chờ Duyệt"
                          : item.trangThaiMoiNhat === "DaDuyet"
                          ? "Đã Duyệt"
                          : item.trangThaiMoiNhat === "GiaoThanhCong"
                          ? "Giao Thành Công"
                          : "Hủy"}
                      </span>
                    </span>
                    <div>
                      <span style={{ color: "rgb(255, 66, 78)" }}>
                        Thanh toán:{" "}
                      </span>
                      <span
                        style={{
                          color: "rgb(90, 32, 193)",
                          fontWeight: "bold",
                        }}
                      >
                        {item.phuongThucThanhToan === "TienMat"
                          ? "Tiền Mặt"
                          : "Chuyển Khoản"}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: "rgb(255, 66, 78)" }}>
                        Phương Thức Vận Chuyển:{" "}
                      </span>
                      <span
                        style={{
                          color: "rgb(90, 32, 193)",
                          fontWeight: "bold",
                        }}
                      >
                        {item.phuongThucVanChuyen === "ChuyenPhatNhanh"
                          ? "Chuyển phát nhanh"
                          : item.phuongThucVanChuyen === "GiaoHangTietKiem"
                          ? "Giao hàng tiết kiệm"
                          : ""}
                      </span>
                    </div>
                  </WrapperStatus>
                  {item.danhSachCTDH.map((product, id) =>
                    renderProduct(product)
                  )}
                  <WrapperFooterItem>
                    <div>
                      <span style={{ color: "rgb(255, 66, 78)" }}>
                        Tổng tiền:{" "}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "rgb(56, 56, 61)",
                          fontWeight: 700,
                        }}
                      >
                        {convertPrice(item.tongGiaTri)}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        style={{
                          color: "#9255FD",
                          fontSize: "14px",
                          height: "36px",
                          border: "1px solid #9255FD",
                          borderRadius: "4px",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setDetail(true);
                          setIdBill(item.maDH);
                        }}
                      >
                        Xem chi tiết
                      </button>
                      {item.trangThaiMoiNhat === "ChoDuyet" && (
                        <button
                          style={{
                            color: "#9255FD",
                            fontSize: "14px",
                            height: "36px",
                            border: "1px solid #9255FD",
                            borderRadius: "4px",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleCancelOrder(item.maDH)}
                        >
                          Hủy đơn hàng
                        </button>
                      )}
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              ))
            ) : (
              <span>Bạn hiện không có đơn hàng nào.</span>
            )}
          </WrapperListOrder>
        )}
      </div>
    </WrapperContainer>
  );
};

export default MyOrder;
