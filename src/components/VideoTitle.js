import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video  pt-[16%] px-6 md:px-12 absolute text-white bg-gradient-to-r from-black  '>
        <h1 className=' text-2xl md:text-4xl w-1/2 font-bold'>{title}</h1>
        <p className='hidden md:inline-block py-6 text-m w-1/4'>{overview}</p>
        <div className='my-4 md:m-0'>
            <button className=' bg-white text-black p-2 px-6 md:px-10 text-lg rounded-lg hover:bg-opacity-80'>Play</button>
            <button className=' hidden md:inline-block mx-2 bg-gray-500 text-white p-2 px-10 text-lg bg-opacity-50 rounded-lg'>MoreInfo</button>
        </div>
    </div>
  )
}

export default VideoTitle