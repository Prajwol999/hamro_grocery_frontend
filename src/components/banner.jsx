import React from 'react';
import { Link } from 'react-router-dom';
import video from "../assets/banner.mp4";
import black_arrow_icon from '../assets/black_arrow_icon.svg';
import white_arrow_icon from '../assets/white_arrow_icon.svg';

const Banner = () => {
  return (
    <div className="banner-container relative">
      <video className="banner-video w-full h-full object-cover" autoPlay loop muted playsInline>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="banner-content absolute inset-0 flex items-center justify-center mt-65">
        {/* <h1>Welcome to Our Site</h1>
         <p>Experience the difference</p> */}
        <div className='flex items-center gap-4 font-medium'>
          <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
            shop now
            <img className='md:hidden transition group-focus:translate-x-1' src={white_arrow_icon} alt="white arrow"/>
          </Link>
          <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
            Explore deals
            <img className='md:hidden transition group-focus:translate-x-1' src={black_arrow_icon} alt="black arrow"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;