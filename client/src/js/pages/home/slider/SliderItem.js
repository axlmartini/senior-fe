import React from 'react';
import * as moment from 'moment';

const SliderItem = (props) => {  
  let formatDate = moment(new Date(props.date)).format('YYYY.MM.DD');
  return(
    <div className="slider-item" style={{width:`${props.width}%`}}>
      <div className="slider-image">
        <img
        className="img-responsive" 
        src={props.src ? props.src : require('../../../../images/slider-image.jpg')} 
        alt="Slider item" />
      </div>
      <div className="slider-content flex flex-align-end flex-center">
        <h2 className={`slider-header ${props.showSliderText ? 'is-active' : ''}`}>
          <span>{props.title}</span>
        </h2>
        <time className="slider-time" dateTime={formatDate}>{formatDate}</time>
      </div>
    </div>
  );
}

export default SliderItem;