import { HomeOutlined, MenuOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Drawer, Layout, Menu, Typography, message } from 'antd';
import 'antd/dist/reset.css';
import React, { useState } from 'react';
import { FaComment, FaShare, FaThumbsUp } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import blogs from './blogs'; // Import the blogs array
import styles from './Homepage.module.css';
import PostFeed from './PostFeed'; // New component for the right section
import useWindowSize from './useWindowSize';


const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

const Homepage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { width } = useWindowSize();
  const [editorValue, setEditorValue] = useState('');
  const [posts, setPosts] = useState(() => {
    const savedBlogs = localStorage.getItem('blogs');
    return savedBlogs ? JSON.parse(savedBlogs) : blogs;
  });

  const handleMenuClick = (e) => {
    if (e.key === "2") {
      const username = prompt("Enter GitHub username:"); // Prompt user for username
      if (username) {
        window.location.href = `/profile/${username}`; // Redirect to profile with username
      }
    } else if (e.key === "3") {
      navigate('/settings'); // Redirect to the Settings page when Settings menu is clicked
    }
  };

// Update the menu item click handlers
<Menu
  mode="inline"
  defaultSelectedKeys={['1']}
  style={{ height: '100%', borderRight: 0 }}
  onClick={handleMenuClick} // Handle menu clicks for navigation
>
  <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
  <Menu.Item key="2" icon={<UserOutlined />}>Profile</Menu.Item> {/* Profile Menu Item */}
  <Menu.Item key="3" icon={<SettingOutlined />}>Settings</Menu.Item>
</Menu>

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const isMobile = width <= 768;
  const handlePost = () => {
    if (editorValue.trim() === '') {
      message.warning('Please write something before posting.');
      return;
    }

    const newPost = {
      id: Date.now(), // Unique ID for each post
      content: editorValue,
      date: new Date().toLocaleString(),
      likes: 0,
      shares: 0,
      comments: [], // Ensure comments is an array
    };

    // Update the state
    setPosts([newPost, ...posts]);

    // Optionally save to local storage or a server here
    localStorage.setItem('blogs', JSON.stringify([newPost, ...posts]));

    setEditorValue(''); // Clear the editor after posting
    message.success('Article is posted.');
  };

  const handleLike = (id) => {
    const updatedPosts = posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('blogs', JSON.stringify(updatedPosts));
  };

  const handleShare = (id) => {
    const updatedPosts = posts.map(post =>
      post.id === id ? { ...post, shares: post.shares + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('blogs', JSON.stringify(updatedPosts));
  };

  const handleComment = (id) => {
    const comment = prompt('Enter your comment:');
    if (comment) {
      const updatedPosts = posts.map(post =>
        post.id === id ? { ...post, comments: [...post.comments, comment] } : post
      );
      setPosts(updatedPosts);
      localStorage.setItem('blogs', JSON.stringify(updatedPosts));
    }
  };


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: 0 }}>
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            style={{ marginLeft: '16px' }}
          />
        )}
      </Header>
      <Layout>
        {!isMobile && (
          <Sider
            trigger={null}
            collapsible
            collapsedWidth="0"
            style={{ background: '#fff', width: '25%' }} // Adjusted width
          >
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                style={{ borderRadius: '50%', width: '80px', height: '80px' }}
                onClick={handleMenuClick}
              />
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
              onClick={handleMenuClick} // Handle menu clicks for navigation
            >
              <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>Profile</Menu.Item>
              <Menu.Item key="3" icon={<SettingOutlined />}>Settings</Menu.Item>
            </Menu>
          </Sider>
        )}
        <Layout style={{ padding: '0 24px', minHeight: 280 }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Title level={2}>Create a New Post</Title>
            <div className={styles.buttonContainer}>
              <ReactQuill
                value={editorValue}
                onChange={setEditorValue}
                modules={quillModules}
                className={styles.qlEditor}
              />
              <Button type="primary" size="large" onClick={handlePost}>
                Post Article
              </Button>
            </div>
            <div className={styles.postContainer}>
              {posts.map((post) => (
                <div key={post.id} className={styles.post}>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  <div className={styles.postDate}>Posted on: {post.date}</div>
                  <div className={styles.postActions}>
                    <FaThumbsUp className={styles.icon} />
                    <FaComment className={styles.icon} />
                    <FaShare className={styles.icon} />
                  </div>
                </div>
              ))}
            </div>

          </Content>
          <Sider
            width="25%" // Right section takes 1/4 of the page
            style={{ background: '#fff', padding: '20px' }}
          >
            <PostFeed
              posts={posts}
              handleComment={handleComment}
              handleLike={handleLike}
              handleShare={handleShare}
            />
          </Sider>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Blog Poster ©2024 Created by Rithish Kanna S
      </Footer>
      <Drawer
        title="Profile Menu"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        width={250}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            style={{ borderRadius: '50%', width: '80px', height: '80px' }}
          />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ borderRight: 0 }}
          onClick={handleMenuClick} // Handle menu clicks for navigation
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>Profile</Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>Settings</Menu.Item>
        </Menu>
      </Drawer>
    </Layout>
  );
};

const quillModules = {
  toolbar: [
    [{ 'font': [] }],
    [{ 'header': '1' }, { 'header': '2' }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    ['link'],
    ['clean']
  ],
};

export default Homepage;
