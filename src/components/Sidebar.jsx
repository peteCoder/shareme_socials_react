import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';

import logo from '../assets/logo.png';


// Continue from here... Breakpoint
const isNotActiveStyle = 'flex items-center px-5 gap-3 hover:text-black duration-200 ease-in-out';
const isActiveStyle = '';


const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) {
      closeToggle(false)
    }
  }



  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll w-full' >
      <div className="flex flex-col">
        <Link
          to='/'
          className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar}
        >
          <img src={logo} className='w-full' alt='logo' />
        </Link>

        <div className="flex flex-col gap-5">
          <NavLink to='/' className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}></NavLink>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;