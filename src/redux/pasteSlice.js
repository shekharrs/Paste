import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

// Creating a Redux slice for managing pastes
export const pasteSlice = createSlice({
  name: "paste", // Slice name
  initialState, // Initial state is fetched from localStorage
  reducers: {
    // ✅ Add a new paste
    addToPastes: (state, action) => {
      const paste = action.payload;

      // ✅ Check if a paste with the same title and content already exists
      const existingPaste = state.pastes.find(
        (p) => p.title === paste.title && p.content === paste.content
      );

      if (existingPaste) {
        toast.error("Paste with same title and content already exists!");
        return; // Stop execution if duplicate is found
      }

      // ✅ Create a new paste object with a unique ID and timestamp
      const newPaste = {
        ...paste,
        _id: paste._id || Date.now().toString(36), // Generate unique ID if not provided
        createdAt: new Date().toISOString(), // Store the creation date
      };

      // ✅ Add the new paste to the state
      state.pastes.push(newPaste);

      // ✅ Save the updated pastes list in localStorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      // ✅ Show success notification
      toast.success("Paste Created Successfully!");
    },

    // ✅ Update an existing paste
    updateToPastes: (state, action) => {
      const paste = action.payload;

      // ✅ Find the paste by its ID
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        // ✅ Update the paste content in the array
        state.pastes[index] = paste;

        // ✅ Save the updated pastes list in localStorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        // ✅ Show success notification
        toast.success("Paste Updated");
      }
    },

    // ✅ Reset (clear) all pastes
    resetAllPastes: (state, action) => {
      state.pastes = []; // Clear all pastes from the state

      // ✅ Remove all pastes from localStorage
      localStorage.removeItem("pastes");
    },

    // ✅ Remove a specific paste
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);

      // ✅ Find the paste by its ID
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        // ✅ Remove the paste from the array
        state.pastes.splice(index, 1);

        // ✅ Save the updated pastes list in localStorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        // ✅ Show success notification
        toast.success("Paste deleted");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
