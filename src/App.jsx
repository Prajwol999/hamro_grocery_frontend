import React, { useState } from 'react';
import NavigationContext from './context/NavigationContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import HomePage from './pages/HomePage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const navigate = (page) => setCurrentPage(page);

  const renderPage = () => {
    switch (currentPage) {
      case 'login': return <LoginPage />;
      case 'signup': return <SignupPage />;
      case 'products':
      case 'contact':
      case 'about':
      case 'home':
      default: return <HomePage />;
    }
  };

  return (
    <NavigationContext.Provider value={{ navigate }}>
      <Navbar />
      {renderPage()}
      {/* <Footer /> */}
    </NavigationContext.Provider>
  );
}

export default App;
export { NavigationContext, App };