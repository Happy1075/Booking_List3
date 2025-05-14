import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API ='http://localhost:5000';

function RoleSelect({ setUser }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const selectRole = async (role) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/set-role`, { role });
      setUser(data);
      navigate('/');
    } catch (err) {
      alert('Failed to set role');
    }
    setLoading(false);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <h2 className="mb-4">Select your role</h2>
      <div className="d-flex gap-4">
        <button className="btn btn-success px-4" disabled={loading} onClick={() => selectRole('admin')}>Admin</button>
        <button className="btn btn-secondary px-4" disabled={loading} onClick={() => selectRole('guest')}>Guest</button>
      </div>
    </div>
  );
}

export default RoleSelect;
