import React from 'react';
import {ReactTyped} from 'react-typed';

const Hero = () => {
  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          FLO PERFUMES
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Find your scent.
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-4xl sm:text-2xl text-xl font-bold py-4'>
            Affordable options for brands such as
          </p>
          <ReactTyped
          className='md:text-4xl sm:text-2xl text-xl font-bold md:pl-4'
            strings={['A', 'B', 'C']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <a href="/home" className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</a>
      </div>
    </div>
  );
};

export default Hero;