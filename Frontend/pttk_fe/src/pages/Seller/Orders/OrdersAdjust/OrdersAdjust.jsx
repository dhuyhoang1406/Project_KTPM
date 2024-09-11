import React, { useEffect, useState } from "react";
import styles from "./OrdersAdjust.module.scss"
import { useNavigate, useParams } from "react-router-dom";
import TableAddProduct from './TableAddProduct/TableAddProduct'
import { getDetailsOrder } from "../../../../services/OrderService";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { convertDeliveryMethod, convertOrderStatus, convertPaymentMethod, convertPrice } from "../../../../services/FeatureService";
import Pdf from './../PDF/Pdf';
const OrdersAdjust = ({isCEO})=>{
    const { id } = useParams()
    const navigate = useNavigate()
    const [details,setDetails] = useState(null)
    useEffect(()=>{
        getDetailsOrder(id).then((res)=>{
            setDetails(res.data)
        })
    },[])
    return (
        <div className={styles.wrapper}>
            <div style={{display:"flex",paddingTop:"1rem",paddingBottom:"1rem"}}>
                <h2>Chi Tiết Đơn Hàng</h2>
                <div style={{marginLeft:"auto"}}>
                    <button style={{fontFamily:"Arial",fontSize:"1.5rem",fontWeight:"700",color:"white",color:"rgb(65, 64, 64)",border:"1px solid rgb(65, 64, 64)",backgroundColor:"white",padding:"1rem",borderRadius:"0.6rem",cursor:"pointer"}} onClick={()=>{isCEO !== "CEO" ? navigate('/system/seller/orders') : navigate('/system/ceo/orders')}}>Hủy</button>
                    <PDFDownloadLink document={<Pdf order={details}/>} fileName="HoaDon">
                        {({ loading }) => 
                            loading ? (
                                <button className={styles.export}>Đang Tải...</button>
                            ) : (
                                <button className={styles.export}>Xuất Phiếu</button>
                            )
                        }  
                    </PDFDownloadLink>
                </div>
            </div>
            <div className={styles.boxFeature}>
                <label>
                    <span style={{fontWeight:"700",fontSize:"1.2rem"}}>Ngày Đặt Hàng : </span>
                    <input style={{height:"3rem",padding:"0.3rem",width:"40rem",backgroundColor:"white"}} value={details?.ngayDat} disabled/>
                </label>
                <label>
                    <span style={{fontWeight:"700",fontSize:"1.2rem"}}>Trạng Thái Đơn Hàng : </span>
                    <input style={{height:"3rem",padding:"0.3rem",width:"30rem",backgroundColor:"white"}} value={convertOrderStatus(details?.trangThaiMoiNhat)} disabled/>
                </label>
            </div>
            <div className={styles.boxTable}>
                <div style={{backgroundColor:"rgb(236, 233, 233)",width:'75%'}}>
                    <TableAddProduct heads={["Hình Ảnh","Tên Sản Phẩm","Số Lượng","Đơn Giá","Thành Tiền"]} bodys={details}/>
                </div>
                <div style={{width:"25%",backgroundColor:"rgb(236, 233, 233)",padding:"1rem"}}>
                    <label>
                        <p style={{fontSize:"1.3rem",fontWeight:"700"}}>Mã Phiếu</p>
                        <input style={{height:"3rem",padding:"0.5rem",width:"100%",backgroundColor:"white",fontWeight:"700",marginTop:"0.5rem"}} value={id&&id} disabled={true}/>
                    </label>
                    <label>
                        <p style={{fontSize:"1.3rem",fontWeight:"700",marginTop:"1rem"}}>Tên Khách Hàng</p>
                            <input style={{height:"3rem",padding:"0.5rem",width:"100%",backgroundColor:"white",fontWeight:"700",marginTop:"0.5rem"}} value={details?.hoTenKhachHang} disabled/>
                    </label>
                    <label>
                        <p style={{fontSize:"1.3rem",fontWeight:"700",marginTop:"1rem"}}>Email</p>
                        <input style={{height:"3rem",padding:"0.5rem",width:"100%",backgroundColor:"white",fontWeight:"700",marginTop:"0.5rem"}} value={details?.emailKhachHang} disabled/>
                    </label>
                    <label>
                        <p style={{fontSize:"1.3rem",fontWeight:"700",marginTop:"1rem"}}>Phương Thức Thanh Toán</p>
                        <input style={{height:"3rem",padding:"0.5rem",width:"100%",backgroundColor:"white",fontWeight:"700",marginTop:"0.5rem"}} value={convertPaymentMethod(details?.phuongThucThanhToan)} disabled/>
                    </label>
                    <label>
                        <p style={{fontSize:"1.3rem",fontWeight:"700",marginTop:"1rem"}}>Phương Thức Vận Chuyển</p>
                        <input style={{height:"3rem",padding:"0.5rem",width:"100%",backgroundColor:"white",fontWeight:"700",marginTop:"0.5rem"}} value={convertDeliveryMethod(details?.phuongThucVanChuyen)} disabled/>
                    </label>
                    <label>
                        <p style={{fontSize:"1.3rem",fontWeight:"700",marginTop:"1rem"}}>Địa Chỉ Giao Hàng</p>
                        <input style={{height:"3rem",padding:"0.5rem",width:"100%",backgroundColor:"white",fontWeight:"700",marginTop:"0.5rem"}} value={details?.diaChiGiaoHang} disabled/>
                    </label>
                    <label>
                        <p style={{fontSize:"1.3rem",fontWeight:"700",marginTop:"1rem"}}>Tổng Giá Trị Đơn Hàng</p>
                        <input style={{height:"3rem",padding:"0.5rem",width:"100%",backgroundColor:"white",fontWeight:"700",marginTop:"0.5rem"}} value={convertPrice(details?.tongGiaTri)} disabled/>
                    </label>
                </div>
            </div>
            
        </div>
    )
}
export default OrdersAdjust
