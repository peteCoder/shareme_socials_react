import React from 'react';
import { Route, Routes } from 'react-router-dom';
// Components
import Login from './components/Login';
// Containers
import Home from './containers/Home';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/*' element={<Home/>} />
    </Routes>
  );
}

export default App;
