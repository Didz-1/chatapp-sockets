import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import {ChatPage, HomePage, NotFoundPage} from "./pages";


function App() {

  

  return (
    <>
      <Routes>
        <Route path="/" >
          <Route index element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/*" element={<NotFoundPage />} />       
        </Route>
      </Routes>
    </>
  )
}

export default App;
