import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// React Icons
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

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

    const alreadySaved = !!((save?.filter((item) => item?.postedBy?._id === user?.googleId))?.length);

    // SavePin Func
    const savePin = (id) => {
        if (!alreadySaved) {
            setSavingPost(true)

            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: user?.googleId,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user?.googleId
                    }
                }]).commit()
                .then(() => {
                    window.location.reload();
                    setSavingPost(false)
                })
        }
    }

    // deletePin Func
    const deletePin = (id) => {
        client
            .delete(id)
            .then(() => {
                window.location.reload();
            })
    }

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
                                <button

                                    type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 rounded-3xl hover:shadow-md outline-none'>
                                    {save?.length}    Saved
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        savePin(_id);
                                    }}

                                    type='button'
                                    className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 rounded-3xl hover:shadow-md outline-none'
                                >
                                    Save
                                </button>
                            )}
                        </div>

                        <div className='flex justify-between absolute items-center gap-2 w-full bottom-1 left-1'>
                            {destination && (
                                <a 
                                    href={destination} 
                                    target='_blank' 
                                    rel="noreferrer"
                                    className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                                >
                                    <BsFillArrowUpRightCircleFill />
                                    {destination.length > 20 ? destination.slice(8, 14) : destination.slice(8)}
                                </a>
                            )}

                            {postedBy?._id === user?.googleId &&(
                                <button 
                                onClick={
                                    (e) => {
                                        e.stopPropagation();
                                        deletePin(_id);
                                    }
                                }
                                className='bg-red-500 p-2 rounded-full flex items-center justify-center text-white text-xl opacity-75 hover:opacity-100 mr-3 hover:shadow-md outline-none'
                                type='button'>
                                    <AiTwotoneDelete />
                                </button>
                            )}
                        </div>
                        
                    </div>
                    
                )}

                
            </div>

            <Link to={`user-profile/${postedBy?.id}`} className="flex gap-2 items-center mt-2 z-100" >
                <img 
                    className='w-8 h-8 rounded-full object-cover bg-red-500'
                    src={postedBy?.image} 
                    alt="user-profile"
                />
                <p className='font-light capitalize'>{postedBy?.userName}</p>
             </Link>



        </div>
    )
}

export default Pin;