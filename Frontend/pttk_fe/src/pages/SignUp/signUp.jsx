import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { useNavigate } from "react-router-dom";
import FormLoginInput from "../../components/FormLoginInput/FormLoginInput";
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";
import { formatBirthDate } from "../../services/FeatureService";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Male");
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
    if (!password || password.trim() === "" || password.length < 7) {
      return false;
    }
    return true;
  };

  

  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if the birth month/day hasn't happened yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  const isValidEmail = (email) => {
    if (!email || email.trim() === "") {
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const isValidName = (name) => {
    if (!name || name.trim() === "") {
      return false;
    }
    return true;
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    const isValidLength = cleanedPhoneNumber.length === 10;

    const isValidPrefix = /^(0)(3|5|7|8|9)/.test(cleanedPhoneNumber);

    return isValidLength && isValidPrefix;
  };

  const validateForm = () => {
    let isValid = true;

    // Kiểm tra name
    if (!isValidName(name)) {
      setNameError("Vui lòng nhập họ và tên");
      isValid = false;
    } else {
      setNameError("");
    }

    // Kiểm tra birthday
    if (!birthday) {
      setBirthdayError("Vui lòng nhập ngày sinh");
      isValid = false;
    } else {
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
    
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
    
      if (age < 18) {
        setBirthdayError("Người dùng phải ít nhất 18 tuổi.");
        isValid = false;
      } else {
        setBirthdayError("");
      }
    }
    

    // Kiểm tra address
    if (!address) {
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
    if (!isValidEmail(email)) {
      setEmailError("Vui lòng nhập đúng định dạng email");
      isValid = false;
    } else {
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
    } else if (inputName === "email") {
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
    const Gendervalue = e.target.value;
    setGender(Gendervalue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const role = "User";
      const formData = {
        hoTen: name,
        ngaySinh: formatBirthDate(birthday),
        diaChi: address,
        gioiTinh: gender,
        soDienThoai: phoneNumber,
        email,
        vaiTro: role,
        matKhau: password,
      };

      console.log(formData);
      try {
        const responseData = await UserService.signupUser(formData);
        console.log(responseData);
        message.success();
        console.log("Thành công !!!", responseData);
        handleNavigateSignIn();
      } catch (error) {
        console.log(error.message);
        message.error(error.message);
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
            labelUppercase="Ngày sinh (dd/MM/yyyy)"
            placeholder="1/1/1990"
            type="date"
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

          <label htmlFor="gender" style={{ marginLeft: "-296px" }}>
            Giới Tính
          </label>
          <select
            name="gender"
            id="gender"
            style={{ width: "100%", padding: "1rem" }}
            onClick={handleGenderOnChange}
          >
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
          </select>

          <FormLoginInput
            label="phoneNumber"
            labelUppercase="Số điện thoại (10 số)"
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
