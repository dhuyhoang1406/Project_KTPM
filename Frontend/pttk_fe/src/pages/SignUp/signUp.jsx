import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { useNavigate } from "react-router-dom";
import FormLoginInput from "../../components/FormLoginInput/FormLoginInput";
import * as UserService from '../../services/UserService'
import * as message from '../../components/Message/Message'

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Male")
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  const isValidPassword = (password) => {
    if(!password || password.trim() === '' || password.length < 7) {
      return false;
    }
    return true;
  }

  const isValidDate = (dateString) => {
    // Kiểm tra đúng cú pháp ngày tháng (dd/mm/yyyy)
    const datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if (!datePattern.test(dateString)) {
        return false;
    }

    // Tách ngày, tháng, năm từ chuỗi
    const [day, month, year] = dateString.split('/');

    // Chuyển đổi ngày, tháng, năm thành số nguyên
    const parsedDay = parseInt(day, 10);
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    // Lấy ngày hiện tại
    const currentDate = new Date();
    const curYear = currentDate.getFullYear();
    const curMonth = currentDate.getMonth() + 1;
    const curDay = currentDate.getDate();

    // Kiểm tra ngày, tháng, năm có hợp lệ và không lớn hơn ngày tháng năm hiện tại
    if (
        parsedYear < 1 ||
        parsedMonth < 1 || parsedMonth > 12 ||
        parsedDay < 1 || parsedDay > 31 ||
        (parsedYear === curYear && parsedMonth > curMonth) ||
        (parsedYear === curYear && parsedMonth === curMonth && parsedDay > curDay)
    ) {
        return false;
    }

    // Kiểm tra số ngày trong tháng
    const daysInMonth = new Date(parsedYear, parsedMonth, 0).getDate();
    if (parsedDay > daysInMonth) {
        return false;
    }

    // Kiểm tra tháng 2 cho năm nhuận
    if (parsedMonth === 2) {
        if ((parsedYear % 4 === 0 && parsedYear % 100 !== 0) || parsedYear % 400 === 0) {
            if (parsedDay > 29) {
                return false;
            }
        } else {
            if (parsedDay > 28) {
                return false;
            }
        }
    }

    // Ngày sinh hợp lệ
    return true;
}


  const isValidEmail = (email) => {
    // Kiểm tra địa chỉ email không được rỗng
    if (!email || email.trim() === '') {
        return false;
    }

    // Kiểm tra định dạng của địa chỉ email bằng biểu thức chính quy
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
} 

  const isValidName = (name) => {
    if(!name || name.trim() === '') {
      return false;
    }
    return true;
  }

  const isValidPhoneNumber = (phoneNumber) => {
    // Loại bỏ tất cả các ký tự không phải số từ chuỗi số điện thoại
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
  
    // Kiểm tra độ dài của số điện thoại
    // Số điện thoại Việt Nam có thể có 10 hoặc 11 chữ số
    // const isValidLength = cleanedPhoneNumber.length === 10;
    const isValidLength = cleanedPhoneNumber.length === 10;

  
    // Kiểm tra xem số điện thoại bắt đầu bằng '0' và sau đó là '3', '5', '7', '8', '9'
    const isValidPrefix = /^(0)(3|5|7|8|9)/.test(cleanedPhoneNumber);
  
    return isValidLength && isValidPrefix;
  }


  const validateForm = () => {
    let isValid = true;

    // Kiểm tra name
    if (!isValidName(name)) {
      setNameError("Vui lòng nhập họ và tên");
      isValid = false;
    }else {
      setNameError("");
    }

    // Kiểm tra birthday
    if (!birthday) {
      setBirthdayError("Vui lòng nhập ngày sinh");
      isValid = false;
    }else if (!isValidDate(birthday)){
      setBirthdayError("Vui lòng nhập đúng cú pháp !! (VD: 02/04/2004)");
      isValid = false;
    } else {
      setBirthdayError("");
    }

    // Kiểm tra address
     if(!address){
      setAddressError("Vui lòng nhập địa chỉ hợp lệ");
      isValid = false;
    } else {
      setAddressError("");
    }

    // Kiểm tra phoneNumber
    if (!isValidPhoneNumber(phoneNumber)) {
      setPhoneNumberError("Vui lòng nhập đúng số điện thoại");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }

    // Kiểm tra email
    if(!isValidEmail(email)){
      setEmailError("Vui lòng nhập đúng định dạng email");
      isValid = false;
    }else {
      setEmailError("");
    }

    // Kiểm tra password
    if (!isValidPassword(password)) {
      setPasswordError("Vui lòng nhập mật khẩu và tối thiểu 8 kí tự");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Kiểm tra confirmPassword
    if (!confirmPassword) {
      setConfirmPasswordError("Vui lòng xác nhận mật khẩu");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Mật khẩu xác nhận không khớp");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleInputChange = (inputName, value) => {
    if (inputName === "name") {
      setName(value);
      if (value) {
        setNameError("");
      }
    } else if (inputName === "birthday") {
      setBirthday(value);
      if (value) {
        setBirthdayError("");
      }
    } else if (inputName === "address") {
      setAddress(value);
      if (value) {
        setAddressError("");
      }
    } else if (inputName === "phoneNumber") {
      setPhoneNumber(value);
      if (value) {
        setPhoneNumberError("");
      }
    } else if(inputName === "email") {
      setEmail(value);
      if (value) {
        setEmailError("");
      }
    } else if (inputName === "password") {
      setPassword(value);
      if (value) {
        setPasswordError("");
      }
    } else if (inputName === "confirmPassword") {
      setConfirmPassword(value);
      if (value) {
        setConfirmPasswordError("");
      }
    }
  };

  const handleGenderOnChange = (e) => {
    const Gendervalue = e.target.value
    setGender(Gendervalue)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (validateForm()) {
      const role = 'User';
      const formData = {
        hoTen: name,
        ngaySinh: birthday,
        diaChi: address,
        gioiTinh: gender,
        soDienThoai: phoneNumber,
        email,
        vaiTro: role,
        matKhau: password
      };

      console.log(formData)
      try {
        const responseData = await UserService.signupUser(formData);
        console.log(responseData)
        message.success()
        console.log('Thành công !!!', responseData);
        handleNavigateSignIn()
      } catch (error) {
        console.log(error.message)
        message.error( error.message);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainSignUp}>
        <form
          // method="POST"
          className={styles.formSignUp}
          onSubmit={handleSubmit}
        >
          <h3 className={styles.heading}>Register</h3>
          <FormLoginInput
            label="name"
            labelUppercase="Họ và tên"
            placeholder="Nguyễn Văn A"
            type="text"
            value={name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            message={nameError}
          />

          <FormLoginInput
            label="birthday"
            labelUppercase="Ngày sinh"
            placeholder="1/1/1990"
            type="text"
            value={birthday}
            onChange={(e) => handleInputChange("birthday", e.target.value)}
            message={birthdayError}
          />

          <FormLoginInput
            label="address"
            labelUppercase="Địa chỉ"
            placeholder="1/2 điện biên phủ"
            type="text"
            value={address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            message={addressError}
          />

            <label htmlFor="gender" style={{ marginLeft: '-296px'}}>Giới Tính</label>
            <select name="gender" id="gender" style={{width:'100%', padding:'1rem'}} onClick={handleGenderOnChange}>
              <option value='Male'>Nam</option>
              <option value='Female'>Nữ</option>
            </select>

          <FormLoginInput
            label="phoneNumber"
            labelUppercase="Số điện thoại"
            placeholder="0123456789"
            type="text"
            value={phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            message={phoneNumberError}
          />

          <FormLoginInput
            label="email"
            labelUppercase="Email"
            placeholder="abcd@gmail.com"
            type="email"
            value={email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            message={emailError}
          />

          <FormLoginInput
            label="password"
            labelUppercase="Mật Khẩu"
            placeholder="Nhập mật khẩu"
            type="password"
            value={password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            message={passwordError}
          />

          <FormLoginInput
            label="confirmPassword"
            labelUppercase="Xác Nhận Mật Khẩu"
            placeholder="Xác nhận mật khẩu"
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            message={confirmPasswordError}
          />
          <button className={styles.formSubmit} type="submit">
            Đăng Ký
          </button>
          <div className={styles.alreadyHaveAccount}>
            <span style={{ color: "#333" }}>Bạn đã có tài khoản? </span>
            <span style={{ cursor: "pointer" }} onClick={handleNavigateSignIn}>
              Đăng nhập
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;