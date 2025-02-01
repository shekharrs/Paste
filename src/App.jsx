import React from "react";
import "./App.css";
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import ErrorPage from "./components/ErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <div>
      <Navbar />
      <Home />
    </div>
  },
  {
    path: "/pastes",
    element:
    <div>
      <Navbar />
      <Paste />
    </div>
  },
  {
    path: "/pastes/:id",
    element: 
    <div>
      <Navbar />
      <ViewPaste />
    </div>
  },
  {
    path: "*", /* Wildcard route for undefined paths */
    element:
    <div>
      <Navbar />  
      <ErrorPage />
    </div>
  }
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;
