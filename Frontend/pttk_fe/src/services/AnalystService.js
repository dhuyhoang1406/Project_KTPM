import axios from "axios"
const JWT = localStorage.getItem("Authorization")
export const getOrdersAnalyst = async (start,end) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/ThongKe/DonHang?${start && end && `&minDate=${start}&maxDate=${end}`}`,{
        headers: {
            "Authorization": JWT
        }
    })
    return res
}
export const getSpendAnalyst = async (start,end) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/ThongKe/ChiTieu?${start && end && `&minDate=${start}&maxDate=${end}`}`,{
        headers: {
            "Authorization": JWT
        }
    })
    return res
}
export const getIncomeAnalyst = async (start,end,type) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/ThongKe/DoanhThu?${type && `type=${type}`}${start && end && `&minDate=${start}&maxDate=${end}`}`,{
        headers: {
            "Authorization": JWT
        }
    })
    return res
}