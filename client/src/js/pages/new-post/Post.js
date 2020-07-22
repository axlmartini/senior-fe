import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Breadcrumbs from '../common/Breadcrumbs';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../../redux/modules/post';
import Form from '../common/Form';
import Confirm from '../modals/Confirm';
import * as moment from 'moment';

function Post() {
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ image, setImage ] = useState('');
  const { post, errors } = useSelector(state => state.post);
  let formatDate = moment().format('YYYY.MM.DD');
  const history = useHistory();
  const onDrop = useCallback((acceptedFiles) => {
    let preview = URL.createObjectURL(acceptedFiles[0]);
    setImage(preview)
  }, []);
  const dispatch = useDispatch();
  const [ formErrors, setFormErrors ] = useState([]);
  const [ showConfirmModal, setShowConfirmModal ] = useState(false);
  
  function validate() {
    let titleErrors = [];

    if(!title) {
      titleErrors.push('Title field is required');
    }

    setFormErrors([
      titleErrors
    ]);

    if(titleErrors.length) {
      return false;
    }

    return true;
  }

  function handlePostFormSubmit(e) {
    e.preventDefault();
    let isValid = validate();
    if(isValid) {
      dispatch(addPost({
          title: title,
          content: content,
          image: image
        })
      );
    }
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  function handleEditCancel(e) {
    e.preventDefault();
    if(title || content || image) {
      setShowConfirmModal(true);
    } else {
      history.push('/');
    }
  }

  function handleModalClose(e) {
    e.preventDefault();
    setShowConfirmModal(false);
  }

  useEffect(() => {
    if(post && Object.keys(post).length > 0) {
      setTimeout(() => {
        history.push(`/news/${post.id}`);
      }, 1000);
    }
  }, [post]);

  if(errors && errors.length) return <h2>Network Error</h2>
  return (
    <div>
      <Breadcrumbs title="Create New Post" />
      <div className="post-section l-container is-new-post">
        <div className="flex flex-end button-group">
          <button className="button-link button-save" onClick={handlePostFormSubmit}>Save Post</button>
          <button className="button-link" onClick={handleEditCancel}>Cancel</button> 
        </div>
        <ul className="user-form-errors">
        { formErrors.map(err => 
            err.map(item => 
              <li className="user-form-message user-form-error" key={item}>{item}</li>
            )
        ) }

        { post && Object.keys(post).length > 0 && <li className="user-form-message user-form-success">Post added</li> }
        </ul>
        <time className="post-date" dateTime={formatDate}>{formatDate}</time>
        <Form 
          handleTitleChange={handleTitleChange}
          handleContentChange={handleContentChange}
          title={title}
          content={content}
          image={image}
          onDrop={onDrop} 
          handlePostFormSubmit={handlePostFormSubmit} />
        <Confirm 
          showConfirmModal={showConfirmModal}
          handleModalClose={handleModalClose}
          handlePostFormSubmit={handlePostFormSubmit} />
      </div>
    </div>
  )
}

export default Post;