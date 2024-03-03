import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import { Toaster } from "@/components/ui/toaster"
import Dashboard from './Dashboard';
import Component from './Bookings/Component';
import { LandingPage } from './Landing_Page/LandingPage';
import Machine from './Bookings/Machine'
import Workstation from './Bookings/workstation';
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/booking' element={<Component />} />
        <Route path='/dashboard/machine' element={<Machine/>}/>
        <Route path='/dashboard/workstation' element={<Workstation/>}/>
      </Routes>
    </>
  );
}
export default App;
