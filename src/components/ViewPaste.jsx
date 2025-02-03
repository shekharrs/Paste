import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

// View Page UI
const ViewPaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];
  // console.log("Final Paste: ",paste);


  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
      <input
      className='p-2 w-80 rounded-2xl mt-5 pl-5' 
      type="text" 
      placeholder='Title'
      disabled
      value={paste.title}
      onChange={(e) => setTitle(e.target.value)}
      />

      {/* <button onClick={createPaste} className='p-2 rounded-2xl mt-5' >
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button> */}
    </div>

    <div>
      <textarea 
      className='resize-none mt-5 w-full h-96 pl-5 pt-5 rounded-2xl'
      placeholder='Content'
      disabled
      value={paste.content}
      onChange={(e) => setValue(e.target.value)}
      />
    </div>
    </div>
  )
}

export default ViewPaste