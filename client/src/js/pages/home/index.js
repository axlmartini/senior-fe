import React from 'react';
import Slider from './slider/Slider';
import News from './news/News';

export default function Home() {
  return (
    <React.Fragment>
      <Slider />
      <News />
    </React.Fragment>
  )
}