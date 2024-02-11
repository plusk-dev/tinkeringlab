import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './assets/geist.otf';
import Login from './Login';
import { Toaster } from "@/components/ui/toaster"


function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
