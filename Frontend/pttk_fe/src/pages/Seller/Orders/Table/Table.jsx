import React from "react";
import styles from "./Table.module.scss"
import { useNavigate } from "react-router-dom";
import { updateOrder } from "../../../../services/OrderService";
import { convertOrderStatus, convertPaymentMethod, convertPrice } from "../../../../services/FeatureService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Table = ({isCEO,heads,bodys,setFlag})=>{
    const navigate = useNavigate()

    return (
        <table className={styles.table}>
            <thead className={styles.head}>
                <tr>
                    {heads.map((head,index)=>{
                        return (
                            <th key={index} className={styles.th}>{head}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody className={styles.body}>
                {bodys?.map((body,index)=>{
                    if(index%2===0){
                        return (
                            <tr key={index} className={styles.even}>
                                <td className={styles.td} key={index+"maDH"}><p className={styles.p} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/seller/orders/details/${body.maDH}`) : navigate(`/system/ceo/orders/details/${body.maDH}`)}}>{body.maDH}</p></td>
                                <td className={styles.td} key={index+"hoTenKhachHang"}><p className={styles.p} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/seller/orders/details/${body.maDH}`) : navigate(`/system/ceo/orders/details/${body.maDH}`)}}>{body.hoTenKhachHang}</p></td>
                                <td className={styles.td} key={index+"emailKhachHang"}><p className={styles.p} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/seller/orders/details/${body.maDH}`) : navigate(`/system/ceo/orders/details/${body.maDH}`)}}>{body.emailKhachHang}</p></td>
                                <td className={styles.td} key={index+"ngayDat"}><p className={styles.p} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/seller/orders/details/${body.maDH}`) : navigate(`/system/ceo/orders/details/${body.maDH}`)}}>{body.ngayDat}</p></td>
                                <td className={styles.td} key={index+"tongGiaTri"}><p className={styles.p} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/seller/orders/details/${body.maDH}`) : navigate(`/system/ceo/orders/details/${body.maDH}`)}}>{convertPrice(body.tongGiaTri)}</p></td>
                                <td className={styles.td} key={index+"tt"}><p className={styles.p} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/seller/orders/details/${body.maDH}`) : navigate(`/system/ceo/orders/details/${body.maDH}`)}}>{convertOrderStatus(body.trangThaiMoiNhat)}</p></td>
                                <td className={styles.td} key={index+"pttt"}><p className={styles.p} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/seller/orders/details/${body.maDH}`) : navigate(`/system/ceo/orders/details/${body.maDH}`)}}>{convertPaymentMethod(body.phuongThucThanhToan)}</p></td>
                                <td className={styles.td}>
                                    {
                                        body.trangThaiMoiNhat === "ChoDuyet" 
                                        ?
                                        <>
                                            <button className={styles.delete} onClick={async()=>{
                                                if(window.confirm('Xác nhận hủy đơn hàng ?')){
                                                    const res = await updateOrder("Huy",body.maDH)
                                                    console.log(res)
                                                    setFlag()
                                                }
                                                }}>Hủy</button>
                                            <button className={styles.confirm} onClick={async()=>{
                                                if(window.confirm('Xác nhận duyệt đơn hàng ?')){
                                                    await updateOrder("DaDuyet",body.maDH)
                                                    setFlag()
                                                }
                                                }}>Duyệt</button>
                                        </>
                                        : body.trangThaiMoiNhat === "DaDuyet" 
                                        ?   
                                        <>
                                        <button className={styles.delete} onClick={async()=>{
                                                if(window.confirm('Xác nhận duyệt đơn hàng ?')){
                                                    await updateOrder("Huy",body.maDH)
                                                    setFlag()
                                                }
                                                }}>Hủy</button>
                                                <button className={styles.details} onClick={async()=>{
                                                    if(window.confirm('Xác nhận duyệt đơn hàng ?')){
                                                        await updateOrder("GiaoThanhCong",body.maDH)
                                                        setFlag()
                                                    }
                                                    }}>Đã giao</button>
                                        </>
                                        : body.trangThaiMoiNhat === "Huy"
                                        ?
                                        <div style={{fontFamily:"Arial",color:"red"}}>
                                        <FontAwesomeIcon icon={faCircleXmark}/><span style={{marginLeft:"0.5rem"}}>Đã Hủy</span></div>
                                        :
                                        <div style={{fontFamily:"Arial",color:"green"}}><FontAwesomeIcon icon={faCircleCheck}/><span style={{marginLeft:"0.5rem"}}>Giao Thành Công</span></div>
                                    }
                                    
                                </td>
                            </tr>
                        )
                    }else{
                        return (
                            <tr key={index} className={styles.odd}>
                                <td className={styles.td} key={index+"maDH"}><p className={styles.p} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/seller/orders/details/${body.maDH}`) : navigate(`/system/ceo/orders/details/${body.maDH}`)}}>{body.maDH}</p></td>
                                <td className={styles.td} key={index+"hoTenKhachHang"}><p className={styles.p} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/seller/orders/details/${body.maDH}`) : navigate(`/system/ceo/orders/details/${body.maDH}`)}}>{body.hoTenKhachHang}</p></td>
                                <td className={styles.td} key={index+"emailKhachHang"}><p className={styles.p} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/seller/orders/details/${body.maDH}`) : navigate(`/system/ceo/orders/details/${body.maDH}`)}}>{body.emailKhachHang}</p></td>
                                <td className={styles.td} key={index+"ngayDat"}><p className={styles.p} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/seller/orders/details/${body.maDH}`) : navigate(`/system/ceo/orders/details/${body.maDH}`)}}>{body.ngayDat}</p></td>
                                <td className={styles.td} key={index+"tongGiaTri"}><p className={styles.p} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/seller/orders/details/${body.maDH}`) : navigate(`/system/ceo/orders/details/${body.maDH}`)}}>{convertPrice(body.tongGiaTri)}</p></td>
                                <td className={styles.td} key={index+"tt"}><p className={styles.p} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/seller/orders/details/${body.maDH}`) : navigate(`/system/ceo/orders/details/${body.maDH}`)}}>{convertOrderStatus(body.trangThaiMoiNhat)}</p></td>
                                <td className={styles.td} key={index+"pttt"}><p className={styles.p} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/seller/orders/details/${body.maDH}`) : navigate(`/system/ceo/orders/details/${body.maDH}`)}}>{convertPaymentMethod(body.phuongThucThanhToan)}</p></td>
                                <td className={styles.td}>
                                {
                                        body.trangThaiMoiNhat === "ChoDuyet" 
                                        ?
                                        <>
                                            <button className={styles.delete} onClick={async()=>{
                                                if(window.confirm('Xác nhận hủy đơn hàng ?')){
                                                    await updateOrder("Huy",body.maDH)
                                                    setFlag()
                                                }
                                                }}>Hủy</button>
                                            <button className={styles.confirm} onClick={async()=>{
                                                if(window.confirm('Xác nhận duyệt đơn hàng ?')){
                                                    await updateOrder("DaDuyet",body.maDH)
                                                    setFlag()
                                                }
                                                }}>Duyệt</button>
                                        </>
                                        : body.trangThaiMoiNhat === "DaDuyet" 
                                        ?
                                        <>
                                            <button className={styles.delete} onClick={async()=>{
                                                if(window.confirm('Xác nhận hủy đơn hàng ?')){
                                                    await updateOrder("Huy",body.maDH)
                                                    setFlag()
                                                }
                                                }}>Hủy</button>
                                                <button className={styles.details} onClick={async()=>{
                                                    if(window.confirm('Xác nhận giao hàng thành công ?')){
                                                        await updateOrder("GiaoThanhCong",body.maDH)
                                                        setFlag()
                                                    }
                                                    }}>Đã giao</button>
                                        </>
                                        : body.trangThaiMoiNhat === "Huy"
                                        ?
                                        <div style={{fontFamily:"Arial",color:"red"}}>
                                        <FontAwesomeIcon icon={faCircleXmark}/><span style={{marginLeft:"0.5rem"}}>Đã Hủy</span></div>
                                        :
                                        <div style={{fontFamily:"Arial",color:"green"}}><FontAwesomeIcon icon={faCircleCheck}/><span style={{marginLeft:"0.5rem"}}>Giao Thành Công</span></div>
                                    }
                                </td>
                            </tr>
                        )
                    }
                })}
            </tbody>
        </table>
    )
}
export default Table