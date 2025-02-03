import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  /***********************/
  // ✅ handle Edit operation ( here the particular pasteId for edit where you can get the update the paste button)
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(()=>{
    if(pasteId){
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId])
  /***********************/

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
    <div className='mt-5'>
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