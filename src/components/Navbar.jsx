import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/hamro.png";
import search from "../assets/search.png";
import nav_cart_icon from '../assets/nav_cart_icon.svg';
import menu_icon from '../assets/menu_icon.svg';
import profile_icon from '../assets/profile_icon.png';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, showUserLogin, setShowUserLogin, navigate } = useAppContext();

  const logout = async () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white/95 backdrop-blur-sm relative transition-all shadow-sm">
      
      {/* Logo */}
      <NavLink to='/' onClick={()=>setOpen(false)}>
        <img className="h-14 md:h-16 object-contain" src={logo} alt="Company Logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink 
          to='/' 
          className="text-gray-700 hover:text-primary transition-colors font-medium"
        >
          Home
        </NavLink>
        <NavLink 
          to='/products' 
          className="text-gray-700 hover:text-primary transition-colors font-medium"
        >
          All Product
        </NavLink>
        <NavLink 
          to='/contact' 
          className="text-gray-700 hover:text-primary transition-colors font-medium"
        >
          Contact
        </NavLink>

        <div className="hidden lg:flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-full bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
          <input
            className="w-60 bg-transparent outline-none placeholder-gray-500 text-sm"
            type="text"
            placeholder="Search products"
          />
          <img src={search} alt="search" className="w-4 h-4 object-contain" />
        </div>

        <div onClick={()=> navigate('/cart')} className="relative cursor-pointer hover:scale-110 transition-transform">
          <img src={nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">3</button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-full font-medium shadow-md hover:shadow-lg"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={profile_icon} className="w-10 rounded-full cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all" alt="Profile" />

            <ul className="hidden group-hover:block absolute top-12 right-0 bg-white shadow-lg border border-gray-100 py-2.5 w-32 rounded-lg text-sm z-40">
              <li
                onClick={() => navigate("my-orders")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer transition-colors"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer transition-colors"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden hover:bg-gray-100 p-2 rounded-md transition-colors">
        <img src={menu_icon} alt="menu" />
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[70px] left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden border-t border-gray-100">
          <NavLink to="/" onClick={() => setOpen(false)} className="py-2 hover:text-primary transition-colors">Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)} className="py-2 hover:text-primary transition-colors">All Product</NavLink>
          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)} className="py-2 hover:text-primary transition-colors">My Orders</NavLink>
          )}
          <NavLink to="/contact" onClick={() => setOpen(false)} className="py-2 hover:text-primary transition-colors">Contact</NavLink>
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-full text-sm font-medium"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-full text-sm font-medium"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;