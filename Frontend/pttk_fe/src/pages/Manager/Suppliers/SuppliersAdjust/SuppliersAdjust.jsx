import React, { useEffect, useState } from "react";
import styles from "./SuppliersAdjust.module.scss"
import { useNavigate, useParams } from "react-router-dom";
import { createSupplier, getSupplier, updateSupplier } from "../../../../services/SupplierService";
import { error } from "../../../../components/Message/Message";
import { isValidPhoneNumber } from "../../../../utils";
const SuppliersAdjust = ({isCEO})=>{
    const { id } = useParams()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        if(id){
            getSupplier(id).then((res)=>{
                setName(res.data.tenNCC)
                setEmail(res.data.email)
                setPhone(res.data.soDienThoai)
            })
        }
    },[id])
    return (
        <div className={styles.wrapper}>
            <div style={{display:"flex",paddingTop:"1rem",alignItems:"center",gap:"1rem",paddingBottom:"1rem"}}>
            </div>
            <div className={styles.boxFeature}>
                <div>
                    <h2 style={{fontSize:"2.3rem"}}>Nhà cung cấp</h2>
                    <p style={{fontSize:"1.1rem",fontWeight:"700"}}>Nhà cung cấp / Xem và chỉnh sửa</p>
                </div>
                <div>
                    <button style={{fontFamily:"Arial",fontSize:"1.5rem",fontWeight:"700",border:"1px solid rgb(140,140,140)",backgroundColor:"white",color:"rgb(80,80,80)",padding:"1rem 2rem 1rem 2rem",borderRadius:"0.6rem",cursor:"pointer"}} onClick={()=>{isCEO !== "CEO" ? navigate("/system/manager/supplier") : navigate("/system/ceo/supplier")}}>Hủy</button>
                    <button style={{marginLeft:"1rem",fontFamily:"Arial",fontSize:"1.5rem",fontWeight:"700",color:"white",backgroundColor:"rgb(65, 64, 64)",padding:"1rem 2rem 1rem 2rem",borderRadius:"0.6rem",cursor:"pointer"}} onClick={async()=>{
                       if (name && email && phone) {
                        if (/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
                            if (isValidPhoneNumber(phone)) {
                                if (id) {
                                    await updateSupplier(id, name, phone, email);
                                } else {
                                    await createSupplier(name, phone, email);
                                }
                            } else {
                                error("Vui lòng nhập số điện thoại hợp lệ");
                            }
                        } else {
                            error("Sai định dạng email"); 
                        }
                    } else {
                        error("Thông tin không được để trống");
                    }
                    
                    }}>Lưu</button>
                </div>
            </div>
            <div className={styles.boxTable}>
                <h2>Thông tin nhà cung cấp</h2>
                <div style={{display:'flex',padding:"0rem 1rem 0rem 1rem",justifyContent:"space-between"}}>
                    <div>
                        <p style={{fontWeight:"700",fontSize:"1.5rem"}}>Chi tiết nhà cung cấp</p>
                        <div>
                            
                            <div style={{display:'flex',gap:"2rem"}}>
                                <div>
                                    <p className={styles.text}>Mã nhà cung cấp</p>
                                    <input disabled value={id&&id} className={styles.input} style={{width:"40rem",backgroundColor:"white"}} />
                                </div>
                                <div>
                                    <p className={styles.text}>Tên nhà cung cấp</p>
                                    <input className={styles.input} value={name&&name} onChange={(event)=>setName(event.target.value)} style={{width:"70rem"}} placeholder="Tên nhà cung cấp"/>
                                </div>
                            </div>
                            {/* <span style={{marginLeft:"1rem",fontWeight:"700",color:"rgb(150, 150, 150)"}}>* Nồng Độ Cồn Không Quá 70% *</span> */}

                            <div style={{display:'flex',gap:"2rem"}}>
                                <div>
                                    <p className={styles.text}>Số điện thoại</p>
                                    <input value={phone&&phone} onChange={(event)=>{
                                        if(/^[\+\(\)\d\s]*$/.test(event.target.value)){
                                            setPhone(event.target.value)
                                        }
                                    }}  className={styles.input} placeholder="Số điện thoại"/>
                                </div>
                                <div>
                                    <p className={styles.text}>Email</p>
                                    <input className={styles.input} value={email&&email} onChange={(event)=>setEmail(event.target.value)}  style={{width:"60rem"}} placeholder="Email"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default SuppliersAdjust