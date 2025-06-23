import React, { useState,useContext } from 'react';
import Logo from '../assets/logo.png'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthDataContext } from '../context/authContext'; // Assuming you have AuthDataContext set up
import { UserDataContext } from '../context/UserContext'; // Assuming you have UserDataContext
const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
    const {serverURL}=useContext(AuthDataContext); // Assuming you have AuthDataContext set up
    const {getCurrentUser,userData} = useContext(UserDataContext); // Assuming you have UserDataContext set up
  // Mock navigate function for demo
  const navigate = useNavigate();
  const navigationLinks = [
    { name: 'HOME', href: '#' },
    { name: 'COLLECTIONS', href: '#' },
    { name: 'ABOUT', href: '#' },
    { name: 'CONTACT', href: '#' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleSearchClose = () => {
    setIsSearchExpanded(false);
    setSearchQuery('');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: null
    });
    setIsProfileOpen(false);
    console.log('User logged in');
  };
  const handleLogout = async() => {
    try{
        setIsLoggedIn(false);
        setUser(null);
        setIsProfileOpen(false);
        const res= await axios.get(`${serverURL}/api/auth/logout`, { withCredentials: true }); 
        getCurrentUser(); // Fetch the current user data after logout
        console.log('User logged out');
    }
    catch(error){
        console.error('Logout error:', error);
    }
  };

  const loggedInMenuItems = [
    { name: 'My Account', href: '#', action: null },
    { name: 'Order History', href: '#', action: null },
    { name: 'Wishlist', href: '#', action: null },
    { name: 'Settings', href: '#', action: null },
    { name: 'Logout', href: '#', action: handleLogout }
  ];

  const loggedOutMenuItems = [
    { name: 'Login', href: '#', action: () => navigate('/login') },
    { name: 'Sign Up', href: '#', action: () => navigate('/signup') },
    { name: 'Help', href: '#', action: null }
  ];

  return (
    <nav className="bg-gradient-to-l from-[#141414] to-[#0c2025] px-6 py-4 relative">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
            <img src={Logo} alt="" />
          </div>
          <span className="text-xl font-semibold text-white">OneCart</span>
        </div>

        {/* Desktop Navigation Links */}
        {<div className="hidden md:flex items-center space-x-1">
          {navigationLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="bg-slate-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-slate-500 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>}

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 relative">
          {/* Search Component */}
          <div className="relative z-50">
            {!isSearchExpanded ? (
              <button 
                className="text-gray-300 hover:text-white transition-colors duration-200 p-1"
                onClick={() => setIsSearchExpanded(true)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            ) : (
              <div className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-64 px-4 py-2 pr-10 border border-slate-600 bg-slate-700 text-white placeholder-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchSubmit(e);
                      }
                    }}
                    autoFocus
                  />
                  <button
                    onClick={handleSearchClose}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile Icon with Dropdown */}
          <div className="relative z-50">
            <button 
              className={`transition-colors duration-200 p-1 ${
                isLoggedIn 
                  ? 'text-teal-400 hover:text-teal-300' 
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              {isLoggedIn ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-lg border border-slate-600 z-50">
                <div className="py-2">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-2 border-b border-slate-600">
                        <p className="text-sm font-semibold text-white">{user?.name}</p>
                        <p className="text-xs text-gray-300">{user?.email}</p>
                      </div>
                      {loggedInMenuItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            if (item.action) {
                              item.action();
                            } else {
                              setIsProfileOpen(false);
                              console.log(`Navigate to: ${item.name}`);
                            }
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-slate-600 transition-colors duration-200"
                        >
                          {item.name}
                        </button>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 border-b border-slate-600">
                        <p className="text-sm font-semibold text-white">Welcome, Guest!</p>
                        <p className="text-xs text-gray-300">Please login to access your account</p>
                      </div>
                      {loggedOutMenuItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            if (item.action) {
                              item.action();
                            } else {
                              setIsProfileOpen(false);
                              console.log(`Navigate to: ${item.name}`);
                            }
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                            item.name === 'Login' 
                              ? 'text-teal-400 hover:bg-slate-600 font-medium' 
                              : 'text-gray-200 hover:bg-slate-600'
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Cart Icon with Badge */}
          <button className="relative text-gray-300 hover:text-white transition-colors duration-200 p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h10" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-teal-400 text-slate-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors duration-200 p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Overlay for closing profile dropdown only */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-slate-700 rounded-lg shadow-lg p-4 border border-slate-600">
          <div className="flex flex-col space-y-2">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="bg-slate-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-slate-500 transition-colors duration-200 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Demo Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleLogin}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isLoggedIn 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-teal-600 hover:bg-teal-700 text-white'
          }`}
        >
          {isLoggedIn ? 'Demo Logout' : 'Demo Login'}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
