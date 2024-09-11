import React from "react";
import styles from "./Table.module.scss"
import { useNavigate } from "react-router-dom";
import { deleteCategory } from "../../../../services/CategoriesService";
const Table = ({heads,bodys,flag,setFlag,isCEO})=>{
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
                                    <td className={styles.td} key={index+"maLSP"}>{body.maLoaiSanPham}</td>
                                    <td className={styles.td} key={index+"tenLSP"}>{body.tenLoaiSanPham}</td>
                                    {
                                        body.maLoaiSanPham === 1
                                        ?
                                        <td className={styles.td}>Mặc định</td>
                                        :
                                        <td className={styles.td}>
                                            <button className={styles.delete} onClick={async ()=>{
                                                if(window.confirm("Xác nhận xóa loại sản phẩm ?")){
                                                    await deleteCategory(body.maLoaiSanPham)
                                                    setFlag(!flag)
                                                }
                                            }}>Xóa</button>
                                            <button className={styles.edit} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/manager/categories/update/${body.maLoaiSanPham}`) : navigate(`/system/ceo/categories/update/${body.maLoaiSanPham}`)}}>Sửa</button>
                                        </td>
                                    }
                                </tr>
                            )
                        }else{
                            return (
                                <tr key={index} className={styles.odd}>
                                    <td className={styles.td} key={index+"maLSP"}>{body.maLoaiSanPham}</td>
                                    <td className={styles.td} key={index+"tenLSP"}>{body.tenLoaiSanPham}</td>
                                    <td className={styles.td} key={index+"action"}>
                                    {
                                        body.tenLoaiSanPham === "Loại sản phẩm khác" 
                                        ?
                                        "Mặc định"
                                        :
                                        <>
                                        <button className={styles.delete} onClick={async ()=>{
                                                if(window.confirm("Xác nhận xóa loại sản phẩm ?")){
                                                    await deleteCategory(body.maLoaiSanPham)
                                                    setFlag(!flag)
                                                }
                                            }}>Xóa</button>
                                            <button className={styles.edit} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/manager/categories/update/${body.maLoaiSanPham}`) : navigate(`/system/ceo/categories/update/${body.maLoaiSanPham}`)}}>Sửa</button>
                                        </>
                                    }</td>
                                </tr>
                            )
                        }
                    })
                    :
                    <tr>
                        <td colSpan={5} style={{textAlign:'center',fontWeight:"700",padding:"1rem"}}>Không tìm thấy bất kì loại sản phẩm nào</td>
                    </tr>
                }
            </tbody>
        </table>
    )
}
export default Table