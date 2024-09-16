import axios from "axios"
import { success , error as errorMessage } from "../components/Message/Message"
const JWT = localStorage.getItem("Authorization")
export const getAllReceipt = async (page,size,date) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/PhieuNhapKho?sort=ngayNhapKho,desc&pageNumber=${page}${size && `&size=${size}`}${date && `&month=${parseInt(date.split("-")[1],10)}`}${date && `&year=${parseInt(date.split("-")[0],10)}`}`,{
        headers: {
            "Authorization": JWT
        }
    })
    return res
}
export const getReceipt = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/PhieuNhapKho/${id}`,{
        headers: {
            "Authorization": JWT
        }
    })
    return res
}
export const createReceipt = async (data) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/PhieuNhapKho`,data,{
            headers: {
                "Authorization": JWT
            }
        })
        success("Tạo thành công")
    } catch (error) {
        errorMessage("Tạo thất bại")
    }
}