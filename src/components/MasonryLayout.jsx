import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';


const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 4, 
  1000: 3,
  500: 2,
  250: 1
}

const MasonryLayout = ({pins}) => {
  return (
    <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointObj}>
      {pins?.map((pin) => <Pin key={pin.id} pin={pin} className="w-max" />)}
    </Masonry>
  )
}

export default MasonryLayout;