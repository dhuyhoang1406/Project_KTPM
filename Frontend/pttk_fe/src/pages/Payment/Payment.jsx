import React, { useMemo, useState } from "react";
import { Radio, Button } from "antd";
import { Lable, WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight, WrapperTotal } from './style';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { convertPrice } from '../../utils';
import * as OrderService from '../../services/OrderService'
import * as message from '../../components/Message/Message'
import { removeAllOrderProduct } from "../../redux/slides/orderSlide";


const Payment = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [delivery, setDelivery] = useState('GiaoHangTietKiem')
  const [payment, setPayment] = useState('TienMat');
  const location = useLocation(); 


  console.log(order?.orderItemsSelected);

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + (cur.price * cur.amount);
    }, 0);
    return result;
  }, [order]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) 
  },
  // [priceMemo,priceDiscountMemo, diliveryPriceMemo]
  [priceMemo]
  )

  const handlePaymentProduct = async () => {
    const tongGiaTri = totalPriceMemo;
    const phuongThucThanhToan = payment;
    const maKhachHang = user?.maTK;
    let danhSachCTDH = []; // Changed to array to accumulate items
    order.orderItemsSelected.forEach((item) => { // Changed map to forEach
        danhSachCTDH.push({maSP:item.product , soLuong: item.amount, thanhGia: item.price * item.amount}); // Push each item to the array
    });
    console.log(danhSachCTDH)
    const Username = localStorage.getItem("Username");
    const Password = localStorage.getItem("Password");
    const data = {tongGiaTri, phuongThucThanhToan:payment, phuongThucVanChuyen:delivery , maKhachHang, diaChiGiaoHang: location.state.diaChi, danhSachCTDH} 
    const account = {Username, Password}
    console.log(data)
    console.log(order?.orderItemsSelected);
    try {
      console.log(account)
      const res = await OrderService.createOrder(data,account)
      console.log(res)
      message.success('Đặt hàng thành công')
      const arrayOrdered = []
      order?.orderItemsSelected?.forEach(element => {
        console.log(element)
        arrayOrdered.push(element.product)
      });
      console.log(order?.orderItemsSelected)
      dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
      navigate('/')
    } catch (error) {
      console.error(error)
      message.error('Thất bại!')
    }
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const handleDilivery = (e) => {
    setDelivery(e.target.value)
  }

  return (
    <div style={{ marginTop: "7rem", with: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3 style={{ fontWeight: "bold" }}>Thanh toán</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
          <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức giao hàng</Lable>
                  <WrapperRadio onChange={handleDilivery} value={delivery}> 
                    <Radio  value="GiaoHangTietKiem"><span style={{color: '#ea8500', fontWeight: 'bold'}}></span> Giao hàng tiết kiệm</Radio>
                    <Radio  value="ChuyenPhatNhanh"><span style={{color: '#ea8500', fontWeight: 'bold'}}></span>Chuyển phát nhanh</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
            <WrapperInfo>
              <div>
                <Lable>Chọn phương thức thanh toán</Lable>
                <WrapperRadio onChange={handlePayment} value={payment}>
                  <Radio value="TienMat">Thanh toán khi nhận hàng (COD)</Radio>
                  {/* <Radio value="ChuyenKhoan">Thanh toán bằng tài khoản ngân hàng</Radio> */}
                </WrapperRadio>
              </div>
            </WrapperInfo>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: "bold" }}>
                    { location.state.diaChi  || user.diaChi }                  
                  </span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Tạm tính</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(priceMemo)}
                  </span>
                </div>
               
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "rgb(254, 56, 52)",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(totalPriceMemo)}
                  </span>
                  <span style={{ color: "#000", fontSize: "11px" }}>
                    (Đã bao gồm VAT nếu có)
                  </span>
                </span>
              </WrapperTotal>
            </div>
            <Button
              onClick={() => handlePaymentProduct()}
              style={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "320px",
                border: "none",
                borderRadius: "4px",
              }}
            >
              <span
                style={{ color: "#fff", fontSize: "15px", fontWeight: "700" }}
              >
                Thanh toán
              </span>
            </Button>
          </WrapperRight>
        </div>
      </div>
    </div>
  );
};

export default Payment;
