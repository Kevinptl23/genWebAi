import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home.jsx';
import { useGetCurrentUser } from './hoocks/useGetCurrentUser.jsx';
import { useSelector } from 'react-redux';
import { Dashboard } from './pages/Dashboard.jsx';
import { Editor } from './pages/Editor.jsx';
import CreateWebsitePage from './pages/CreateWebsitePage.jsx';
import { Price } from './pages/Price.jsx';

const App = () => {
  useGetCurrentUser()
  const {userData} = useSelector(state => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path='/dashboard' element={ userData ? <Dashboard/> : <Home/> } />
        <Route path='/editor/:id' element={ userData ? <Editor/> : <Home/>} />
        <Route path='/create-website' element={ userData ? <CreateWebsitePage/> : <Home/>} />
        <Route path='/price' element={<Price/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
