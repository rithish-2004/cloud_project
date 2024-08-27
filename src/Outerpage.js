import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './outerpage.css';

const Outerpage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignInClick = () => {
    navigate('/login');
  };
  const handleSignUpClick = () => {
    navigate('/register');
  };
  return (
    <>
      <div className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="logo"><img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" /></div>
        <Menu mode="horizontal" style={{ marginLeft: 'auto' }}>
          <Menu.Item key="signin" onClick={handleSignInClick} style={{ marginRight: '2px' }}>SIGN IN</Menu.Item>
          <Menu.Item key="signup"  onClick={handleSignUpClick} style={{ marginRight: '2px' }}>SIGN UP</Menu.Item>
        </Menu>
      </div>
      <div className="initial-navbar">
      <div className="logo-container">
  <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" className="logo-image" />
  <span className="logo-text">BLOG WORLD</span>
</div>
        <Menu mode="horizontal" style={{ marginLeft: 'auto' }}>
          <Menu.Item key="signin" onClick={handleSignInClick}>SIGN IN</Menu.Item>
          <Menu.Item key="signup" onClick={handleSignUpClick}>SIGN UP</Menu.Item>
        </Menu>
      </div>
      <div className="container">
      
        <div className="column">
          <img src={`${process.env.PUBLIC_URL}/images/himg2.png`} alt="" />
          <div className="column">
        </div>
        </div>
        <div className="column">
          <img src={`${process.env.PUBLIC_URL}/images/himg1.jpg`} alt="" />
        </div>
        <div className="column">
          <img src={`${process.env.PUBLIC_URL}/images/himg4.png`} alt="" />
        </div>
        <div className="column">
          <img src={`${process.env.PUBLIC_URL}/images/himg5.png`} alt="" />
        </div>
      </div>
    </>
  );
};

export default Outerpage;
