import React, { useState,  useEffect } from 'react';
import SliderItem from './SliderItem';
import SliderDot from './SliderDot';
import { useSelector, useDispatch } from 'react-redux';
import { getSliderPosts } from '../../../redux/modules/post';

function Slider() {
  const [ sliderIndex, setSliderIndex ] = useState(0);
  const [ showSliderText, setShowSliderText ] = useState(false);
  const [ showSlider, setShowSlider ] = useState(false);
  const { sliderPosts, errors, loading } = useSelector(state => state.post);
  const dispatch = useDispatch();

  let buttonLeftClass = (sliderIndex === 0) ? 'slider-arrow slider-arrow-left is-disabled' : 'slider-arrow slider-arrow-left';
  let buttonRightClass = (sliderIndex === sliderPosts.length - 1) ? 'slider-arrow slider-arrow-right is-disabled' : 'slider-arrow slider-arrow-right';
  let sliderListStyle = {
    transform: (sliderIndex === 0) ? 'translate(0, 0)' : `translate(-${(100 / sliderPosts.length) * sliderIndex}%, 0)`,
    width: `${sliderPosts.length * 100}%`
  };

  function handleDotsClick(index) {
    setSliderIndex(prevIndex => (index !== prevIndex) ? index : prevIndex);
    setShowSliderText(false);
    setTimeout(() => {
      setShowSliderText(true);
    }, 450);
  }

  function handleArrowClick(value) {
    setSliderIndex(prevIndex => {
      let diff = prevIndex + value;

      return (diff > -1 && diff < sliderPosts.length) ? diff : prevIndex
    });
    setShowSliderText(false);
    setTimeout(() => {
      setShowSliderText(true);
    }, 450);
  }

  useEffect(() => {
    dispatch(getSliderPosts({ offset: 0, limit: 3}));
  }, []);

  useEffect(() => {
    if(!loading) {
      setTimeout(() => {
        setShowSlider(true);
        setShowSliderText(true);
      }, 1000);
    }
  }, [loading]);

  if(errors && errors.length) return <h2>Network Error</h2>
  return (
    <div className="slider">
      { showSlider ?
        <React.Fragment>
          <div className="slider-list" style={sliderListStyle}>
            {sliderPosts.map((item, index) => 
              <SliderItem 
              src={item.image} 
              title={item.title}
              date={item.createdAt}
              key={`slider-item-${index}`}
              width={100 / sliderPosts.length}
              index={index}
              showSliderText={showSliderText} />
            )}
          </div>
          <button 
          className={buttonLeftClass}
          onClick={() => handleArrowClick(-1)}>
            <img
            src={require('../../../../images/slider-arrow-left.png')} 
            alt="Slider arrow left" />
          </button>
          <button 
          className={buttonRightClass}
          onClick={() => handleArrowClick(1)}>
            <img
            src={require('../../../../images/slider-arrow-right.png')} 
            alt="Slider arrow right" />
          </button>
          <ul className="slider-dots">
          {sliderPosts.map((item, index) =>
            <SliderDot 
            key={`slider-dot-${index}`}
            active={sliderIndex}
            index={index} 
            handleClick={handleDotsClick} />
          )}
          </ul>
        </React.Fragment> : 
        <div className="flex flex-align-center flex-center" style={{height: '500px'}}>
          <img src={require('../../../../images/loading.gif')} alt="loading" />
        </div>
      }
    </div>
  );
}

export default Slider;