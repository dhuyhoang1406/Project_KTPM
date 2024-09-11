import React from "react";
import styles from "./Table.module.scss"
import { convertPrice } from "../../../../services/FeatureService";
import { useNavigate } from "react-router-dom";
import Pdf from "../PDF/Pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
const Table = ({isCEO,heads,bodys})=>{
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
                        if(index%2===0){
                            return (
                                <tr key={index} className={styles.even}>
                                    <td className={styles.td} key={index+"maPhieu"}>{body.maPhieu}</td>
                                    <td className={styles.td} key={index+"ngayNhap"}>{body.ngayNhapKho}</td>
                                    <td className={styles.td} key={index+"name"}>{body.tenNhaCungCap}</td>
                                    <td className={styles.td} key={index+"manager"}>{body.hoTenQuanLy}</td>
                                    <td className={styles.td} key={index+"total"}>{convertPrice(body.tongGiaTri)}</td>
                                    <td className={styles.td}>
                                        <button className={styles.edit} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/manager/inventory/details/${body.maPhieu}`) : navigate(`/system/ceo/inventory/details/${body.maPhieu}`)}}>Chi Tiết</button>
                                        <PDFDownloadLink document={<Pdf products={body}/>} fileName="PhieuNhapKho">
                                            {({ loading }) => 
                                                loading ? (
                                                    <button className={styles.export}>Đang Tải...</button>
                                                ) : (
                                                    <button className={styles.export}>Xuất Phiếu</button>
                                                )
                                            }  
                                        </PDFDownloadLink>
                                    </td>
                                </tr>
                            )
                        }else{
                            return (
                                <tr key={index} className={styles.odd}>
                                    <td className={styles.td} key={index+"maPhieu"}>{body.maPhieu}</td>
                                    <td className={styles.td} key={index+"ngayNhap"}>{body.ngayNhapKho}</td>
                                    <td className={styles.td} key={index+"name"}>{body.tenNhaCungCap}</td>
                                    <td className={styles.td} key={index+"manager"}>{body.hoTenQuanLy}</td>
                                    <td className={styles.td} key={index+"total"}>{convertPrice(body.tongGiaTri)}</td>
                                    <td className={styles.td}>
                                        <button className={styles.edit} onClick={()=>{isCEO !== "CEO" ? navigate(`/system/manager/inventory/details/${body.maPhieu}`) : navigate(`/system/ceo/inventory/details/${body.maPhieu}`)}}>Chi Tiết</button>
                                        <PDFDownloadLink document={<Pdf products={body}/>} fileName="PhieuNhapKho">
                                            {({ loading }) => 
                                                loading ? (
                                                    <button className={styles.export}>Đang Tải...</button>
                                                ) : (
                                                    <button className={styles.export}>Xuất Phiếu</button>
                                                )
                                            }  
                                        </PDFDownloadLink>
                                    </td>
                                </tr>
                            )
                        }
                    })
                    :
                    <tr>
                        <td colSpan={6} style={{textAlign:'center',fontWeight:"700",padding:"1rem"}}>
                            Không tìm thấy bất kì phiếu nào
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    )
}
export default Table