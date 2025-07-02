import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const baseClasses =
    "block w-full text-left px-4 py-3 font-medium hover:bg-gray-700";

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-64  text-white shadow-lg
        transform transition-transform duration-200 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative md:flex md:flex-col
      `}
    >
      <div className="md:hidden flex justify-end p-4">
        <button onClick={() => setMobileOpen(false)}>
          <X size={24} className="text-white" />
        </button>
      </div>

      <nav className="mt-4 flex-1 px-2">
        <button
          onClick={() => {
            navigate('/add');
            setMobileOpen(false);
          }}
          className={`${baseClasses} border-b border-gray-600`}
        >
          Add Items
        </button>
        <button
          onClick={() => {
            navigate('/list');
            setMobileOpen(false);
          }}
          className={`${baseClasses} border-b border-gray-600`}
        >
          List Items
        </button>
        <button
          onClick={() => {
            navigate('/orders');
            setMobileOpen(false);
          }}
          className={baseClasses}
        >
          View Orders
        </button>
      </nav>
    </aside>
  );
}

export default function LayoutWithoutNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex ">
      {/* Mobile hamburger */}
      <header className="md:hidden w-full p-4 shadow-md">
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={24} className="text-white" />
        </button>
      </header>

      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Content */}
    </div>
  );
}
