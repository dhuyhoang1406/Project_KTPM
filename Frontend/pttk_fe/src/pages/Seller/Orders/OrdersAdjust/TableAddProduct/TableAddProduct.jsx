import React from "react";
import styles from "./TableAddProduct.module.scss"
import { convertPrice } from "../../../../../services/FeatureService";
const TableAddProducts = ({heads,bodys})=>{
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
                    bodys?.danhSachCTDH.map((body,index)=>{
                        if (index%2===0) {
                            return (
                                <tr key={index} className={styles.even}>
                                    <td className={styles.td} style={{width:'10rem',height:"10rem"}} key={index+"hinhAnh"}><img src={body.anhMinhHoa} style={{width:"100%"}}/></td>
                                    <td className={styles.td} key={index+"TenSP"}>{body.tenSanPham}</td>
                                    <td className={styles.td} key={index+"sl"}>{body.soLuong}</td>
                                    <td className={styles.td} key={index+"dgn"}>{convertPrice(body.donGia)}</td>
                                    <td className={styles.td} key={index+"tt"}>{convertPrice(body.thanhTien)}</td>
                                </tr>
                            )
                        } else {
                            return (
                                <tr key={index} className={styles.odd}>
                                    <td className={styles.td} style={{width:'10rem',height:"10rem"}} key={index+"hinhAnh"}><img src={body.anhMinhHoa} style={{width:"100%"}}/></td>
                                    <td className={styles.td} key={index+"TenSP"}>{body.tenSanPham}</td>
                                    <td className={styles.td} key={index+"sl"}>{body.soLuong}</td>
                                    <td className={styles.td} key={index+"dgn"}>{convertPrice(body.donGia)}</td>
                                    <td className={styles.td} key={index+"tt"}>{convertPrice(body.thanhTien)}</td>
                                </tr>
                            )
                        }
                    })
                }
            </tbody>
        </table>
    )
}
export default TableAddProducts