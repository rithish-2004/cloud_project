import { FacebookOutlined, GoogleOutlined, InstagramOutlined, LinkedinOutlined, UserOutlined } from '@ant-design/icons';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Input, Layout, Select, Space, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import './register.css';
import { auth, provider } from "../config";
import { signInWithPopup } from "firebase/auth";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const colors3 = ['#40e495', '#30dd8a', '#2bb673'];

const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState(null);
    const [designation, setDesignation] = useState('');
    const navigate = useNavigate();
    const [value, setValue] = useState('');

    const handleClick = () => {
        if (password !== confirmPassword) {
            message.error("Passwords do not match!");
            return;
        }

        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email);
            localStorage.setItem("email", data.user.email);
            message.success("Account created successfully!");
            navigate('/homepage');
        }).catch(error => {
            message.error("Error creating account: " + error.message);
        });
    };

    useEffect(() => {
        setValue(localStorage.getItem('email'));
    }, []);

    return (
        <Layout className='layout'>
            <div className='left-container'>
                <Space direction="vertical" className='login'>
                    <Title level={1} className='title'>Create an Account</Title>

                    <Input
                        size="large"
                        placeholder="Username"
                        prefix={<UserOutlined />}
                        className='input-field'
                    />

                    <Select
                        size="large"
                        placeholder="Select Age"
                        className='input-field'
                        value={age}
                        onChange={setAge}
                    >
                        {[...Array(100).keys()].map(age => (
                            <Option key={age} value={age + 1}>{age + 1}</Option>
                        ))}
                    </Select>

                    <Select
                        size="large"
                        placeholder="Select Designation"
                        className='input-field'
                        value={designation}
                        onChange={setDesignation}
                    >
                        <Option value="student">Student</Option>
                        <Option value="IT Employee">Student</Option>
                        <Option value="Business">Student</Option>
                        <Option value="other">Other</Option>
                    </Select>

                    <Input.Password
                        placeholder="Password"
                        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                        className='input-field'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Input.Password
                        placeholder="Confirm Password"
                        visibilityToggle={{ visible: confirmPasswordVisible, onVisibleChange: setConfirmPasswordVisible }}
                        className='input-field'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                                onClick={handleClick}
                                className='register-button'
                            >
                                Register
                            </Button>
                        </div>
                    </ConfigProvider>

                    <div style={{ textAlign: 'center', margin: '20px 0' }}>
                        <Paragraph><b>OR SIGN IN WITH</b></Paragraph>
                    </div>

                    <Space size="large" style={{ justifyContent: 'center', width: '100%' }}>
                        <Button onClick={handleClick} icon={<GoogleOutlined />} shape="circle" size="large" style={{ color: '#DB4437' }} />
                        <Button icon={<InstagramOutlined />} shape="circle" size="large" style={{ color: '#C13584' }} />
                        <Button icon={<FacebookOutlined />} shape="circle" size="large" style={{ color: '#4267B2' }} />
                        <Button icon={<LinkedinOutlined />} shape="circle" size="large" style={{ color: '#0077B5' }} />
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
