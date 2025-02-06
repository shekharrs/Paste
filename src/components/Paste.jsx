import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

const Paste = () => {
  const navigate = useNavigate();
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
    // toast.success("Paste deleted successfully");
  };

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto">
      {/* Search Input */}
      <input
        className="w-full sm:w-3/4 p-4 text-lg rounded-2xl bg-gray-800 text-white 
                   border border-gray-600 focus:ring-4 focus:ring-purple-500 
                   transition-all outline-none shadow-md"
        type="search"
        placeholder="🔍 Search your paste here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Paste List */}
      <div className="flex flex-col gap-6 mt-8">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste?._id}
              className="p-6 bg-gray-900/80 border border-gray-700 rounded-2xl 
                            shadow-lg text-white transition-all"
            >
              <h2 className="text-xl font-semibold">{paste.title}</h2>
              <p className="mt-3 text-gray-300">{paste.content}</p>

              <div className="flex flex-wrap gap-3 mt-6">
                {/* Edit Button */}
                <button
                  onClick={() => navigate(`/?pasteId=${paste?._id}`)}
                  className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 
                             transition-all text-white shadow-md"
                >
                  ✏️ Edit
                </button>

                {/* View Button */}
                <button
                  onClick={() => navigate(`/pastes/${paste?._id}`)}
                  className="px-5 py-2 rounded-xl bg-green-500 hover:bg-green-600 
                             transition-all text-white shadow-md"
                >
                  👀 View
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 
                             transition-all text-white shadow-md"
                >
                  🗑️ Delete
                </button>

                {/* Copy Button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to Clipboard!");
                  }}
                  className="px-5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 
                             transition-all text-white shadow-md"
                >
                  📋 Copy
                </button>

                {/* Share Button */}
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: paste.title,
                          text: paste.content,
                          url: `${window.location.origin}/pastes/${paste?._id}`,
                        })
                        .then(() => toast.success("Shared successfully!"))
                        .catch((error) =>
                          console.error("Error sharing:", error)
                        );
                    } else {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/pastes/${paste?._id}`
                      );
                      toast.success("Link copied to clipboard!");
                    }
                  }}
                  className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 
                             transition-all text-white shadow-md"
                >
                  🔗 Share
                </button>
              </div>

              <p className="mt-4 text-sm text-gray-400">{formatDate(paste?.createdAt)}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-6">
            No pastes found. Try adding some!
          </p>
        )}
      </div>
    </div>
  );
};

export default Paste;