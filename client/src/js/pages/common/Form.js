import React from 'react';
import { useDropzone } from 'react-dropzone';
import TextareaAutosize from 'react-textarea-autosize';

function Form(props) {
  const { 
    title,  
    content,
    image,
    onDrop,
    handleTitleChange,
    handleContentChange,
    handlePostFormSubmit
  } = props;
  const { getRootProps, open, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop
  });

  return(
    <form className="post-form" onSubmit={handlePostFormSubmit} noValidate>
      <TextareaAutosize 
      className="post-form-input post-form-title"
      id="js-form-title"
      name="title" 
      value={title}
      onChange={handleTitleChange}
      placeholder="Title" />
      <div {...getRootProps({className: 'dropzone post-dropzone'})}>
        <input {...getInputProps()} />
        <button className="button button-dropzone" onClick={(e) => {
          e.preventDefault();
          open();
        }}>UPLOAD IMAGE</button>
        <img
        className="img-responsive" 
        src={image ? image : require('../../../images/placeholder1920x1080.png')} 
        alt={title} />
        <div className={`post-dropzone-overlay flex flex-align-center flex-center ${image ? 'is-disabled' : ''}`}>
          <p>Drag image or click the button to upload</p>
        </div>
      </div>
      <TextareaAutosize 
      className="post-form-input post-form-content"
      name="content"
      value={content}
      placeholder="Content"
      onChange={handleContentChange} />
    </form>
  )
}

export default Form;