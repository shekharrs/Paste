import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      // ✅ Check if paste already exists
      const existingPaste = state.pastes.find((p) => p.title === paste.title && p.content === paste.content);

      if(existingPaste){
        toast.error("Paste with same title and content already exists!");
        return; // ✅ Stop execution if duplicate is found
      }

       // ✅ Generate a unique ID only for new pastes
       const newPaste = {
        ...action.payload,
        _id: action.payload._id || Date.now().toString(36),
        createdAt: new Date().toISOString(),
       }

      state.pastes.push(newPaste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully!");
    },
    updateToPastes: (state, action) => {

    },
    resetAllPastes: (state, action) => {},
    removeFromPastes: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
