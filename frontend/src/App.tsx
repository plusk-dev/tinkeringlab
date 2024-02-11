import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './assets/geist.otf';
import Login from './Login/Login';
import { Toaster } from "@/components/ui/toaster"
import {LandingPage} from "./Landing_Page/LandingPage";


function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}
export default App;
