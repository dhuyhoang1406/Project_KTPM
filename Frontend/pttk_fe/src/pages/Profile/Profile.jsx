import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import Button from "../../components/Button";
import MyOrder from "../MyOrder/MyOrder";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slides/userSlide";
import { message } from "antd";
import * as UserService from "../../services/UserService";
import InputNumberComponent from "../../components/InputComponent/InputNumberComponent";
import { formatBirthDate} from "../../services/FeatureService";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  useEffect(() => {
    if (user) {
      setName(user.hoTen || "");
      setPhoneNumber(user.soDienThoai || "");
      setAddress(user.diaChi || "");
      setGender(user.gioiTinh || "");
      // setDayOfBirth(user.ngaySinh || "");
    }
  }, [user]);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { slug } = useParams();
  const location = useLocation();

  const handleOnChangeNameProfile = (event) => {
    setName(event.target.value);
  };

  const handleOnChangePhoneNumberProfile = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleOnChangeAddressProfile = (event) => {
    setAddress(event.target.value);
  };

  const handleOnChangeConfirm = (event) => {
    console.log(event.target.value);
    setConfirmPassword(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  const handleOnChangeNewPassword = (event) => {
    console.log(event.target.value);
    setNewPassword(event.target.value);
  };

  const handleChangeInfo = async () => {
    const id = localStorage.getItem("id");
    const hoTen = name.trim();
    const diaChi = address;
    const gioiTinh = gender;
    const soDienThoai = phoneNumber;
    const ngaySinh = dayOfBirth;
    const nameRegex = /^[\p{L}\s]+$/u;
    if (!nameRegex.test(hoTen)) {
      message.warning("Tên chỉ được chứa chữ cái và khoảng trắng.");
      return;
    }
    if (!ngaySinh) {
      message.warning("Vui lòng nhập ngày sinh.");
      return;
    }
    const birthDate = new Date(ngaySinh);
    if (isNaN(birthDate.getTime())) {
      message.warning("Ngày sinh không hợp lệ, vui lòng nhập lại.");
      return;
    }
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    if (age < 18) {
      message.warning("Người dùng phải ít nhất 18 tuổi.");
      return;
    }
    const formData = {
      hoTen,
      diaChi,
      gioiTinh,
      soDienThoai,
      ngaySinh: formatBirthDate(ngaySinh),
      trangThai: true,
      vaiTro: "User",
    };
    if (!hoTen || !diaChi || !gioiTinh || !soDienThoai || !ngaySinh) {
      message.warning("Vui lòng nhập đầy đủ thông tin !!!");
      return;
    }
    if (hoTen && diaChi && gioiTinh && soDienThoai && ngaySinh) {
      const res = await UserService.updateUser(id, formData);
    } else {
      message.warning("Vui lòng nhập đầy đủ thông tin !!!");
    }
  };
  

  const handleChangePassword = async () => {
    const id = Number(localStorage.getItem("id"));
    if (newPassword.length < 8) {
      message.warning("Mật khẩu phải dài tối thiểu 8 ký tự");
      return;
    } else if (password === Password && newPassword === confirmPassword) {
      try {
        const res = await UserService.changePassword(
          id,
          { matKhau: newPassword },
        );
        message.success("Thay đổi mật khẩu thành công");
        localStorage.removeItem("id");
        localStorage.removeItem("Authorization");
        localStorage.removeItem("Username");
        localStorage.removeItem("Password");
        navigate("/sign-in");
        // window.location.reload()
      } catch (error) {
        message.error("Thay đổi mật khẩu thất bại");
        console.error("Lỗi!!!: ", error);
      }
    } else {
      message.error(
        "Hãy chắc chắn nhập đúng mật khẩu cũ và xác thực đúng mật khẩu mới !!"
      );
    }
  };

  const handleLogout = () => {
    dispatch(resetUser());
    localStorage.removeItem("id");
    localStorage.removeItem("Authorization");
    localStorage.removeItem("Username");
    localStorage.removeItem("Password");
    navigate("/");
  };

  return (
    <div className={styles.profileUser}>
      <div className={styles.sidebarUser}>
        <ul className={styles.listSidebar}>
          <li
            className={styles.sidebarItem}
            onClick={() => {
              navigate("/profile-user/1");
            }}
          >
            Thông tin cá nhân
          </li>
          <li
            className={styles.sidebarItem}
            onClick={() => {
              navigate("/profile-user/2");
            }}
          >
            Đơn hàng của tôi
          </li>
          <li
            className={styles.sidebarItem}
            onClick={() => {
              navigate("/profile-user/3");
            }}
          >
            Bảo mật
          </li>
          <li className={styles.sidebarItem} onClick={handleLogout}>
            Đăng xuất
          </li>
        </ul>
      </div>
      <div className={styles.contentSidebar}>
        {Number(slug) === 1 && (
          <div className={styles.wrapper}>
            <h1 style={{ fontWeight: "normal", textAlign: "center" }}>
              Thông tin cá nhân
            </h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Họ và tên: {user?.hoTen}</label>
              <input
                className={styles.inputUpdateUser}
                value={name}
                onChange={handleOnChangeNameProfile}
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Số điện thoại: {user?.soDienThoai}</label>
              <InputNumberComponent
                className={styles.inputUpdateUser}
                value={phoneNumber}
                onChange={handleOnChangePhoneNumberProfile}
                placeholder="0123456789"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Địa chỉ: {user?.diaChi}</label>
              <input
                className={styles.inputUpdateUser}
                value={address}
                onChange={handleOnChangeAddressProfile}
                placeholder="4/23, Điện Biên Phủ, TP.HCM"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Giới tính: {user?.gioiTinh}</label>
              <select
                className={styles.inputUpdateUser}
                onChange={(e) => {
                  console.log(e.target.value);
                  setGender(e.target.value);
                }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Ngày sinh: {user?.ngaySinh}</label>
              <input
                className={styles.inputUpdateUser}
                value={dayOfBirth}
                placeholder="VD: 02/04/2004"
                type="date"
                onChange={(e) => {
                  setDayOfBirth(e.target.value);
                }}
              />
            </div>
            <div style={{ marginTop: "3rem" }}></div>
            <button
              style={{
                padding: "1.5rem 2rem",
                backgroundColor: "#333",
                color: "#fff",
                borderRadius: "1rem",
                cursor: "pointer",
              }}
              onClick={handleChangeInfo}
            >
              Chỉnh sửa
            </button>
          </div>
        )}
        {Number(slug) === 2 && <MyOrder />}
        {Number(slug) === 3 && (
          <div className={styles.wrapper}>
            <h1 style={{ fontWeight: "normal", textAlign: "center" }}>
              Bảo mật
            </h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Mật Khẩu Hiện Tại</label>
              <input
                type="password"
                className={styles.inputUpdateUser}
                onChange={handleOnChangePassword}
                value={password}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Mật Khẩu Mới</label>
              <input
                type="password"
                className={styles.inputUpdateUser}
                onChange={handleOnChangeNewPassword}
                value={newPassword}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Xác nhận mật khẩu mới</label>
              <input
                type="password"
                className={styles.inputUpdateUser}
                onChange={handleOnChangeConfirm}
                value={confirmPassword}
              />
            </div>
            <div style={{ marginTop: "3rem" }}></div>
            <Button primary onClick={handleChangePassword}>
              Thay đổi
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
