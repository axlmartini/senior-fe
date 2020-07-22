import React from 'react';
import { useHistory } from 'react-router-dom';

function Confirm(props) {
  const history = useHistory();
  
  return(
    <div className={`modal modal-confirm ${props.showConfirmModal ? 'is-active' : ''}`}>
      <div className="modal-content flex">
        <div className="modal-close flex flex-end">
          <button 
            className="button-link modal-button"
            onClick={props.handleModalClose}>close</button>
        </div>
        <p className="modal-text">Do you want to save your changes?</p>
        <div className="modal-buttons flex flex-end">
          <button className="button modal-button"
          onClick={() => history.push('/')}>Discard</button>
          <button className="button modal-button"
          onClick={props.handlePostFormSubmit}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Confirm;