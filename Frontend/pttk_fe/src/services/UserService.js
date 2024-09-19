import axios from "axios"
import { success , error as errorMessage } from "../components/Message/Message"
const JWT = localStorage.getItem("Authorization")
export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/auth/login/1`,
    {
        headers: {
            "Authorization": JWT
        }
    },)
    return res
}

export const signupUser = async (data) => {
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/TaiKhoan`, data)
        return res

    }catch (error) {
        console.log(error);
        console.log(error.response)
        console.log(error.response.data)
        console.log(error.response.data.code)
        if (error.response.data.detailMessage === "Email này đã có người dùng !!") {
            throw new Error(`Tạo thất bại : ${error.response.data.detailMessage}`);
        } else {
            throw new Error(`Tạo thất bại : ${error.response.data.message}`);
        }
    }

}

export const getDetailsUser = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/TaiKhoan/${id}`,{
        headers: {
            "Authorization": JWT
        }
    },)
    return res
}
export const updateUser = async (id,data) => {
    try {
        console.log(data)
        await axiosJWT.put(`http://localhost:8080/api/v1/TaiKhoan/${id}`,data,{
            headers: {
                "Authorization": JWT
            }
        })
        success("Cập nhật thành công")
    } catch (error) {
        errorMessage(`Cập nhật thất bại`)
    }
}

export const createUser = async (data) => {
    try {
        await axiosJWT.post(`http://localhost:8080/api/v1/TaiKhoan`,data,{
            headers: {
                "Authorization": JWT
            }
        })
        success("Tạo thành công")
    } catch (error) {
        console.log(error);
        console.log(error.response)
        console.log(error.response.data)
        console.log(error.response.data.code)

        if (error.response.data.detailMessage === "Email này đã có người dùng !!"){
            errorMessage(`Tạo thất bại : ${error.response.data.detailMessage}`)
        }else{
            errorMessage(`Tạo thất bại : ${error.response.data.message}`)
        }
    }
}

export const deleteUser = async (id) => {
    try {
        await axiosJWT.put(`http://localhost:8080/api/v1/TaiKhoan/globalBan/${id}`,{
            headers: {
                "Authorization": JWT
            }
        })
        success("Khóa thành công")
    } catch (error) {
        errorMessage(`Khóa thất bại : ${error.response.data.error.message}`)
    }
}
export const undeleteUser = async (id) => {
    try {
        await axiosJWT.put(`http://localhost:8080/api/v1/TaiKhoan/unban/${id}`,{
            headers: {
                "Authorization": JWT
            }
        })
        success("Mở khóa thành công")
    } catch (error) {
        errorMessage(`Mở khóa thất bại : ${error.response.data.error.message}`)
    }
}

export const getAllUser = async (page,size,role,search) => {
    const res = await axios.get(`http://localhost:8080/api/v1/TaiKhoan?sort=vaiTro&pageNumber=${page}${size && `&size=${size}`}${role ? `&vaiTro=${role}` :''}${search ? `&search=${search}` : ''}`)
    return res
}

export const changePassword = async (id,data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/TaiKhoan/newPass/${id}`, data,{
        headers: {
            "Authorization": JWT
        }
    },)
    return res
}

export const signOut = () => {
    const keys = Object.keys(localStorage);
    // Duyệt qua mỗi key và xóa nó
    keys.forEach(key => {
        localStorage.removeItem(key);
    });
    window.location.href = "http://localhost:3000/"
}