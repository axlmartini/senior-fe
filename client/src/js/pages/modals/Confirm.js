import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../../sass/components/Modal-confirm.scss';

function Confirm(props) {
  const history = useHistory();

  return(
    <div className={`modal modal-confirm ${props.showConfirmModal ? 'is-active' : ''}`}>
      <div className="modal-confirm-content flex">
        <div className="modal-confirm-close flex flex-end">
          <button
            className="button-link modal-confirm-button"
            onClick={props.handleModalClose}>close</button>
        </div>
        <p className="modal-confirm-text">Do you want to save your changes?</p>
        <div className="modal-confirm-buttons flex flex-end">
          <button className="button modal-confirm-button"
          onClick={() => history.push('/')}>Discard</button>
          <button className="button modal-confirm-button"
          onClick={props.handlePostFormSubmit}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Confirm;
