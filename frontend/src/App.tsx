import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import { Toaster } from "@/components/ui/toaster"
import Dashboard from './Dashboards/Dashboard';
import AdminDashboard from './Dashboards/adminDash';
import Component from './Bookings/Component';
import { LandingPage } from './Landing_Page/LandingPage';
import Machine from './Bookings/Machine'
import Workstation from './Bookings/workstation';
import ReqMach from './requests/machinereq';
import WorkMech from './requests/workstationreq';
import Reqcomp from './requests/componentreq';
import Inventory from './Inventory/inventory2';
import Allreqs from './requests/Allreqs';
import Land from './requests/Event_edit';
import EAP from './Landing_Page/Events&projects';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/dashboard/booking' element={<Component />} />
        <Route path='/dashboard/machine' element={<Machine />} />
        <Route path='/dashboard/workstation' element={<Workstation />} />
        <Route path='/admin/dashboard/machine' element={<ReqMach />} />
        <Route path='/admin/dashboard/workstation' element={<WorkMech />} />
        <Route path='/admin/dashboard/component' element={<Reqcomp />} />
        <Route path='/admin/dashboard/inventory' element={<Inventory />} />
        <Route path='/admin/dashboard/allreqs' element={<Allreqs />} />
        <Route path='/admin/dashboard/Landing_page' element={<Land />} />
      </Routes>
    </>
  );
}
export default App;
