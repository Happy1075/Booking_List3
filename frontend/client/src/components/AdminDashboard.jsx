import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EntryForm from './EntryForm';

const API ='https://booking-list3.onrender.com';

function AdminDashboard({ user }) {
  const [entries, setEntries] = useState([]);
  const [editEntry, setEditEntry] = useState(null);

  const fetchEntries = () => {
    axios.get(`${API}/api/entries`)
      .then(res => setEntries(res.data))
      .catch(() => setEntries([]));
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    await axios.delete(`${API}/api/entries/${id}`);
    fetchEntries();
  };

  return (
    <div className="container mt-4">
      <h2>Welcome Admin</h2>
      <EntryForm
        onSuccess={() => {
          setEditEntry(null);
          fetchEntries();
        }}
        editEntry={editEntry}
        setEditEntry={setEditEntry}
      />
      <hr />
      <h4>All Entries</h4>
      <div className="row">
        {entries.map(entry => (
          <div className="col-md-4 mb-3" key={entry._id}>
            <div className="card">
              <div className="card-body">
                <h5>{entry.name}</h5>
                <p>Address: {entry.address}</p>
                <p>PIN: {entry.pin}</p>
                <p>Phone: {entry.phone}</p>
                <div>
                  <button className="btn btn-primary btn-sm me-2"
                    onClick={() => setEditEntry(entry)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(entry._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {entries.length === 0 && <p>No entries yet.</p>}
      </div>
    </div>
  );
}

export default AdminDashboard;
