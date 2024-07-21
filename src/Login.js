import { FacebookOutlined, GoogleOutlined, InstagramOutlined, LinkedinOutlined, UserOutlined } from '@ant-design/icons';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Input, Layout, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import ImageCarousel from './ImageCarousel';
import './login.css';
import { auth, provider } from "./config";

import { signInWithPopup } from "firebase/auth";
const colors3 = ['#40e495', '#30dd8a', '#2bb673'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());



function Login() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState('')
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
      navigate('/homepage')
    })

  }
  useEffect(() => {
    setValue(localStorage.getItem('email'))
  })
  return (
    <Layout className='layout'>
      <div className='left-container'>
        <Space direction="vertical" className='login'>
          <h1 className='h1same' style={{ textAlign: 'center' }}>LOG IN</h1>
          <Input
            size="large"
            placeholder="Username"
            prefix={<UserOutlined />}
          />
          <Input.Password
            placeholder="Password"
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          />
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(135deg, ${colors3.join(', ')})`,
                  colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors3).join(', ')})`,
                  colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors3).join(', ')})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate('/homepage')}
              >
                LOG IN
              </Button>
            </div>
          </ConfigProvider>
          <div style={{ textAlign: 'center', margin: '10px 0' }}>
            <p><b>--------OR SIGN IN WITH--------</b></p>
          </div>

          <Space size="large" style={{ justifyContent: 'center', width: '100%' }}>
            <Button onClick={handleClick} icon={<GoogleOutlined />} shape="circle" size="large" style={{ color: '#DB4437' }} />
            {/* <Button icon={<InstagramOutlined />} shape="circle" size="large" style={{ color: '#C13584' }} />
            <Button icon={<FacebookOutlined />} shape="circle" size="large" style={{ color: '#4267B2' }} />
            <Button icon={<LinkedinOutlined />} shape="circle" size="large" style={{ color: '#0077B5' }} /> */}
          </Space>
        </Space>
      </div>
      <div className='right-container'>
        <div className='top-right-icon'>
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" />
        </div>
        <div className="login-carousel">
          <ImageCarousel />
        </div>
      </div>
    </Layout>
  );
}

export default Login;
