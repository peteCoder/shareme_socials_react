import React, { useState, useEffect, useRef } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import logo from '../assets/logo.png';


// Components
import { Sidebar, UserProfile } from '../components';

import Pins from './Pins';

// Client
import { client } from '../client';

// Utils
import { userQuery } from '../utils/data';





const Home = () => {

  // States
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);

  // Ref
  const scrollRef = useRef(null);

  const userInfo = localStorage.getItem("user") !== 'undefined' ? JSON.parse(localStorage.getItem("user")) : localStorage.clear();

  // Get user Information from Sanity
  // useEffect
  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query)
      .then(data => {

        setUser(data[0])
        console.log(data)
        // console.log(data[0])
      })
  }, [userInfo?.googleId])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
    console.log(scrollRef.current)
  }, [])



  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex justify-between items-center shadow-md'>
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />

          <Link to='/'>
            <img src={logo} alt="logo" className='w-28' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className='w-28' />
          </Link>
        </div>

          {toggleSidebar && (
            <div className='fixed w-4/5 h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
              <div className='absolute w-full flex justify-end items-center p-2 '>
                <AiFillCloseCircle
                  fontSize={30}
                  className="cursor-pointer"
                  onClick={ () => setToggleSidebar(false)}
                />
              </div>
              <Sidebar user={user && user} closeToggle={setToggleSidebar} />
            </div>
          )}
      </div>

      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile/>} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home;