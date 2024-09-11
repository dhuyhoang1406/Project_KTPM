import React, { useEffect, useState } from "react";
import styles from "./Orders.module.scss"
import StaffPagination from "../../../layouts/components/Staff/StaffPagination/StaffPagination"
import Table from "./Table/Table";
import { getAllOrderForManager } from "../../../services/OrderService";
import { formatDate } from "../../../services/FeatureService";
const Orders = ({isCEO})=>{
    const [page,setPage] = useState(1)
    const [flag,setFlag] = useState(false)
    const [amount,setAmount] = useState(0)
    const [startDate,setStartDate] = useState("")
    const [endDate,setEndDate] = useState("")
    const [status,setStatus] = useState("")
    const [orders,setOrders] = useState([])
    const handleFlag = () => {
        setFlag(!flag)
    }
    useEffect(()=>{
        getAllOrderForManager(startDate,endDate,status,page,30).then((res)=>{
            setAmount(res.data.totalElements)
            setOrders(res.data.content)
        })
    },[startDate,endDate,status,page,flag])
    return (
        <div className={styles.wrapper}>
            <div style={{display:"flex",paddingTop:"1rem",paddingBottom:"1rem"}}>
                <h2>Đơn Hàng</h2>
            </div>
            <div className={styles.boxFeature}>
                <div>
                    <label style={{fontSize:"1rem",marginRight:"0.5rem",fontWeight:"700"}}>
                        Ngày Bắt Đầu :
                    </label>
                    <input type="date" onChange={(event)=>setStartDate(formatDate(event.target.value))} className={styles.input} style={{width:"15rem"}}/>
                </div>
                <div>
                    <label style={{fontSize:"1rem",marginRight:"0.5rem",fontWeight:"700"}}>
                        Ngày Kết Thúc :
                    </label>
                    <input type="date" onChange={(event)=>setEndDate(formatDate(event.target.value))} className={styles.input} style={{width:"15rem"}}/>
                </div>
                <select onChange={(event)=>setStatus(event.target.value)} style={{height:"3rem",padding:"0.3rem"}}>
                    <option defaultChecked style={{display:'none'}}>Trạng Thái</option>
                    <option value="">Tất Cả</option>
                    <option value="ChoDuyet">Chờ Duyệt</option>
                    <option value="DaDuyet">Đã Duyệt</option>
                    <option value="Huy">Đã Hủy</option>
                    <option value="GiaoThanhCong">Giao Thành Công</option>
                </select>
                {
                    amount !== 0 ?
                    <div style={{marginLeft:"auto"}}>
                        <StaffPagination itemsPerPage={30} onChange={setPage} amount={amount}/>
                    </div>
                    :
                    <></>
                }
            </div>
            <div className={styles.boxTable}>
                <Table isCEO={isCEO} heads={["Mã Đơn Hàng","Tên Khách Hàng","Email","Ngày Đặt Hàng","Tổng Giá Trị","Trạng Thái","Phương Thức","Thao Tác"]} bodys={orders} setFlag={handleFlag}/>
            </div>
        </div>
    )
}
export default Orders