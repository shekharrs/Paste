import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const Home = () => {

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  const [searchParams, setSearchParams] = useSearchParams('');
  const pasteId = searchParams.get("pasteId");

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
      <input
      className='p-2 w-80 rounded-2xl mt-5 pl-5' 
      type="text" 
      placeholder='Title'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      />

      <button className='p-2 rounded-2xl mt-5' >
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button>
    </div>

    <div>
      <textarea 
      className='resize-none mt-5 w-full h-96 pl-5 pt-5 rounded-2xl'
      placeholder='Content'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      />
    </div>
    </div>
  )
}

export default Home