import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import AuthPage from './components/AuthPage';
import RoleSelect from './components/RoleSelect';
import AdminDashboard from './components/AdminDashboard';
import GuestView from './components/GuestView';
import Navbar from './components/Navbar';

axios.defaults.withCredentials = true; // send cookies with requests

const API ='https://booking-list3.onrender.com';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check user session on load
  useEffect(() => {
    axios.get(`${API}/auth/check`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={
          !user ? <AuthPage /> :
          user.role === 'pending' ? <Navigate to="/role-select" /> :
          user.role === 'admin' ? <AdminDashboard user={user} /> :
          <GuestView />
        } />
        <Route path="/role-select" element={
          !user ? <Navigate to="/" /> :
          user.role !== 'pending' ? <Navigate to="/" /> :
          <RoleSelect setUser={setUser} />
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
