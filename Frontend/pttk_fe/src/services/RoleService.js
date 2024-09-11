import axios from "axios"

export const axiosJWT = axios.create()

export const loginAdmin = async (data) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/auth/login/4`,
    {
        headers: {
            "Authorization": "Basic " + btoa(data?.Username + ":" + data?.Password)
        }
    },)
    return res
}

export const loginManager = async (data) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/auth/login/3`,
    {
        headers: {
            "Authorization": "Basic " + btoa(data?.Username + ":" + data?.Password)
        }
    },)
    return res
}

export const loginSeller = async (data) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/auth/login/2`,
    {
        headers: {
            "Authorization": "Basic " + btoa(data?.Username + ":" + data?.Password)
        }
    },)
    return res
}

export const loginCEO = async (data) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/auth/login/5`,
    {
        headers: {
            "Authorization": "Basic " + btoa(data?.Username + ":" + data?.Password)
        }
    },)
    return res
}