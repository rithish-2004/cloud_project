import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Button, Divider, Input, message, Popconfirm, Switch } from 'antd';
import React, { useState } from 'react';
import styles from './Settings.module.css';

const Settings = ({ onDeletePost, onDeleteAccount }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const handleUsernameChange = () => {
    if (newUsername.trim()) {
      message.success('Username changed successfully!');
      setNewUsername('');
    } else {
      message.error('Please enter a valid username.');
    }
  };

  const handlePasswordChange = () => {
    if (currentPassword.trim() && newPassword.trim()) {
      message.success('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } else {
      message.error('Please enter valid passwords.');
    }
  };

  const confirmDeletePost = () => {
    onDeletePost();
    message.success('Post deleted successfully!');
  };

  const confirmDeleteAccount = () => {
    onDeleteAccount();
    message.success('Account deleted successfully!');
  };

  return (
    <div className={styles.settingsContainer}>
      <h2>Settings</h2>
      
      {/* Fullscreen Mode */}
      <Divider>Fullscreen Mode</Divider>
      <Button 
        onClick={toggleFullscreen} 
        icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      >
        {isFullscreen ? 'Exit Fullscreen' : 'Enable Fullscreen'}
      </Button>
      
      {/* Dark Mode/Light Mode */}
      <Divider>Dark Mode / Light Mode</Divider>
      <Switch 
        checked={darkMode}
        onChange={toggleDarkMode}
        checkedChildren="Dark Mode"
        unCheckedChildren="Light Mode"
      />

      {/* Change Username */}
      <Divider>Change Username</Divider>
      <Input
        placeholder="New Username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <Button type="primary" onClick={handleUsernameChange}>
        Change Username
      </Button>

      {/* Change Password */}
      <Divider>Change Password</Divider>
      <Input.Password
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <Input.Password
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{ marginTop: '10px' }}
      />
      <Button type="primary" onClick={handlePasswordChange} style={{ marginTop: '10px' }}>
        Change Password
      </Button>

      {/* Delete Post */}
      <Divider>Delete Post</Divider>
      <Popconfirm
        title="Are you sure you want to delete this post?"
        onConfirm={confirmDeletePost}
        okText="Yes"
        cancelText="No"
      >
        <Button type="danger">Delete Post</Button>
      </Popconfirm>

      {/* Delete Account */}
      <Divider>Delete Account</Divider>
      <Popconfirm
        title="Are you sure you want to delete your account? This action cannot be undone."
        onConfirm={confirmDeleteAccount}
        okText="Yes"
        cancelText="No"
      >
        <Button type="danger">Delete Account</Button>
      </Popconfirm>
    </div>
  );
};

export default Settings;
