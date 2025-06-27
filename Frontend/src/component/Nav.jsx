import React, { useState, useContext, useEffect } from 'react';
import Logo from '../assets/logo.png'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthDataContext } from '../context/authContext'; // Assuming you have AuthDataContext set up
import { UserDataContext } from '../context/UserContext'; // Assuming you have UserDataContext

const Nav = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('HOME');
  
  const { serverURL } = useContext(AuthDataContext);
  const { getCurrentUser, userData } = useContext(UserDataContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
      setUser(userData.user[0]);
      console.log('User data fetched:', userData);
    }
  }, [userData]);

  const navigationLinks = [
    { 
      name: 'HOME', 
      href: '/',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      name: 'COLLECTIONS', 
      href: '/collections',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    { 
      name: 'SEARCH', 
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      action: () => setIsSearchExpanded(true)
    },
    { 
      name: 'ABOUT', 
      href: '/about',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      name: 'CONTACT', 
      href: '/contact',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setIsSearchExpanded(false);
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

  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
      setUser(null);
      setIsProfileOpen(false);
      const res = await axios.get(`${serverURL}/api/auth/logout`, { withCredentials: true });
      getCurrentUser();
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNavClick = (link) => {
    setActiveTab(link.name);
    if (link.action) {
      link.action();
    } else if (link.href !== '#') {
      navigate(link.href);
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
    <>
      {/* Top Navigation Bar */}
      <nav className="bg-gradient-to-l from-[#141414] to-[#0c2025] px-4 py-3 relative">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
              <img src={Logo} alt="OneCart Logo" className="w-6 h-6" />
            </div>
            <span className="text-xl font-semibold text-white">OneCart</span>
          </div>

          {/* Desktop Navigation Links (Hidden on mobile) */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationLinks.filter(link => link.name !== 'SEARCH').map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeTab === link.name 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-slate-600 text-white hover:bg-slate-500'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3">
            {/* Search Icon (Desktop) */}
            <div className="hidden lg:block">
              <button 
                className="text-gray-300 hover:text-white transition-colors duration-200 p-2"
                onClick={() => setIsSearchExpanded(true)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Profile Icon */}
            <div className="relative z-50">
              <button 
                className={`transition-colors duration-200 p-2 ${
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
            
            {/* Cart Icon */}
            <button className="relative text-gray-300 hover:text-white transition-colors duration-200 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h10" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-400 text-slate-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-start justify-center pt-20">
          <div className="bg-slate-700 rounded-lg p-4 mx-4 w-full max-w-md">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-3 pr-12 border border-slate-600 bg-slate-800 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                autoFocus
              />
              <button
                type="button"
                onClick={handleSearchClose}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Overlay for closing dropdowns */}
      {(isProfileOpen || isSearchExpanded) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsProfileOpen(false);
            setIsSearchExpanded(false);
          }}
        />
      )}

      {/* Bottom Navigation (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#141414] to-[#0c2025] border-t border-slate-600 z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 min-w-0 flex-1 ${
                activeTab === link.name 
                  ? 'text-teal-400 bg-slate-700' 
                  : 'text-gray-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {link.icon}
              <span className="text-xs mt-1 font-medium truncate">{link.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Toggle Button */}
      <div className="fixed bottom-20 right-4 z-50 lg:bottom-4">
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

      {/* Add padding bottom to main content to account for bottom nav */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          body {
            padding-bottom: 70px;
          }
        }
      `}</style>
    </>
  );
};

export default Nav;