import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setMenuOpen(false);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <a href='/' className='w-full text-3xl font-bold text-[#00df9a] p-4'>FP.</a>

      <ul className='hidden md:flex items-center ml-auto'>
        {user ? (
          <>
            <div className='relative flex items-center cursor-pointer' onClick={toggleMenu}>
              <FaUserCircle className='text-3xl text-[#00df9a] mr-2' />
              <span className='text-white font-bold'>{user.name}</span>
              {menuOpen && (
               <div className='absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 p-4 rounded shadow-lg z-50 w-48'>
               <a href='/account' className='block text-white py-2 hover:text-[#00df9a] border-b border-gray-600'>Informații cont</a>
               <a href='/favorites' className='block text-white py-2 hover:text-[#00df9a] border-b border-gray-600'>Parfumuri preferate</a>
               <a href='/addPerfume' className='block text-white py-2 hover:text-[#00df9a] border-b border-gray-600'>Adaugă un parfum</a>
               <a href='/' onClick={handleLogout} className='block text-white py-2 hover:text-[#00df9a]'>Logout</a>
           </div>
              )}
            </div>
          </>
        ) : (
          <>
            <a href='/' className='p-4'>Home</a>
            <a href='/about' className='p-4'>About</a>
            <a href='/register' className='p-4 rounded text-[#00df9a] font-bold'>Register</a>
            <a href='/login' className='p-4 text-[#00df9a] font-bold'>Login</a>
          </>
        )}
      </ul>

      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>FP.</h1>
        {user ? (
          <>
            <li className='p-4 border-b border-gray-600'>{user.name}</li>
            <li className='p-4 border-b border-gray-600'><a href='/account'>Informații cont</a></li>
            <li className='p-4 border-b border-gray-600'><a href='/favorites'>Parfumuri preferate</a></li>
            <li className='p-4 border-b border-gray-600'><a href='/addPerfume'>Adaugă un parfum</a></li>
            <li className='p-4'><a href='/' onClick={handleLogout}>Logout</a></li>
          </>
        ) : (
          <>
            <li className='p-4 border-b border-gray-600'><a href='/'>Home</a></li>
            <li className='p-4 border-b border-gray-600'><a href='/about'>About</a></li>
            <li className='p-4 border-b border-gray-600'><a href='/register'>Register</a></li>
            <li className='p-4'><a href='/login'>Login</a></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
