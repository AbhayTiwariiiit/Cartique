import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

// Sidebar Component
function Sidebar({ mobileOpen }) {
  const navigate = useNavigate();
  const baseClasses = "block w-full text-left px-4 py-3 font-medium hover:bg-gray-700";

  return (
    <aside className={`${mobileOpen ? '' : 'hidden md:flex'} md:flex-col w-64 text-white shadow-lg md:block`}>
      <nav className="mt-4 flex-1 px-2 space-y-2 border-r border-gray-700">
        <button onClick={() => navigate('/add')} className={`${baseClasses} border-b border-gray-700`}>Add Items</button>
        <button onClick={() => navigate('/list')} className={`${baseClasses} border-b border-gray-700`}>List Items</button>
        <button onClick={() => navigate('/orders')} className={baseClasses}>View Orders</button>
      </nav>
    </aside>
  );
}

// Main Layout Without Navbar
export default function LayoutWithoutNav() {
  const [mobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-l ">
      <Sidebar mobileOpen={mobileOpen} />
      <main className="flex-1 p-6 text-white">
        <Outlet />
      </main>
    </div>
  );
}
