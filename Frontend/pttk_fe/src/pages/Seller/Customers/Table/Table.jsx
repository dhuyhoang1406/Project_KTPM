import React from "react";
import styles from "./Table.module.scss"
import { useNavigate } from "react-router-dom";
import { deleteUser ,undeleteUser } from "../../../../services/UserService";
import { formatDateMMDDYYYY } from "../../../../services/FeatureService";
const Table = ({heads,bodys,setShowModal,setId,setName,setPhone,setDate,setGender,setAddress,change})=>{
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
                                <td className={styles.td} key={index+"maTK"}>{body.maTK}</td>
                                <td className={styles.td} key={index+"name"}>{body.hoTen}</td>
                                <td className={styles.td} key={index+"birth"}>{body.ngaySinh}</td>
                                <td className={styles.td} key={index+"diaChi"}>{body.diaChi}</td>
                                <td className={styles.td} key={index+"gioiTinh"}>{body.gioiTinh}</td>
                                <td className={styles.td} key={index+"sdt"}>{body.soDienThoai}</td>
                                <td className={styles.td} key={index+"email"}>{body.email}</td>
                                <td className={styles.td}>
                                {
                                        body.trangThai ? 
                                        <button className={styles.delete} onClick={async()=>{
                                            if(window.confirm("Xác nhận khóa khách hàng ?")){
                                                await deleteUser(body.maTK)
                                                change()
                                        }}}>Khóa</button>
                                        :
                                        <button className={styles.green} onClick={async()=>{
                                            if(window.confirm("Xác nhận mở khóa khách hàng ?")){
                                                await undeleteUser(body.maTK)
                                                change()
                                        }}}>Mở</button>
                                    }
                                    
                                    <button className={styles.edit} onClick={()=>{
                                            setId(body.maTK);
                                            setAddress(body.diaChi)
                                            setDate(formatDateMMDDYYYY(body.ngaySinh))
                                            setName(body.hoTen)
                                            setGender(body.gioiTinh)
                                            setPhone(body.soDienThoai)
                                            setShowModal(true)
                                        }}>Sửa</button>
                                </td>
                            </tr>
                        )
                    }else{
                        return (
                            <tr key={index} className={styles.odd}>
                            <td className={styles.td} key={index+"maTK"}>{body.maTK}</td>
                                <td className={styles.td} key={index+"name"}>{body.hoTen}</td>
                                <td className={styles.td} key={index+"birth"}>{body.ngaySinh}</td>
                                <td className={styles.td} key={index+"diaChi"}>{body.diaChi}</td>
                                <td className={styles.td} key={index+"gioiTinh"}>{body.gioiTinh}</td>
                                <td className={styles.td} key={index+"sdt"}>{body.soDienThoai}</td>
                                <td className={styles.td} key={index+"email"}>{body.email}</td>
                                <td className={styles.td}>
                                    {
                                        body.trangThai ? 
                                        <button className={styles.delete} onClick={async()=>{
                                            if(window.confirm("Xác nhận khóa khách hàng ?")){
                                                await deleteUser(body.maTK)
                                                change()
                                        }}}>Khóa</button>
                                        :
                                        <button className={styles.green} onClick={async()=>{
                                            if(window.confirm("Xác nhận mở khóa khách hàng ?")){
                                                await undeleteUser(body.maTK)
                                                change()
                                        }}}>Mở</button>
                                    }
                                    
                                    <button className={styles.edit} onClick={()=>{
                                            setId(body.maTK);
                                            setAddress(body.diaChi)
                                            setDate(formatDateMMDDYYYY(body.ngaySinh))
                                            setName(body.hoTen)
                                            setGender(body.gioiTinh)
                                            setPhone(body.soDienThoai)
                                            setShowModal(true)
                                        }}>Sửa</button>
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