import { HomeOutlined, MenuOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Drawer, Layout, Menu, Typography, message } from 'antd';
import 'antd/dist/reset.css';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './Homepage.module.css';
import useWindowSize from './useWindowSize';
const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

const Homepage = () => {
  const [visible, setVisible] = useState(false);
  const { width } = useWindowSize();
  const [editorValue, setEditorValue] = useState('');
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(null);

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
      content: editorValue,
      date: new Date().toLocaleString(),
    };

    setPosts([newPost, ...posts]);
    setEditorValue('');
    message.success('Article is posted.');
  };

  const handleShowMore = (index) => {
    setShowMore(index);
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
        {!isMobile ? (
          <Sider
            trigger={null}
            collapsible
            collapsedWidth="0"
            style={{ background: '#fff' }}
          >
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                style={{ borderRadius: '50%', width: '80px', height: '80px' }}
              />
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>Profile</Menu.Item>
              <Menu.Item key="3" icon={<SettingOutlined />}>Settings</Menu.Item>
            </Menu>
          </Sider>
        ) : null}
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
              {posts.map((post, index) => (
                <div key={index} className={styles.post}>
                  <div
                    dangerouslySetInnerHTML={{ __html: showMore === index ? post.content : post.content.slice(0, 200) + '...' }}
                  />
                  <Button type="link" onClick={() => handleShowMore(index)}>
                    {showMore === index ? 'Show Less' : 'Show More'}
                  </Button>
                  <div className={styles.postDate}>
                    Posted on: {post.date}
                  </div>
                </div>
              ))}
            </div>
          </Content>
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