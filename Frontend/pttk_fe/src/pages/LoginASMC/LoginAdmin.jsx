import React from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import imageLogo from '../../assets/images/login.avif'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonASMC from '../../components/ButtonASMC/Button'
import InputForLoginASMC from '../../components/InputForLoginASMC/InputForLoginASMC'
import * as RoleService from '../../services/RoleService'
import * as message from '../../components/Message/Message'

const LoginAdmin = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const Username = email
      const Password = password
      const res = await RoleService.loginAdmin({Username, Password})
  
      localStorage.removeItem('id');
      localStorage.removeItem('Authorization');
      localStorage.removeItem('Username');
      localStorage.removeItem('Password');
  
      if (res.status === 200) {
        localStorage.setItem('Authorization', 'Basic ' + btoa(email + ':' + password));
        await localStorage.setItem('role', 'admin');
        
        if (localStorage.getItem('role') === 'admin') {
          navigate('/system/admin');
          window.location.reload();   
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response.data.code === 8 || (error.response.data.detailMessage === "Đăng nhập thất bại !! (2)")){
        message.error("Đăng nhập thất bại !! Hãy kiểm tra lại email và password !!")
      }else{
        message.error("Tài khoản của bạn đã bị khóa vui lòng liên hệ Admin !!");
      }
    }
  }
  

  return (
    <form onSubmit={handleSignIn}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
          <WrapperContainerLeft>
            <h1>Admin Login</h1>
            <p>Mời đăng nhập vào</p>
            <InputForLoginASMC style={{ margin: '10px 0' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
            <div style={{ position: 'relative' }}>
              <span
                onClick={() => setIsShowPassword(!isShowPassword)}
                style={{
                  zIndex: 10,
                  position: 'absolute',
                  top: '4px',
                  right: '8px'
                }}
              >{
                  isShowPassword ? (
                    <EyeFilled />
                  ) : (
                    <EyeInvisibleFilled />
                  )
                }
              </span>
              <InputForLoginASMC
                placeholder="password"
                type={isShowPassword ? "text" : "password"}
                value={password}
                onChange={handleOnchangePassword}
              />
            </div>
              <ButtonASMC
                type='submit'
                disabled={!email.length || !password.length}
                size={40}
                styleButton={{
                  background: 'rgb(255, 57, 69)',
                  height: '48px',
                  width: '100%',
                  border: 'none',
                  borderRadius: '4px',
                  margin: '26px 0 10px'
                }}
                textbutton={'Đăng nhập'}
                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                onClick={handleSignIn}
              ></ButtonASMC>
          </WrapperContainerLeft>
          <WrapperContainerRight>
            <Image src={imageLogo} preview={false} alt="iamge-logo" height="300px" width="300px" />
            <h4>Chào Mừng Quay Trở Lại</h4>
          </WrapperContainerRight>
        </div>
      </div >
    </form>
  )
}

export default LoginAdmin