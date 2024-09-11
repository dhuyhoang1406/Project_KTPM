import React, { useEffect, useState } from "react";
import styles from "./Customers.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import StaffPagination from "../../../layouts/components/Staff/StaffPagination/StaffPagination"
import Table from "./Table/Table";
import useDebounce from "../../../hooks/useDebounce";
import { getAllUser ,updateUser,createUser } from "../../../services/UserService";
import { formatBirthDate, formatDate } from "../../../services/FeatureService";
import { error, success } from "../../../components/Message/Message";
const Customers = ()=>{
    const [page,setPage] = useState(1)
    const [flag,setFlag] = useState(false)
    const [search,setSearch] = useState("")
    const [customers,setCustomers] = useState([])
    const [amount,setAmount] = useState(0)
    const [showModal,setShowModal] = useState(false)
    const debouncedSearch = useDebounce(search,500)
    const [id,setId] = useState("")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [password,setPassword] = useState("")
    const [date,setDate] = useState("")
    const [address,setAddress] = useState("")
    const [gender,setGender] = useState("")
    const handleChange = () => {
      setFlag(!flag)
    }
    const valiDateAccount = (data) => {
      if(data.hoTen === ""){
        return { status: "error", message: "Tên không được để trống" }
      }
      if(data.email === "" && id === ""){
        return { status: "error", message: "Email không được để trống" }
      }
      if(!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(data.email) && id === ""){
        return { status: "error", message: "Email sai định dạng" }
      }
      if(data.gender === ""){
        return { status: "error", message: "Giới tính không được để trống" }
      }
      if(data.ngaySinh === ""){
        return { status: "error", message: "Ngày sinh không được để trống" }
      }
      if(data.password === "" && id !== ""){
        return { status: "error", message: "Mật Khẩu không được để trống" }
      }
      if(data.vaiTro === ""){
        return { status: "error", message: "Quyền không được để trống" }
      }
      if(data.soDienThoai === ""){
        return { status: "error", message: "Số điện thoại không được để trống" }
      }
      if(data.diaChi === ""){
        return { status: "error", message: "Địa chỉ không được để trống" }
      }
      return { status : "success", message : "Thông Tin đã được duyệt thành công "}
    }
    const createAndUpdateAccount = async () => {
      const data = {
        hoTen : name,
        ngaySinh : formatBirthDate(date),
        diaChi : address,
        gioiTinh : gender,
        soDienThoai : phone,
        email : email,
        vaiTro : "User",
        matKhau : password
      }
      const validate = valiDateAccount(data)
      if(validate.status === "success"){
        if(id){
          const dataUpdate = {
            hoTen : data.hoTen,
            ngaySinh : formatBirthDate(data.ngaySinh),
            diaChi : data.diaChi,
            gioiTinh : data.gioiTinh,
            soDienThoai : data.soDienThoai,
            vaiTro : data.vaiTro,
            trangThai:1,
          }
          await updateUser(id,dataUpdate)
        }else{
          await createUser(data)
        }
        handleChange()
      }else{
        error(validate.message)
      }
    }
    useEffect(()=>{
      getAllUser(page,30,"User",debouncedSearch).then((res) => {
        setAmount(res.data.totalElements)
        setCustomers(res.data.content)
      })
    },[page,debouncedSearch,flag])
    return (
        <div className={styles.wrapper}>
            <div style={{display:"flex",paddingTop:"1rem",paddingBottom:"1rem"}}>
                <h2>Khách Hàng</h2>
                <button style={{marginLeft:"auto",fontFamily:"Arial",fontSize:"1.5rem",fontWeight:"700",color:"white",backgroundColor:"rgb(65, 64, 64)",padding:"1rem",borderRadius:"0.6rem",cursor:"pointer"}} onClick={()=>setShowModal(true)}>Thêm Khách Hàng</button>
            </div>
            <div className={styles.boxFeature}>
                <div style={{position:"relative"}}>
                    <FontAwesomeIcon className={styles.icon} icon={faSearch}/>
                    <input onChange={(event)=>setSearch(event.target.value)} className={styles.input} placeholder="Tìm kiếm khách hàng"/>
                </div>
                {
                  amount !== 0 ? 
                  <div style={{marginLeft:"auto"}}>
                    <StaffPagination onChange={setPage} itemsPerPage={30} amount={amount}/>
                  </div>
                  :
                  <></>
                }
            </div>
            <div className={styles.boxTable}>
                <Table change={handleChange} setShowModal={setShowModal} setAddress={setAddress} setDate={setDate} setName={setName} setGender={setGender} setPhone={setPhone} setId={setId} heads={["Mã","Họ Tên","Ngày Sinh","Địa Chỉ","Giới Tính","Số Điện Thoại","Email","Thao Tác"]} bodys={customers}/>
            </div>
            {showModal && (
          <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
              <div className={styles.close_btn}>
                <div>
                  <h2 style={{marginBottom:"0"}}>Tài Khoản</h2>
                  <p style={{fontSize:"1.2rem"}}>Tạo / Xem và chỉnh sửa</p>
                </div>
                <FontAwesomeIcon onClick={()=>{
                  setName("")
                  setDate("")
                  setAddress("")
                  setEmail("")
                  setGender("")
                  setId("")
                  setPhone("")
                  setPassword("")
                  setShowModal(false)
                }} style={{cursor:"pointer",width:"2rem",height:"2rem"}} icon={faXmark}/>
              </div>
              <div style={{marginTop:"1rem",padding:'1rem'}}>
                <div style={{display:"flex",gap:"1.5rem"}}>
                  <div>
                    <p className={styles.text}>Họ và Tên</p>
                    <input value={name} onChange={(event)=>setName(event.target.value)} className={styles.input} style={{width:"30rem",padding:'1rem'}} placeholder='Nhập Họ Tên'/>
                    <p className={styles.text} style={{color:"rgb(130, 130, 130)",fontSize:"1.2rem",marginTop:"0.3rem"}}>Vd : Nguyễn Văn A</p>
                  </div>
                  <div>
                    <p className={styles.text}>Số Điện Thoại</p>
                    <input value={phone} onChange={(event)=>setPhone(event.target.value)} className={styles.input} style={{width:"30rem",padding:'1rem'}} placeholder='Nhập Số Điện Thoại'/>
                    <p className={styles.text} style={{color:"rgb(130, 130, 130)",fontSize:"1.2rem",marginTop:"0.3rem"}}>Vd :  0902884382</p>
                  </div>
                  <div>
                    <p className={styles.text}>Giới Tính</p>
                    <input onChange={(event)=>setGender(event.target.value)} style={{marginRight:"0.5rem"}} type='radio' name='gioitinh' value="Male" checked={gender === "Male" ? true : false}/>Nam
                    <input onChange={(event)=>setGender(event.target.value)} style={{marginLeft:"1rem",marginRight:"0.5rem"}} type='radio' name='gioitinh' value="Female" checked={gender === "Female" ? true : false}/>Nữ
                  </div>
                </div>
                <div  style={{display:"flex",gap:"1.5rem"}}>
                  {
                    !id ?
                    <div>
                      <p className={styles.text}>Email</p>
                      <input value={email} onChange={(event)=>setEmail(event.target.value)} className={styles.input} style={{width:"30rem",padding:'1rem'}} placeholder='Nhập Email'/>
                      <p className={styles.text} style={{color:"rgb(130, 130, 130)",fontSize:"1.2rem",marginTop:"0.3rem"}}>Vd : Tantai204@gmail.com</p>
                    </div>:
                    <></>
                  }
                  
                  <div>
                    <p className={styles.text}>Ngày Sinh</p>
                    <input value={date} type='date' onChange={(event)=>setDate(event.target.value)} className={styles.input} style={{width:"20rem",padding:'1rem'}}/>
                  </div>
                </div>
                <div style={{display:"flex",gap:"1.5rem"}}>
                {
                  id ? 
                  <>
                  <div>
                    <p className={styles.text}>Địa Chỉ</p>
                    <input value={address} onChange={(event)=>setAddress(event.target.value)} className={styles.input} style={{width:"30rem",padding:'1rem'}} placeholder='Nhập Địa Chỉ'/>
                    <p className={styles.text} style={{color:"rgb(130, 130, 130)",fontSize:"1.2rem",marginTop:"0.3rem"}}>Vd : 178/3A Lê Quang Sung , Phường 4,Quận 6,TP.HCM</p>
                  </div>
                  </>
                  :
                  <>
                  <div>
                    <p className={styles.text}>Địa Chỉ</p>
                    <input value={address} onChange={(event)=>setAddress(event.target.value)} className={styles.input} style={{width:"30rem",padding:'1rem'}} placeholder='Nhập Địa Chỉ'/>
                    <p className={styles.text} style={{color:"rgb(130, 130, 130)",fontSize:"1.2rem",marginTop:"0.3rem"}}>Vd : 178/3A Lê Quang Sung , Phường 4,Quận 6,TP.HCM</p>
                  </div>
                  <div>
                    <p className={styles.text}>Mật Khẩu</p>
                    <input value={password} type="password" onChange={(event)=>setPassword(event.target.value)} className={styles.input} style={{width:"30rem",padding:'1rem'}} placeholder='Nhập Mật Khẩu'/>
                    <p className={styles.text} style={{color:"rgb(130, 130, 130)",fontSize:"1.2rem",marginTop:"0.3rem"}}>Vd : Tantai20412</p>
                  </div>
                  </>
                }
                </div>
                <div style={{display:"flex",gap:"5rem"}}>
                {
                  id ? 
                  <>

                  </>
                  :
                  <div>
                    <ul className={styles.ul}>
                      <li className={styles.text} style={{fontSize:"1.3rem"}}>Mật khẩu phải có ít nhất 8 ký tự</li>
                      <li className={styles.text} style={{fontSize:"1.3rem"}}>Mật khẩu phải có ít nhất 1 ký tự viết hoa</li>
                      <li className={styles.text} style={{fontSize:"1.3rem"}}>Mật khẩu phải có ít nhất 3 chữ số</li>
                    </ul>
                  </div>
                }
                </div>
                <div>
                  <div style={{display:"flex",marginTop:"1rem"}}>
                    <button style={{padding:"1rem 1.5rem 1rem 1.5rem", borderRadius:"0.7rem",cursor:"pointer",fontWeight:"700",color:"white",backgroundColor:"rgb(70, 70, 70)",marginLeft:"auto",fontSize:"1.5rem"}} onClick={()=>createAndUpdateAccount()}>Lưu</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
    )
}
export default Customers