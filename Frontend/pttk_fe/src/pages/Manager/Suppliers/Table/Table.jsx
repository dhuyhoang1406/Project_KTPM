import React from "react";
import styles from "./Table.module.scss"
import { useNavigate } from "react-router-dom";
import { deleteSupplier } from "../../../../services/SupplierService";
const Table = ({isCEO,heads,bodys,flag,setFlag})=>{
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
                {
                    bodys?.length !== 0 ?
                    bodys?.map((body,index)=>{
                        console.log(body)

                        if(index%2===0){
                            return (
                                <tr key={index} className={styles.even}>
                                    <td className={styles.td} key={index+"maNCC"}>{body.maNCC}</td>
                                    <td className={styles.td} key={index+"tenNCC"}>{body.tenNCC}</td>
                                    <td className={styles.td} key={index+"sdtNCC"}>{body.soDienThoai}</td>
                                    <td className={styles.td} key={index+"emailNCC"}>{body.email}</td>
                                    <td className={styles.td} key={index+"action"}>
                                    {
                                        body.maNCC === 1 
                                        ?
                                        "Mặc định"
                                        :
                                        <>
                                        <button className={styles.delete} onClick={async()=>{
                                            if(window.confirm('Xác nhận xóa nhà cung cấp ?')){
                                                await deleteSupplier(body.maNCC)
                                                setFlag(!flag)
                                            }
                                        }}>Xóa</button>
                                        <button className={styles.edit} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/manager/supplier/update/${body.maNCC}`) : navigate(`/system/ceo/supplier/update/${body.maNCC}`)}}>Sửa</button>
                                        </>
                                    }
                                    </td>
                                </tr>
                            )
                        }else{
                            return (
                                <tr key={index} className={styles.odd}>
                                    <td className={styles.td} key={index+"maNCC"}>{body.maNCC}</td>
                                    <td className={styles.td} key={index+"tenNCC"}>{body.tenNCC}</td>
                                    <td className={styles.td} key={index+"sdtNCC"}>{body.soDienThoai}</td>
                                    <td className={styles.td} key={index+"emailNCC"}>{body.email}</td>
                                    {
                                        body.tenNCC == "Các nhà cung cấp khác" 
                                        ?
                                        <td>Mặc định</td>
                                        :
                                        <td className={styles.td}>
                                        <button className={styles.delete} onClick={async()=>{
                                            if(window.confirm('Xác nhận xóa nhà cung cấp ?')){
                                                await deleteSupplier(body.maNCC)
                                                setFlag(!flag)
                                            }
                                        }}>Xóa</button>
                                        <button className={styles.edit} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/manager/supplier/update/${body.maNCC}`) : navigate(`/system/ceo/supplier/update/${body.maNCC}`)}}>Sửa</button>
                                    </td>
                                    }
                                    
                                </tr>
                            )
                        }
                    })
                    :
                    <tr>
                        <td colSpan={5} style={{textAlign:'center',fontWeight:"700",padding:"1rem"}}>Không tìm thấy bất kì nhà cung cấp</td>
                    </tr>
                }
            </tbody>
        </table>
    )
}
export default Table