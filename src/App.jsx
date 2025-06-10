import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { useAppContext } from './context/AppContext';

const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.startsWith('/seller');
  const{showuserLogin} = {useAppContext}

  return (
    <div>
      <Navbar />
      {showuserLogin? <Login/>:null}
      
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    
  );
};

export default App;