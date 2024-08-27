import { Button, Divider, Input, message, Modal } from 'antd';
import React, { useState } from 'react';
import styles from './PostFeed.module.css';

const PostFeed = ({ posts }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState({}); // Track likes by post ID
  const [shares, setShares] = useState({}); // Track shares by post ID
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleShowModal = (post) => {
    setCurrentPost(post);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentPost(null);
    setComment('');
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handlePostComment = () => {
    if (comment.trim()) {
      message.success('Comment posted successfully!');
      setComment('');
      handleCloseModal(); // Close the modal after posting the comment
    } else {
      message.warning('Please enter a comment.');
    }
  };

  const handleLike = () => {
    if (currentPost && !likes[currentPost.id]) {
      setLikes((prevLikes) => ({
        ...prevLikes,
        [currentPost.id]: (prevLikes[currentPost.id] || 0) + 1,
      }));
    }
  };

  const handleShare = () => {
    setShares((prevShares) => ({
      ...prevShares,
      [currentPost.id]: (prevShares[currentPost.id] || 0) + 1,
    }));
  };

  const handleNextPage = () => {
    if (indexOfLastPost < posts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (indexOfFirstPost > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.postFeed}>
      {currentPosts.map((post) => (
        <div key={post.id} className={styles.postContainer}>
          <div className={styles.postHeader}>
            <span>{post.name}</span> &nbsp; 
            <span>{post.date}</span>
          </div>
          <div className={styles.postContent}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          <button 
            className={styles.toggleButton}
            onClick={() => handleShowModal(post)}
          >
            Read More
          </button>
          <Divider />
        </div>
      ))}

      <div className={styles.pagination}>
        <button 
          className={styles.paginationButton}
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button 
          className={styles.paginationButton}
          onClick={handleNextPage} 
          disabled={indexOfLastPost >= posts.length}
        >
          Next
        </button>
      </div>

      {currentPost && (
        <Modal
          title="Post Details"
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          className={styles.modal}
          bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }} // Ensure modal content is scrollable
        >
          <div className={styles.modalContent}>
            <h2>{currentPost.name}</h2>
            <p>{currentPost.date}</p>
            <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
            <div className={styles.modalActions}>
              <Button
                type="primary"
                onClick={handleLike}
                disabled={!!likes[currentPost.id]}
              >
                Like {likes[currentPost.id] || 0}
              </Button>
              <Button
                type="default"
                onClick={handleShare}
              >
                Share {shares[currentPost.id] || 0}
              </Button>
            </div>
            <div className={styles.commentSection}>
              <Input.TextArea
                rows={4}
                value={comment}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
              />
              <Button type="primary" onClick={handlePostComment}>
                Post Comment
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PostFeed;
