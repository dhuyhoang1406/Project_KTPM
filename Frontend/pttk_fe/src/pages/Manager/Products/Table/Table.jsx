import React from "react";
import styles from "./Table.module.scss"
import { useNavigate } from "react-router-dom";
import { deleteProduct, undeleteProduct } from "../../../../services/ProductService";
import { convertPrice } from "../../../../services/FeatureService";
import { success } from "../../../../components/Message/Message";
const Table = ({isCEO,heads,bodys,setChange})=>{
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
                    {bodys?.length !== 0 ?
                        bodys?.map((body,index)=>{
                            if(index%2===0){
                                return (
                                    <tr key={index} className={styles.even}>
                                        <td className={styles.td} style={{width:'5rem',height:'5rem'}} key={index+'MASP'}>{body.maSP}</td>
                                        <td className={styles.td} style={{width:'10rem',height:'10rem'}} key={index+'anh'}><img style={{width:"100%"}} src={body.anhMinhHoa}></img></td>
                                        <td className={styles.td} style={{width:'10rem',height:'10rem'}} key={index+'ten'}>{body.tenSP}</td>
                                        <td className={styles.td} style={{width:'10rem',height:'10rem'}} key={index+'ten'}>{body.tenLoaiSanPham}</td>
                                        <td className={styles.td} key={index+'gia'}>{convertPrice(body.gia)}</td>
                                        <td className={styles.td} key={index+'nongDo'}>{body.nongDoCon}</td>
                                        <td className={styles.td} key={index+'theTich'}>{body.theTich}</td>
                                        <td className={styles.td} key={index+'xuatXu'}>{body.xuatXu}</td>
                                        <td className={styles.td} key={index+'thuongHieu'}>{body.thuongHieu}</td>
                                        <td className={styles.td} key={index+'soluong'}>{body.soLuongConLai}</td>
                                        <td className={styles.td}>
                                            {
                                                body.trangThai ?
                                                <button className={styles.delete} onClick={async()=>{
                                                    if(window.confirm("Xác nhận xóa sản phẩm")){
                                                        await deleteProduct(body.maSP)
                                                        setChange()
                                                    }
                                                }}>Khóa</button>
                                                :
                                                <button className={styles.green} onClick={async()=>{
                                                    if(window.confirm("Xác nhận xóa sản phẩm")){
                                                        await undeleteProduct(body.maSP)
                                                        setChange()
                                                    }
                                                }}>Mở</button>
                                            }
                                            
                                            <button className={styles.edit} onClick={()=>{
                                                isCEO !== 'CEO' ? 
                                                navigate(`/system/manager/products/update/${body.maSP}`)
                                                :
                                                navigate(`/system/ceo/products/update/${body.maSP}`)
                                                }}>Sửa</button>
                                        </td>
                                    </tr>
                                )
                            }else{
                                return (
                                    <tr key={index} className={styles.odd}>
                                        <td className={styles.td} style={{width:'5rem',height:'5rem'}} key={index+'MASP'}>{body.maSP}</td>
                                        <td className={styles.td} style={{width:'10rem',height:'10rem'}} key={index+'anh'}><img style={{width:"100%"}} src={body.anhMinhHoa}></img></td>
                                        <td className={styles.td} style={{width:'15rem',height:'10rem'}} key={index+'ten'}>{body.tenSP}</td>
                                        <td className={styles.td} style={{width:'10rem',height:'10rem'}} key={index+'ten'}>{body.tenLoaiSanPham}</td>
                                        <td className={styles.td} key={index+'gia'}>{convertPrice(body.gia)}</td>
                                        <td className={styles.td} key={index+'nongDo'}>{body.nongDoCon}</td>
                                        <td className={styles.td} key={index+'theTich'}>{body.theTich}</td>
                                        <td className={styles.td} key={index+'xuatXu'}>{body.xuatXu}</td>
                                        <td className={styles.td} style={{width:'5rem',height:'5rem'}} key={index+'thuongHieu'}>{body.thuongHieu}</td>
                                        <td className={styles.td} key={index+'soluong'}>{body.soLuongConLai}</td>
                                        <td className={styles.td}>
                                        {
                                                body.trangThai ?
                                                <button className={styles.delete} onClick={async()=>{
                                                    if(window.confirm("Xác nhận xóa sản phẩm")){
                                                        await deleteProduct(body.maSP)
                                                        setChange()
                                                    }
                                                }}>Khóa</button>
                                                :
                                                <button className={styles.green} onClick={async()=>{
                                                    if(window.confirm("Xác nhận xóa sản phẩm")){
                                                        await undeleteProduct(body.maSP)
                                                        setChange()
                                                    }
                                                }}>Mở</button>
                                            }
                                            <button className={styles.edit} onClick={()=>{
                                                isCEO !== 'CEO' ? 
                                                navigate(`/system/manager/products/update/${body.maSP}`)
                                                :
                                                navigate(`/system/ceo/products/update/${body.maSP}`)
                                                }}>Sửa</button>
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    :
                    <tr>
                        <td colSpan={9} style={{textAlign:'center',fontWeight:"700",padding:"1rem"}}>
                            Không tìm thấy bất kì sản phẩm nào 
                        </td>
                    </tr>
                    }
                </tbody>
        </table>
    )
}
export default Table