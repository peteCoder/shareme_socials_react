import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// React Icons
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

// fetchUserInfo
import { fetchUser } from '../utils/fetchUser';


import { client, urlFor } from '../client';

function Pin({ pin: { postedBy, image, _id, destination, save } }) {

    const navigate = useNavigate();
    const [postHovered, setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false);

    const user = fetchUser();

    // console.log(save) // Why does SAVE return null? 
    // Save is an array, but will return null if there is nothing in the array.
    // Error: Would return null. Null do not have length property 
    // That is why the tenery conditional operator is used for error handling below.
    // The tenery NOT (!!) is used to return true if false -> !false or false if true -> !true

    const alreadySaved = (save !== null) ? !!((save?.filter((item) => item.postedBy._id === user.googleId)).length) : false; // Continue from here
    


    return (
        <div className='m-2 '>
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
            >
                <img className='rounded-lg w-full' src={urlFor(image).width(250).url()} alt="" />
                {postHovered && (
                    <div
                        className="absolute top-0 w-full h-full flex-col justify-between p-1 pr-2 pb-2 z-50"
                        style={{ height: "100%" }}
                    >
                        <div className='flex items-center justify-between'>
                            <div className="flex gap-2">
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-black text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                > <MdDownloadForOffline /> </a>
                            </div>
                            {alreadySaved ? (
                                <button className='bg-white'>Saved</button>
                            ) : (
                                <button className='bg-white'>Save</button>
                            )}
                        </div>
                    </div>
                )}
            </div>



        </div>
    )
}

export default Pin;