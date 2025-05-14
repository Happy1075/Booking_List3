import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API ='http://localhost:5000';

function GuestView() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/entries`)
      .then(res => setEntries(res.data))
      .catch(() => setEntries([]));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Welcome Guest</h2>
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
              </div>
            </div>
          </div>
        ))}
        {entries.length === 0 && <p>No entries yet.</p>}
      </div>
    </div>
  );
}

export default GuestView;
