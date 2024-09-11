import React from "react";
import styles from "./Table.module.scss"
import { deleteUser, undeleteUser } from "../../../services/UserService";
import { formatDateMMDDYYYY } from "../../../services/FeatureService";
const Table = ({heads,bodys,setShowModal,setId,setName,setPhone,setDate,setGender,setAddress,setChooseRole,setStatus})=>{
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
                        if(index%2===0){
                            return (
                                <tr key={index} className={styles.even}>
                                    <td className={styles.td} key={index+"maTK"}>{body.maTK}</td>
                                    <td className={styles.td} key={index+"hoTen"}>{body.hoTen}</td>
                                    <td className={styles.td} key={index+"birth"}>{body.ngaySinh}</td>
                                    <td className={styles.td} key={index+"diaChi"}>{body.diaChi}</td>
                                    <td className={styles.td} key={index+"gioiTinh"}>{body.gioiTinh}</td>
                                    <td className={styles.td} key={index+"email"}>{body.email}</td>
                                    <td className={styles.td} key={index+"soDienThoai"}>{body.soDienThoai}</td>
                                    <td className={styles.td} key={index+"vaiTro"}>{body.vaiTro}</td>
                                    {
                                        body.vaiTro === "Admin" 
                                        ?
                                        <td>
                                            Mặc định
                                        </td>
                                        :
                                        <td className={styles.td}>
                                        {
                                            body.trangThai ? 
                                            <button className={styles.delete} onClick={async()=>{
                                                if(window.confirm("Xác nhận khóa khách hàng ?")){
                                                    await deleteUser(body.maTK)
                                                    setStatus()
                                            }}}>Khóa</button>
                                            :
                                            <button className={styles.green} onClick={async()=>{
                                                if(window.confirm("Xác nhận mở khóa khách hàng ?")){
                                                    await undeleteUser(body.maTK)
                                                    setStatus()
                                            }}}>Mở</button>
                                        }
                                        <button className={styles.edit} onClick={()=>{
                                            setId(body.maTK);
                                            setAddress(body.diaChi)
                                            setDate(formatDateMMDDYYYY(body.ngaySinh))
                                            setName(body.hoTen)
                                            setGender(body.gioiTinh)
                                            setPhone(body.soDienThoai)
                                            setChooseRole(body.vaiTro)
                                            setShowModal(true)
                                            }}>Sửa</button>
                                    </td>   
                                    }
                                </tr>
                            )
                        }else{
                            return (
                                <tr key={index} className={styles.odd}>
                                    <td className={styles.td} key={index+"maTK"}>{body.maTK}</td>
                                    <td className={styles.td} key={index+"hoTen"}>{body.hoTen}</td>
                                    <td className={styles.td} key={index+"birth"}>{body.ngaySinh}</td>
                                    <td className={styles.td} key={index+"diaChi"}>{body.diaChi}</td>
                                    <td className={styles.td} key={index+"gioiTinh"}>{body.gioiTinh}</td>
                                    <td className={styles.td} key={index+"email"}>{body.email}</td>
                                    <td className={styles.td} key={index+"soDienThoai"}>{body.soDienThoai}</td>
                                    <td className={styles.td} key={index+"vaiTro"}>{body.vaiTro}</td>
                                    {
                                        body.vaiTro === "Admin" 
                                        ?
                                        <td>
                                            Mặc định
                                        </td>
                                        :
                                        <td className={styles.td}>
                                        {
                                            body.trangThai ? 
                                            <button className={styles.delete} onClick={async()=>{
                                                if(window.confirm("Xác nhận khóa khách hàng ?")){
                                                    await deleteUser(body.maTK)
                                                    setStatus()
                                            }}}>Khóa</button>
                                            :
                                            <button className={styles.green} onClick={async()=>{
                                                if(window.confirm("Xác nhận mở khóa khách hàng ?")){
                                                    await undeleteUser(body.maTK)
                                                    setStatus()
                                            }}}>Mở</button>
                                        }
                                        <button className={styles.edit} onClick={()=>{
                                            setId(body.maTK);
                                            setAddress(body.diaChi)
                                            setDate(formatDateMMDDYYYY(body.ngaySinh))
                                            setName(body.hoTen)
                                            setGender(body.gioiTinh)
                                            setPhone(body.soDienThoai)
                                            setChooseRole(body.vaiTro)
                                            setShowModal(true)
                                            }}>Sửa</button>
                                    </td>   
                                    }
                                </tr>
                            )
                        }
                    })
                    :
                    <tr>
                        <td colSpan={9} style={{textAlign:'center',fontWeight:"700",padding:"1rem"}}>
                            Không tìm thấy bất kì tài khoản nào 
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    )
}
export default Table