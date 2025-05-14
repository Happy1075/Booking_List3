import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API ='http://localhost:5000';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(`${API}/auth/logout`);
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <span className="navbar-brand">Booking List</span>
      <div className="ms-auto">
        {user && (
          <>
            <span className="me-3">Hello, {user.email} ({user.role})</span>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
