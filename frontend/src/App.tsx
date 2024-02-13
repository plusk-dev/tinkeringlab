import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./Login/Login"
import { Toaster } from "@/components/ui/toaster"
import Dashboard from './Dashboard';
import Booking from './Booking';
import './assets/geist.otf';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/booking' element={<Booking />} />
      </Routes>
    </>
  );
}
export default App;
