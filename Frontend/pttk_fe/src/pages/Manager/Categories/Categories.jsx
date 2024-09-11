import React, { useEffect, useState } from "react";
import styles from "./Categories.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import StaffPagination from "../../../layouts/components/Staff/StaffPagination/StaffPagination"
import Table from "./Table/Table";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import { getAllCategories } from "../../../services/CategoriesService";
const Categories = ({isCEO})=>{
    const [flag,setFlag] = useState(false)
    const [amount,setAmount] = useState(0)
    const [categories,setCategories] = useState([])
    const [search,setSearch] = useState("")
    const [page,setPage] = useState(1)
    const debouncedSearch = useDebounce(search,500)
    const navigate = useNavigate()
    useEffect(()=>{
        getAllCategories({search:debouncedSearch,page:page,size:30}).then((res)=>{
            setAmount(res.data.totalElements)
            setCategories(res.data.content)
        })
    },[page,debouncedSearch,flag])
    return (
        <div className={styles.wrapper}>
            <div style={{display:"flex",paddingTop:"1rem",paddingBottom:"1rem"}}>
                <h2>Loại Sản Phẩm</h2>
                <button style={{marginLeft:"auto",fontFamily:"Arial",fontSize:"1.5rem",fontWeight:"700",color:"white",backgroundColor:"rgb(65, 64, 64)",padding:"1rem",borderRadius:"0.6rem",cursor:"pointer"}} onClick={()=>{
                    isCEO !== "CEO" ?
                    navigate('/system/manager/categories/add')
                    :
                    navigate('/system/ceo/categories/add')
                }}>Thêm Loại Sản Phẩm</button>
            </div>
            <div className={styles.boxFeature}>
                <div style={{position:"relative"}}>
                    <FontAwesomeIcon className={styles.icon} icon={faSearch}/>
                    <input onChange={(event)=>setSearch(event.target.value)} className={styles.input} placeholder="Tìm kiếm loại sản phẩm"/>
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
                <Table isCEO={isCEO} flag={flag} setFlag={setFlag} heads={["Mã Loại Sản Phẩm","Tên Loại Sản Phẩm","Thao Tác"]} bodys={categories}/>
            </div>
        </div>
    )
}
export default Categories