import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { adminDataContext } from './context/AdminContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';

function App() {
  let {adminData} = useContext(adminDataContext);
  return (
    !adminData ? (
      <Login />
    ) : (
      <>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected */}
          <Route
            path="/"
            element={
              <Home />
            }
          />
          <Route
            path="/add"
            element={
              <Add />
            }
          />
          <Route
            path="/list"
            element={
              <List />
            }
          />
          <Route
            path="/orders"
            element={
              <Orders />
            }
          />

          {/* Catch‐all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    )
  );
}

export default App;
