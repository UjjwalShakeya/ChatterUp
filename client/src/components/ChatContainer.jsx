import { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets.js'
import { formatMessageTime } from '../lib/utils.js';

// ChatContainer handles the main chat panel UI
// It conditionally renders either:
// 1. Active chat view (when a user is selected)
// 2. Empty state (when no user is selected)
const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();

  useEffect(()=>{
    if(scrollEnd.current){
      scrollEnd.current.scrollIntoView({behavior:"smooth"})
    }
  },[])

  // If a user is selected → show chat UI
  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/* 
        Header Section (Chat Top Bar)
        - Displays user info + actions
        - Acts like WhatsApp/Telegram chat header
      */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>

        {/* User Avatar */}
        <img
          src={assets.profile_martin}
          alt='User profile' // Always add meaningful alt for accessibility
          className='w-8 rounded-full'
        />

        {/* 
          User Name + Online Status
          flex-1 ensures this section takes available space,
          pushing icons to the right
        */}
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          Marting Johonson

          {/* Online Indicator (green dot) */}
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </p>

        {/* 
          Back Button (Mobile Only)
          - Visible only on small screens (md:hidden)
          - Used to deselect user and return to chat list
        */}
        <img
          onClick={() => setSelectedUser(null)} // resets selected chat
          src={assets.arrow_icon}
          alt="Back"
          className='md:hidden max-w-7'
        />

        {/* 
          Help / Info Icon (Desktop Only)
          - Hidden on small screens
          - Could later open modal, info panel, etc.
        */}
        <img
          src={assets.help_icon}
          alt="Help"
          className='max-md:hidden max-w-5'
        />
      </div>


      {/* chat area where you will be able to see the chat of current going conversation between user and you */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${msg.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}`}
          >
            {msg.image ? (<img src={msg.image} alt='' className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
            ) : (
              <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === "680f50e4f10f3cd28382ecf9" ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                {msg.text}
              </p>
            )}
            <div className='text-center text-xs'>
              <img src={msg.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin}  alt="" className='w-7 rounded-full' />
              <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>

            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
            <input type="text" placeholder='Send a message' className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'/>
            <input type="file" id='image' accept='image/png, image/jpeg' hidden/>
            <label htmlFor="image">
              <img src={assets.gallery_icon} alt="" className='w-6 mr-2 cursor-pointer'/>
            </label>
        </div>
          <img src={assets.send_button} alt="" className='w-7 cursor-pointer' />
      </div>

    </div>

  ) : (

    // Empty State UI (No chat selected)
    // Improves UX by guiding user instead of showing blank screen
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>

      {/* App Logo */}
      <img
        src={assets.logo_icon}
        className='max-w-15'
        alt='App logo'
      />

      {/* Placeholder Message */}
      <p className='text-lg font-medium text-white'>
        Chat anytime, anywhere
      </p>
    </div>
  )
}

export default ChatContainer