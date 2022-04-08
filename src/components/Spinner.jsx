import React from 'react';

import Loader from 'react-loader-spinner';


function Spinner({message}) {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
        <Loader 
            type='Circles'
            color='#4b595e'
            height={50}
            width={200}
            className="m-5"
        />

        <p className='text-lg text-[#307d9a] text-center px-2'>{message}</p>
    </div>
  )
};

export default Spinner;