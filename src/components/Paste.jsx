import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Paste = () => {
  const navigate = useNavigate();

  const pastes = useSelector((state) => state.paste.pastes);
  // console.log(pastes);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ handling delete operation on the delete button
  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  return (
    <div>
      <input
        className="mt-10 p-3 w-96 rounded-3xl pl-4"
        type="search"
        placeholder="Search your paste here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-10">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div key={paste?._id} className="border">
                <div>{paste.title}</div>

                <div>{paste.content}</div>

                <div className="flex flex-row gap-5 mt-8 place-content-evenly">
                  {/* ✅ Handle Edit operation (it will go to the particular pasteID Home Page) */}
                  <button onClick={() => navigate(`/?pasteId=${paste?._id}`)}>
                    Edit
                  </button>
                   
                   {/* ✅ Handle View operation (it will render View Page) */}
                  <button onClick={() => navigate(`/pastes/${paste?._id}`)}>
                    View
                  </button>

                   {/* ✅ Handle Delete operation */}
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>

                  {/* ✅ Handle Copy operation  */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copy to Clipboard");
                    }}
                  >
                    Copy
                  </button>

                  {/* Pending Operation - SHARE */}
                  <button>Share</button>
                </div>

                <div className="mt-2">{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
