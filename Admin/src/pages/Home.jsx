import React from 'react';
import NavBar from '../component/Nav';
import Sidebar from '../component/SiderBar';

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      {/* Top nav */}
      <NavBar />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6">
          {/* Your home page content goes here */}
          <h1 className="text-2xl font-semibold">Welcome to OneCart!</h1>
        </main>
      </div>
    </div>
  );
}

export default Home;
