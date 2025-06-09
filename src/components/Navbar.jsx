import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/hamro.png";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      
      {/* Logo */}
      <a href="#" className="flex items-center pl-2">
  <img className="h-14 md:h-16 object-contain" src={logo} alt="Company Logo" />
</a>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/'>All product</NavLink>
        <NavLink to='/'>Contact</NavLink>
        

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.8359 10.6152L14.9999 14.6949" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.14099 11.7381C11.8699 10.6019 13.142 7.51376 11.9822 4.84043C10.8224 2.1671 7.67004 0.920959 4.94113 2.0571C2.21222 3.19324 0.940171 6.28142 2.09993 8.95475C3.25969 11.6281 6.41208 12.8742 9.14099 11.7381Z" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </div>

        <div className="relative cursor-pointer">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3333_269)">
<path d="M0.583008 0.583008H2.91634L4.47967 8.39384C4.53302 8.6624 4.67912 8.90365 4.89241 9.07535C5.1057 9.24705 5.37258 9.33825 5.64634 9.33301H11.3163C11.5901 9.33825 11.857 9.24705 12.0703 9.07535C12.2836 8.90365 12.4297 8.6624 12.483 8.39384L13.4163 3.49967H3.49967M5.83301 12.2497C5.83301 12.5718 5.57184 12.833 5.24967 12.833C4.92751 12.833 4.66634 12.5718 4.66634 12.2497C4.66634 11.9275 4.92751 11.6663 5.24967 11.6663C5.57184 11.6663 5.83301 11.9275 5.83301 12.2497ZM12.2497 12.2497C12.2497 12.5718 11.9885 12.833 11.6663 12.833C11.3442 12.833 11.083 12.5718 11.083 12.2497C11.083 11.9275 11.3442 11.6663 11.6663 11.6663C11.9885 11.6663 12.2497 11.9275 12.2497 12.2497Z" stroke="#4FBF8B" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_3333_269">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>

          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">3</button>
        </div>

        <button className="cursor-pointer px-8 py-2 bg-primary-dull hover:bg-green-600 transition text-white rounded-full">
          Login
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
        <a href="#" className="block">Home</a>
        <a href="#" className="block">About</a>
        <a href="#" className="block">Contact</a>
        <button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-indigo-600 transition text-white rounded-full text-sm">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
