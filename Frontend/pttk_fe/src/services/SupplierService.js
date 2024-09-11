import axios from "axios";
import { success , error as errorMessage } from "../components/Message/Message";
const JWT = localStorage.getItem("Authorization")
export const getAllSupplier = async (search,page,size)=>{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/NhaCungCap?pageNumber=${page}${size && `&size=${size}`}${search ? `&search=${search}` : ''}`,{
        headers: {
            "Authorization": JWT
        }
    });
    return res;
}
export const deleteSupplier = async (id)=>{
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/NhaCungCap/${id}`,{
            headers: {
                "Authorization": JWT
            }
        })
        success("Xóa thành công")
    } catch (error) {
        errorMessage(`Xóa thất bại : ${error.response.data.error.message}`)
    }
    
}
export const getSupplier = async (id)=>{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/NhaCungCap/${id}`,{
        headers: {
            "Authorization": JWT
        }
    })
    return res
}
export const updateSupplier = async (id,tenNCC,soDienThoai,email)=>{
    try {
        await axios.put(`${process.env.REACT_APP_API_URL}/NhaCungCap/${id}`,{tenNCC,soDienThoai,email},{
            headers: {
                "Authorization": JWT
            }
        })
        success("Cập nhật thành công")
    } catch (error) {
        errorMessage(`Cập nhật thất bại : ${error.response.data.detailMessage}`)
    }
}
export const createSupplier = async (tenNCC,soDienThoai,email)=>{
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/NhaCungCap`,{tenNCC,soDienThoai,email},{
            headers: {
                "Authorization": JWT
            }
        })
        success("Tạo thành công")
    } catch (error) {
        errorMessage(`Tạo thất bại :${error.response.data.detailMessage}`)
    }
    
}