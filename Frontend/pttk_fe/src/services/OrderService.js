import { success , error as errorMessage } from "../components/Message/Message"
import { axiosJWT } from "./UserService"
import axios from "axios"
const JWT = localStorage.getItem("Authorization")
export const createOrder = async (data,account) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/DonHang`, data, {
     //quyền
     headers: {
      "Authorization": "Basic " + btoa(account?.Username + ":" + account?.Password)
      }
  },)
  return res
}

export const getOrderByUserId = async (id,account) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/DonHang/donHangCuaToi/${id}?sort=ngayDat,desc`, {
     //quyền
     headers: {
      "Authorization": "Basic " + btoa(account?.Username + ":" + account?.Password)
      }
  })
  return res.data
}

// export const getDetailsOrder = async (id,access_token) => {
//   const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/v1/abc/${id}`, {
//      //quyền
//       headers: {
//           token: `Bearer ${access_token}`,
//       }
//   })
//   return res.data
// }

export const getAllOrder = async () => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/v1/abc`)
  return res.data
}
export const getAllOrderForManager = async (start,end,status,page,size) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/DonHang?sort=ngayDat,desc&pageNumber=${page}${size && `&size=${size}`}${start && end && `&minDate=${start}&maxDate=${end}`}${status && `&trangThai=${status}`}`,{
    headers: {
        "Authorization": JWT
    }
})
  return res
}
export const updateOrder = async (status,id) => {
  try {
    console.log(status)
    await axios.put(`${process.env.REACT_APP_API_URL}/DonHang/${id}`,{
      trangThai:status,
    },{
      headers: {
          "Authorization": JWT
      }
  })
    success(`${status} thành công`)
  } catch (error) {
    console.log(error.response.data)
    console.log(error.response.data.detailMessage)

    errorMessage(`Cập nhật thất bại : ${error.response.data.detailMessage}`)
  }

}
export const getDetailsOrder = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/DonHang/${id}`,{
    headers: {
        "Authorization": JWT
    }
})
  return res
}

export const cancelOrder = async (idOrder, data, account) => {
  const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/DonHang/${idOrder}`, data, {
     //quyền
     headers: {
      "Authorization": "Basic " + btoa(account?.Username + ":" + account?.Password)
      }
  })
  return res
}

