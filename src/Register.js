import { GoogleOutlined, UserOutlined } from '@ant-design/icons';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, DatePicker, Input, Layout, Select, Space, message } from 'antd';
import { signInWithPopup } from "firebase/auth";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { auth, provider } from "./config";
import ImageCarousel from './ImageCarousel';
import './login.css';

const colors3 = ['#40e495', '#30dd8a', '#2bb673'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

function Register() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [dob, setDob] = useState(null);
  const [userType, setUserType] = useState('student'); // "student" or "others"
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleDesignationChange = (value) => {
    setDesignation(value);
  };

  const handleDOBChange = (date) => {
    setDob(date);
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }
    // Perform registration logic here
    message.success('Registration successful!');
    navigate('/homepage');
  };

  return (
    <Layout className='layout'>
      <div className='left-container'>
        <Space direction="vertical" className='register'>
          <h1 className='h1same' style={{ textAlign: 'center' }}>REGISTER</h1>
          <Input
            size="large"
            placeholder="Username"
            prefix={<UserOutlined />}
          />
          <DatePicker
            size="large"
            placeholder="Select Date of Birth"
            onChange={handleDOBChange}
            style={{ width: '100%' }}
          />
          <Select
            size="large"
            placeholder="Select Designation"
            onChange={handleDesignationChange}
            style={{ width: '100%' }}
          >
            <Select.Option value="student">Student</Select.Option>
            <Select.Option value="faculty">Faculty</Select.Option>
            <Select.Option value="staff">Staff</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
          {designation === 'student' && (
            <Input
              size="large"
              placeholder="Student ID"
              style={{ width: '100%' }}
            />
          )}
          <Input.Password
            placeholder="Password"
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            onChange={handlePasswordChange}
          />
          <Input.Password
            placeholder="Retype Password"
            visibilityToggle={{ visible: confirmPasswordVisible, onVisibleChange: setConfirmPasswordVisible }}
            onChange={handleConfirmPasswordChange}
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
                onClick={handleSubmit}
              >
                REGISTER
              </Button>
            </div>
          </ConfigProvider>
          <div style={{ textAlign: 'center', margin: '10px 0' }}>
            <p><b>--------OR SIGN IN WITH--------</b></p>
          </div>
          <Space size="large" style={{ justifyContent: 'center', width: '100%' }}>
            <Button onClick={() => signInWithPopup(auth, provider)} icon={<GoogleOutlined />} shape="circle" size="large" style={{ color: '#DB4437' }} />
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

export default Register;
