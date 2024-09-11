import axios from "axios";
import { success , error as errorMessage } from "../components/Message/Message";
const JWT = localStorage.getItem("Authorization")
export const getAllCategories = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/LoaiSanPham?pageNumber=${data.page}${data.size && `&size=${data.size}`}${data.search ? `&search=${data.search}` :''}`,{
        headers: {
            "Authorization": JWT
        }
    })
    return res
}
export const getAllCategoriesWithOutPageable = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/LoaiSanPham/noPage`,{
        headers: {
            "Authorization": JWT
        }
    })
    return res
}
export const getCategory = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/LoaiSanPham/${id}`,{
        headers: {
            "Authorization": JWT
        }
    })
    return res
}
export const createCategory = async (data) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/LoaiSanPham`,data,{
            headers: {
                "Authorization": JWT
            }
        })
        success("Tạo thành công")
    } catch (error) {
        errorMessage(`Tạo thất bại : ${error.response.data.detailMessage}`)
    }
}
export const updateCategory = async (id ,data) => {
    try {
        await axios.put(`${process.env.REACT_APP_API_URL}/LoaiSanPham/${id}`,data,{
            headers: {
                "Authorization": JWT
            }
        })
        success("Cập nhật thành công")
    } catch (error) {
        errorMessage(`Cập nhật thất bại : ${error.response.data.detailMessage}`)
    }
}
export const deleteCategory = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/LoaiSanPham/${id}`,{
            headers: {
                "Authorization": JWT
            }
        })
        success("Xóa thành công")
    } catch (error) {
        errorMessage(`Xóa thất bại : ${error.response.data.message}`)
    }
}