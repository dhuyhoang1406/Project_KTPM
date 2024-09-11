import React from "react";
import styles from "./TableAddProduct.module.scss"
import { convertPrice } from "../../../../../services/FeatureService";
const TableAddProducts = ({id,heads,bodys,handleProduct,handlePrice,handleAmount})=>{
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
                    id ?
                    bodys?.length !== 0 ?
                    bodys?.map((body,index)=>{
                        if (index%2===0) {
                            return (
                                <tr key={index} className={styles.even}>
                                    <td className={styles.td} key={index+"TenSP"}>{body.tenSanPham}</td>
                                    <td className={styles.td} key={index+"sl"}>{body.soLuong}</td>
                                    <td className={styles.td} key={index+"dgn"}>{convertPrice(body.donGiaNhap)}</td>
                                    <td className={styles.td} key={index+"tt"}>{convertPrice(body.thanhTien)}</td>
                                </tr>
                            )
                        } else {
                            return (
                                <tr key={index} className={styles.odd}>
                                    <td className={styles.td} key={index+"TenSP"}>{body.tenSanPham}</td>
                                    <td className={styles.td} key={index+"sl"}>{body.soLuong}</td>
                                    <td className={styles.td} key={index+"dgn"}>{convertPrice(body.donGiaNhap)}</td>
                                    <td className={styles.td} key={index+"tt"}>{convertPrice(body.thanhTien)}</td>
                                </tr>
                            )
                        }
                    })
                    :
                    <tr>
                        <td colSpan={4} style={{textAlign:'center',fontWeight:"700",padding:"1rem"}}>
                            Chưa có bất kì sản phẩm nào 
                        </td>
                    </tr>
                    :
                    bodys?.length !== 0 ?
                    bodys?.map((body,index)=>{
                        if (index%2===0) {
                            return (
                                <tr key={index} className={styles.even}>
                                    <td className={styles.td} key={index+"name"}>{body.name}</td>
                                    <td className={styles.td} key={index+"sl"}>
                                        <input min={0} style={{textAlign:'center',padding:"0.5rem",border:"1px solid rgb(90,90,90)"}} onChange={(event)=>handleAmount(body.id,parseInt(event.target.value,10))} type="number" value={body.amount}/>
                                    </td>
                                    <td className={styles.td} key={index+"dgn"}>
                                        <input min={0} style={{textAlign:'center',padding:"0.5rem",border:"1px solid rgb(90,90,90)"}} onChange={(event)=>handlePrice(body.id,parseInt(event.target.value,10))} type="number" value={body.price}/> VND
                                    </td>
                                    <td className={styles.td} key={index+"tt"}>{convertPrice((body.amount?body.amount:0) * (body.price?body.price:0))}</td>
                                    <td className={styles.td} key={index+"action"} >
                                        <button onClick={()=>handleProduct(body.id,body.name)} className={styles.delete}>Xóa</button>
                                    </td>
                                </tr>
                            )
                        } else {
                            return (
                                <tr key={index} className={styles.odd}>
                                    <td className={styles.td} key={index+"name"}>{body.name}</td>
                                    <td className={styles.td} key={index+"sl"}>
                                        <input style={{textAlign:'center',padding:"0.5rem",border:"1px solid rgb(90,90,90)"}} onChange={(event)=>handleAmount(body.id,parseInt(event.target.value,10))} type="number" value={body.amount}/>
                                    </td>
                                    <td className={styles.td} key={index+"dgn"}>
                                        <input style={{textAlign:'center',padding:"0.5rem",border:"1px solid rgb(90,90,90)"}} onChange={(event)=>handlePrice(body.id,parseInt(event.target.value,10))} type="number" value={body.price}/> VND
                                    </td>
                                    <td className={styles.td} key={index+"tt"}>{convertPrice((body.amount?body.amount:0) * (body.price?body.price:0))}</td>
                                    <td className={styles.td} key={index+"action"}>
                                        <button onClick={()=>handleProduct(body.id,body.name)} className={styles.delete}>Xóa</button>
                                    </td>
                                </tr>
                            )
                        }
                    })
                    :
                    <tr>
                        <td colSpan={4} style={{textAlign:'center',fontWeight:"700",padding:"1rem"}}>
                            Chưa có bất kì sản phẩm nào 
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    )
}
export default TableAddProducts