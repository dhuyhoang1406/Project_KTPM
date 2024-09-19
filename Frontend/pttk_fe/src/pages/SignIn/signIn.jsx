import React, { useState } from 'react';
import styles from './SignIn.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import FormLoginInput from '../../components/FormLoginInput/FormLoginInput';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';
import * as UserService from '../../services/UserService';
import * as message from '../../components/Message/Message';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleNavigateSignUp = () => {
    navigate('/sign-up');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Kiểm tra điều kiện hợp lệ trước khi submit
    if (validateForm()) {
      // Gửi dữ liệu đăng nhập
      try {
        const formData = { Username: email, Password: password };
        const response = await UserService.loginUser(formData);
        if (response.status === 200) {
          await localStorage.removeItem('role')
          message.success();
          if (location?.state) {
            navigate(location?.state);
          } else {
            navigate('/');
          }
          const data = response?.data;
          localStorage.setItem(
            'Authorization',
            'Basic ' + btoa(email + ':' + password)
          );
          if (data?.maTK) {
            const id = data.maTK;
            localStorage.setItem('id', String(id));
            const infoUser = await UserService.getDetailsUser(id);
            if (infoUser?.data) {
              const {
                hoTen = '',
                email = '',
                diaChi = '',
                soDienThoai = '',
                maTK = '',
                vaiTro = '',
                ngaySinh = '',
                gioiTinh = '',
              } = infoUser.data;
              dispatch(
                updateUser({
                  hoTen,
                  email,
                  diaChi,
                  soDienThoai,
                  maTK,
                  vaiTro,
                  ngaySinh,
                  gioiTinh,
                })
              );
            }
          }
        }
      } catch (error) {

          if (error.response.data.code === 1 && error.response.data.detailMessage === "Tài khoản của bị đã bị khóa !!"){
            message.error("Tài khoản của bạn đã bị khóa !!!");

          }else{
            message.error("Email hoặc mật khẩu không đúng !!!");
          }

      }
    }
  };

  const validateForm = () => {
    let isValid = true;

    // Kiểm tra email
    if (!email) {
      setEmailError('Vui lòng nhập email');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Kiểm tra password
    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError('');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainSignIn}>
        <form className={styles.formLogin} onSubmit={handleSubmit}>
          <h3 className={styles.heading}>Login</h3>
          <FormLoginInput
            label="email"
            labelUppercase="Email"
            placeholder="abcd@gmail.com"
            type="text"
            value={email}
            onChange={handleEmailChange}
            message={emailError}
          />
          <FormLoginInput
            label="password"
            labelUppercase="Mật Khẩu"
            placeholder="Nhập mật khẩu"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            message={passwordError}
          />
          <button className={styles.formSubmit} type="submit">
            Đăng Nhập
          </button>
          <div className={styles.forgotPassword}>
            <span style={{ color: '#333' }}>Bạn chưa có tài khoản?</span>
            <span style={{ cursor: 'pointer' }} onClick={handleNavigateSignUp}>
              Tạo tài khoản
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
