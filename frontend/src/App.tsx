import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "./Dashboards/Dashboard";
import AdminDashboard from "./Dashboards/adminDash";
import Component from "./Bookings/Component";
import { LandingPage } from "./Landing_Page/LandingPage";
import Machine from "./Bookings/Machine";
import Workstation from "./Bookings/workstation";
import ReqSess from "./requests/session/page";
import ReqWork from "./requests/workstations/page";
import WorkMech from "./requests/workstationreq";
import Reqcomp from "./requests/component/page";
import Inventory from "./Inventory/inventory2";
import Allreqs from "./requests/Allreqs/page";
import Land from "./requests/Event_edit";
import Signup from "./Login/Signup";
import Users from "./requests/Users";
import Intern from "./requests/Intern";
import EAP from "./Landing_Page/Events&projects";
import Hierarchy from "./Inventory/hierarchy";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard/booking" element={<Component />} />
        <Route path="/dashboard/machine" element={<Machine />} />
        <Route path="/dashboard/workstation" element={<Workstation />} />
        <Route path="/admin/dashboard/session" element={<ReqSess />} />
        <Route path="/admin/dashboard/workstation" element={<ReqWork />} />
        <Route path="/admin/dashboard/component" element={<Reqcomp />} />
        <Route path="/admin/dashboard/inventory" element={<Inventory />} />
        <Route path="/admin/dashboard/allreqs" element={<Allreqs />} />
        <Route path="/admin/dashboard/Landing_page" element={<Land />} />
        <Route path="/admin/dashboard/Intern" element={<Intern />} />
        <Route path="/admin/dashboard/hierarchy" element={<Hierarchy />} />
      </Routes>
    </>
  );
}
export default App;
