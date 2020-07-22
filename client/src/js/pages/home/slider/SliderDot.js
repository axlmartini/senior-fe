import React from 'react';

const SliderDot = (props) => {
  return(
    <li className="slider-dots-item">
      <button 
      className={`slider-dots-button ${(props.active === props.index) ? 'is-active' : ''}`}
      onClick={() => props.handleClick(props.index)}></button>
    </li>
  );
}

export default SliderDot;