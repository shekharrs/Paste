import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  const createPaste = () => {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  return (
    <div className="mt-8 p-6 sm:p-12 md:p-16 rounded-3xl shadow-xl border border-gray-600 
                    bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-md 
                    transition-all max-w-3xl mx-auto">
      
      {/* Title Input & Button */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-between">
        <input
          className="px-6 py-4 sm:py-5 text-lg w-full sm:w-3/4 rounded-2xl border border-gray-500 
                     bg-gray-900/40 text-gray-200 placeholder-gray-400 
                     focus:ring-4 focus:ring-purple-500 focus:border-purple-400 
                     transition-all outline-none shadow-md"
          type="text"
          placeholder="Enter your title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="px-8 py-4 rounded-2xl text-lg font-semibold text-white 
                     bg-gradient-to-r from-purple-500 to-indigo-500 
                     hover:from-purple-600 hover:to-indigo-600 focus:ring-4 focus:ring-purple-400 
                     transition-all shadow-lg"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      {/* Textarea */}
      <div className="mt-6">
        <textarea
          className="resize-none w-full min-h-[200px] md:h-96 text-lg p-5 rounded-2xl border border-gray-500 
                     bg-gray-900/40 text-gray-200 placeholder-gray-400 
                     focus:ring-4 focus:ring-purple-500 focus:border-purple-400 
                     transition-all outline-none shadow-md"
          placeholder="Write your content here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;