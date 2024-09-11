import React, { useEffect, useState } from "react";
import styles from "./Suppliers.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import StaffPagination from "../../../layouts/components/Staff/StaffPagination/StaffPagination"
import Table from "./Table/Table";
import { useNavigate } from "react-router-dom";
import { getAllSupplier } from "../../../services/SupplierService";
import useDebounce from "../../../hooks/useDebounce";
const Suppliers = ({isCEO})=>{
    const [flag,setFlag] = useState(false)
    const [amount,setAmount] = useState(0)
    const [suppliers,setSuppliers] = useState([])
    const [search,setSearch] = useState("")
    const [page,setPage] = useState(1)
    const debouncedSearch = useDebounce(search,500)
    const navigate = useNavigate()
    useEffect(()=>{
        getAllSupplier(debouncedSearch,page,30).then((res)=>{
            setAmount(res.data.totalElements)
            setSuppliers(res.data.content)
        })
    },[page,debouncedSearch,flag])
    return (
        <div className={styles.wrapper}>
            <div style={{display:"flex",paddingTop:"1rem",paddingBottom:"1rem"}}>
                <h2>Nhà Cung Cấp</h2>
                <button style={{marginLeft:"auto",fontFamily:"Arial",fontSize:"1.5rem",fontWeight:"700",color:"white",backgroundColor:"rgb(65, 64, 64)",padding:"1rem",borderRadius:"0.6rem",cursor:"pointer"}} onClick={()=>{
                    isCEO !== "CEO" ?
                    navigate('/system/manager/supplier/add')
                    :
                    navigate('/system/ceo/supplier/add')
                    }
                }>Thêm Nhà Cung Cấp</button>
            </div>
            <div className={styles.boxFeature}>
                <div style={{position:"relative"}}>
                    <FontAwesomeIcon className={styles.icon} icon={faSearch}/>
                    <input onChange={(event)=>setSearch(event.target.value)} className={styles.input} placeholder="Tìm kiếm nhà cung cấp"/>
                </div>
                {
                    amount !== 0 ?
                    <div style={{marginLeft:"auto"}}>
                        <StaffPagination onChange={setPage} itemsPerPage={30} amount={amount}/>
                    </div>
                    :
                    <></>
                }
            </div>
            <div className={styles.boxTable}>
                <Table isCEO={isCEO} flag={flag} setFlag={setFlag} heads={["Mã Nhà Cung Cấp","Tên Nhà Cung Cấp","Số Điện Thoại","Email","Thao Tác"]} bodys={suppliers}/>
            </div>
        </div>
    )
}
export default Suppliers