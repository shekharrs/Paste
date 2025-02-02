import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const createPaste  = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString()
    }

    if(pasteId){
      // update
      dispatch(updateToPastes(paste));
    }
    else{
      // create
      dispatch(addToPastes(paste));
    }

    // after creation or updation clear the UI page
    setTitle('');
    setValue('');
    setSearchParams({});
  }

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

      <button onClick={createPaste} className='p-2 rounded-2xl mt-5' >
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