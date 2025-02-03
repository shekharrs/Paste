import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
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
        className="mt-10 p-2 w-96 rounded-2xl pl-4"
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
                  <button>Edit</button>
                  <button>View</button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button
                    // ✅ handle Copy operation 
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
