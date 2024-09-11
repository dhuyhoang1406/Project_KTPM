import React from "react";
import styles from "./Table.module.scss"
import { useNavigate } from "react-router-dom";
const Table = ({heads,bodys})=>{
    const navigate = useNavigate()
    return (
        <table className={styles.table}>
            <thead className={styles.head}>
                <tr>
                    <th className={styles.th}>STT</th>
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
                                <td className={styles.td}>{index+1}</td>
                                {body.map((item)=>{
                                    return (
                                        <td key={index+"item"} className={styles.td}>{item}</td>
                                    )
                                })}
                                <td className={styles.td}>
                                    <button className={styles.delete}>Xóa</button>
                                    <button className={styles.edit} onClick={()=>navigate("/system/admin/update/1")}>Sửa</button>
                                </td>
                            </tr>
                        )
                    }else{
                        return (
                            <tr key={index} className={styles.odd}>
                                <td className={styles.td}>{index+1}</td>
                                {body.map((item,index)=>{
                                    return (
                                        <td key={index+"item"} className={styles.td}>{item}</td>
                                    )
                                })}
                                <td className={styles.td}>
                                    <button className={styles.delete}>Xóa</button>
                                    <button className={styles.edit}  onClick={()=>navigate("/system/admin/update/1")}>Sửa</button>
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