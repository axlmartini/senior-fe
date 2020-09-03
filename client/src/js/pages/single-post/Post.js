import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from '../common/Form';
import Breadcrumbs from '../common/Breadcrumbs';
import PostComment from './PostComment';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, updatePost, addPostComment } from '../../redux/modules/post';
import Confirm from '../modals/Confirm';
import usePrevious from '../../hooks/usePrevious';
import * as moment from 'moment';
import '../../../sass/components/Post.scss';
import '../../../sass/components/Comment.scss';

function Post () {
  const { isAuthenticated } = useSelector(state => state.auth);
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ date, setDate ] = useState('');
  const [ image, setImage ] = useState('');
  const [ isEdit, setIsEdit ] = useState(false);
  const [ comments, setComments ] = useState([]);
  const [ newComment, setNewComment ] = useState('');
  const { id } = useParams();
  let formatDate = moment(new Date(date)).format('YYYY.MM.DD');
  const history = useHistory();
  const onDrop = useCallback((acceptedFiles) => {
    let reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onloadend = () => setImage(reader.result);
  }, []);
  const dispatch = useDispatch();
  const { post, errors } = useSelector(state => state.post);
  const [ formErrors, setFormErrors ] = useState([]);
  const [ isUpdated, setIsUpdated ] = useState(false);
  const [ showConfirmModal, setShowConfirmModal ] = useState(false);
  const previous = usePrevious({ title, content, image });

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
      setIsUpdated(true);
      dispatch(updatePost({
          id: parseInt(id),
          title: title,
          content: content,
          image: image
        }
      ));
      setTimeout(() => {
        history.go();
        //temporary reload page to fix bug from backend
      }, 1000);
    }
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    dispatch(addPostComment({
        postId: parseInt(id),
        content: newComment
      })
    );
    setNewComment('');
  }

  function handleEditCancel(e) {
    e.preventDefault();
    if(previous.title !== title || previous.content !== content || previous.image !== image) {
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
    dispatch(getPost({id: parseInt(id)}))
  }, [dispatch, id])

  useEffect(() => {
    if(post) {
      setTitle(post.title);
      setContent(post.content);
      setDate(post.createdAt);
      setImage(post.image);
      setComments(post.comments);
    }
  }, [post])

  if(errors && errors.length) return <h2>Network Error</h2>
  return (
    <div>
      <Breadcrumbs title={post && post.title} />
      <div className="post-section">
        <div className="l-container post-container">
          <div className="flex flex-end button-group">
            { isAuthenticated === true && (!isEdit ?
              <button className="button-link" onClick={() => setIsEdit(true)}>Edit Post</button> :
              <div>
                <button className="button-link button-save" onClick={handlePostFormSubmit}>Save Post</button>
                <button className="button-link" onClick={handleEditCancel}>Cancel</button>
              </div>
            )}
          </div>
          <ul className="user-form-errors">
          { formErrors.map(err =>
              err.map(item =>
                <li className="user-form-message user-form-error" key={item}>{item}</li>
              )
          ) }

          { isUpdated === true && Object.keys(post).length > 0 && <li className="user-form-message user-form-success">Post updated</li> }
          </ul>
          <time className="post-date" dateTime={formatDate}>{formatDate}</time>
          { isEdit ? (
            <Fragment>
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
            </Fragment>
            ) : (
              <div className="post-body">
                <h2 className="post-title">{title}</h2>
                <div className="post-image">
                  <img
                  className="img-responsive img-full"
                  src={image ? image : require('../../../images/placeholder1920x1080.png')}
                  alt={title} />
                </div>
                <p className="post-content">{content}</p>
              </div>
            )
          }
        </div>
      </div>
      <div className="comment-section">
        <div className="l-container">
          <h2 className="section-heading">COMMENT</h2>
          <div className="comment-list">
            { comments && comments.reverse().map(comment =>
              <PostComment
              key={comment.id}
              content={comment.content}
              date={comment.createdAt} />)}
          </div>
          <form
          className="flex flex-vertical flex-align-end"
          onSubmit={handleCommentSubmit}>
            <textarea
            className="comment-form-text"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            placeholder="Write comment"
            required />
            <button className="button comment-button">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Post;
