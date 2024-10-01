import axios from "axios"
import { axiosJWT } from "./UserService"
import { success ,error as errorMessage } from "../components/Message/Message";
const JWT = localStorage.getItem("Authorization")
export const getAllProductForUser = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/SanPham?trangThai=true`);
    return res
}

export const getAllProductForSearch = async (search) => {
    let res = {};
    if(search){
        res = await axios.get(`${process.env.REACT_APP_API_URL}/SanPham?search=${search}&trangThai=true`);
    }    
    return res?.data?.content;
  };


//api Loại Sản Phẩm
export const getProductType = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/LoaiSanPham`)
        return res
}

export const getAllProduct = async (search, page, size, minThetich, maxTheTich, minNongdoCon, maxNongdoCon, minGia, maxGia,tenLoaiSanPham,trangThai) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/SanPham?sort=maSP&pageNumber=${page}${size && `&size=${size}`}${minThetich ? `&minTheTich=${minThetich}` :''}${maxTheTich ? `&maxTheTich=${maxTheTich}` : ''}${minNongdoCon ? `&minNongDoCon=${minNongdoCon}` : ''}${maxNongdoCon ? `&maxNongDoCon=${maxNongdoCon}` : '' }${minGia ? `&minGia=${minGia}` : ''}${maxGia ? `&maxGia=${maxGia}` : ''}${tenLoaiSanPham ? `&tenLoaiSanPham=${tenLoaiSanPham}` : ''}${search ? `&search=${search}` : ''}${trangThai ? `&trangThai=${trangThai}` : ''}`,{
        headers: {
            "Authorization": JWT
        }
    });
    return res;
};


export const createProduct = async (data) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/SanPham`, data,{
            headers: {
                "Authorization": JWT
            }
        })
        success("Tạo thành công")
    } catch (error) {
        errorMessage(`Tạo thất bại`)
    }

}

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/SanPham/${id}`)
    return res
}

export const updateProduct = async (id, data) => {
    try {
        await axiosJWT.put(`${process.env.REACT_APP_API_URL}/SanPham/${id}`, data,{
            headers: {
                "Authorization": JWT
            }
        })
        success("Cập nhật thành công")
    } catch (error) {
        console.log(error.response)
        errorMessage(`Cập nhật thất bại : ${error.response.data.detailMessage}`)
    }
}

export const deleteProduct = async (id) => {
    try {
        await axiosJWT.put(`${process.env.REACT_APP_API_URL}/SanPham/business=false/${id}`,{
            headers: {
                "Authorization": JWT
            }
        })
        success("Đã khóa thành công sản phẩm !!")
    } catch (error) {
        errorMessage(`Xóa thất bại : ${error.response.data.error.message}`)
    }
}
export const undeleteProduct = async (id) => {
    try {
        await axiosJWT.put(`${process.env.REACT_APP_API_URL}/SanPham/business=true/${id}`,{
            headers: {
                "Authorization": JWT
            }
        })
        success("Đã mở khóa thành công sản phẩm !!")
    } catch (error) {
        errorMessage(`Xóa thất bại : ${error.response.data.error.message}`)
    }
}

export const deleteManyProduct = async (data, access_token,) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}`, data, {
         //quyền
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/LoaiSanPham`)
    return res.data
}