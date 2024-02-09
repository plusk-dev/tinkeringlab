import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './assets/geist.otf';
import Login from './Login';


function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
