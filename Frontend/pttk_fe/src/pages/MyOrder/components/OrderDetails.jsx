import React from "react";
import { WrapperHeaderItem, WrapperStyleHeaderDilivery } from "./style";
import StepComponent from "../../../components/StepComponent/StepComponent";



const renderProduct = (product) => {
  return (
    <div>
      <WrapperHeaderItem>
        <img
          src={product.anhMinhHoa} 
          style={{
            width: "70px",
            height: "70px",
            objectFit: "cover",
            border: "1px solid rgb(238, 238, 238)",
            padding: "2px",
          }}
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
          Đơn Giá: {product.donGia}
        </span>
        <span style={{ fontSize: "13px", color: "#242424", marginLeft: "auto" }}>
          Số Lượng: {product.soLuong}
        </span>
      </WrapperHeaderItem>
    </div>
  );
};

const OrderDetails = ({ product }) => {

  return (
    <div style={{ marginTop: "1rem" }}>
     
      {renderProduct(product)}
    </div>
  );
};

export default OrderDetails;
