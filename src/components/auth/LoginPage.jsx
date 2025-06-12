import React, { useEffect } from 'react';
import NavigationContext from '../../context/NavigationContext';
import Navbar from '../Navbar';
import logo from '../../assets/hamro2.png';

const LoginPage = () => {
  const { navigate } = React.useContext(NavigationContext);

  // Add styles to override navbar on component mount
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Force the header to have a white background and shadow */
      header {
        background: rgba(255, 255, 255, 0.95) !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        backdrop-filter: blur(4px) !important;
      }

      /* Override nav link colors to extremely dark */
      header nav a {
        color: #1a1a1a !important;
      }

      /* Hover state for nav links */
      header nav a:hover {
        color: #15803d !important;
      }

      /* Search button icon color */
      header nav button svg {
        stroke: #1a1a1a !important;
      }

      /* Search button hover background */
      header nav button:hover {
        background: #e5e7eb !important;
      }

      /* Menu button (mobile) icon color */
      header nav .lg\\:hidden button svg {
        stroke: #1a1a1a !important;
      }

      /* Mobile menu background and text */
      .bg-black\\/40 .bg-white {
        background: #ffffff !important;
      }

      .bg-black\\/40 .bg-white a {
        color: #1a1a1a !important;
      }

      /* Mobile menu close button icon */
      .bg-black\\/40 .bg-white button svg {
        stroke: #1a1a1a !important;
      }

      /* Mobile menu logo text */
      .bg-black\\/40 .bg-white span {
        color: #15803d !important;
      }

      /* Hide the Login button in desktop view */
      header nav div button.bg-green-600 {
        display: none !important;
      }

      /* Hide the Login button in mobile menu */
      .bg-black\\/40 .bg-white button.bg-green-600 {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function to remove styles when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login form submitted');
  };

  return (
    <>
      <Navbar />
      
      <div className="pt-24 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg m-4">
          <div className="text-center mb-8">
            <button onClick={() => navigate('home')} className="inline-block">
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-auto mx-auto"
              />
            </button>
            <p className="text-gray-500 mt-2">Welcome back! Please enter your details.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  // Add forgot password logic
                }}
                className="text-sm text-green-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
              >
                Login
              </button>
            </div>
          </form>
          
          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{' '}
            <button 
              onClick={() => navigate('signup')} 
              className="font-semibold text-green-600 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;