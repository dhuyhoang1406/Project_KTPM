import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    maTK: '',
    hoTen: '',
    ngaySinh:'',
    diaChi: '',
    gioiTinh:'',
    soDienThoai: '',
    email: '',
    // avatar: '',
    vaiTro:''
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { hoTen = '', email = '', diaChi = '', soDienThoai = '', maTK = '', vaiTro='' , ngaySinh= '', gioiTinh=''} = action.payload
            state.hoTen = hoTen ? hoTen : state.hoTen;
            state.email = email ? email : state.email;
            state.diaChi = diaChi ? diaChi : state.diaChi;
            state.soDienThoai = soDienThoai ? soDienThoai : state.soDienThoai;
            // state.avatar = avatar ? avatar : state.avatar;
            state.maTK = maTK ? maTK : state.maTK
            state.vaiTro = vaiTro ? vaiTro : state.vaiTro;
            state.gioiTinh = gioiTinh ? gioiTinh : state.gioiTinh;
            state.ngaySinh = ngaySinh ? ngaySinh : state.ngaySinh;
        },
        resetUser: (state) => {
            state.hoTen = ''
            state.email = ''
            state.diaChi = ''
            state.soDienThoai = ''
            // state.avatar = avatar ? avatar : state.avatar;
            state.maTK = ''
            state.vaiTro = ''
            state.gioiTinh = ''
            state.ngaySinh = ''
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer