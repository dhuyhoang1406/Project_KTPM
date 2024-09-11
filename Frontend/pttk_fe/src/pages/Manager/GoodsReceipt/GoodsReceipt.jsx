import React, { useEffect, useState } from "react";
import styles from "./GoodsReceipt.module.scss"
import StaffPagination from "../../../layouts/components/Staff/StaffPagination/StaffPagination"
import Table from "./Table/Table";
import { useNavigate } from "react-router-dom";
import { getAllReceipt } from "../../../services/ReceiptService";
const GoodsReceipt = ({isCEO})=>{
    const [amount,setAmount] = useState(0)
    const [date,setDate] = useState('')
    const [page,setPage] = useState(1)
    const [receipts,setReceipts] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        getAllReceipt(page,30,date).then((res)=>{
            setAmount(res.data.totalElements)
            setReceipts(res.data.content)
        })
    },[page,date])
    return (
        <div className={styles.wrapper}>
            <div style={{display:"flex",paddingTop:"1rem",paddingBottom:"1rem"}}>
                <h2>Phiếu Nhập Kho</h2>
                <button style={{marginLeft:"auto",fontFamily:"Arial",fontSize:"1.5rem",fontWeight:"700",color:"white",backgroundColor:"rgb(65, 64, 64)",padding:"1rem",borderRadius:"0.6rem",cursor:"pointer"}} onClick={()=>{isCEO !== "CEO" ? navigate("/system/manager/inventory/add") : navigate("/system/ceo/inventory/add")}}>Tạo Phiếu Nhập</button>
            </div>
            <div className={styles.boxFeature}>
                <div>
                    <label>
                        <span style={{fontSize:"1.3rem",fontWeight:"700"}}>Đơn Trong Tháng : </span>
                        <input className={styles.input} onChange={(event)=>setDate(event.target.value)} value={date} style={{width:"20rem"}} type="month"/>
                    </label>
                    <button onClick={()=>setDate("")} style={{marginLeft:"1rem",fontFamily:"Arial",fontSize:"1.5rem",fontWeight:"700",color:"white",backgroundColor:"rgb(65, 64, 64)",padding:"1rem",borderRadius:"0.6rem",cursor:"pointer"}}>Reset</button>
                </div>
                {
                    amount !== 0 ?
                    <div style={{marginLeft:"auto"}}>
                        <StaffPagination itemsPerPage={30} amount={amount} onChange={setPage}/>
                    </div>
                    :
                    <></>
                }
            </div>
            <div className={styles.boxTable}>
                <Table isCEO={isCEO} heads={["Mã Phiếu","Ngày Nhập Kho","Tên Nhà Cung Cấp","Tên Người Quản Lý","Tổng Giá Trị","Thao Tác"]} bodys={receipts}/>
            </div>
        </div>
    )
}
export default GoodsReceipt