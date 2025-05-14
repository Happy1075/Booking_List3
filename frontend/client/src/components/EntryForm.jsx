import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API ='https://booking-list3.onrender.com';

const initialState = { name: '', address: '', pin: '', phone: '' };

function EntryForm({ onSuccess, editEntry, setEditEntry }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editEntry) setForm(editEntry);
    else setForm(initialState);
  }, [editEntry]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editEntry) {
        await axios.put(`${API}/api/entries/${editEntry._id}`, form);
      } else {
        await axios.post(`${API}/api/entries`, form);
      }
      setForm(initialState);
      setEditEntry && setEditEntry(null);
      onSuccess();
    } catch (err) {
      alert('Invalid input or server error.');
    }
    setLoading(false);
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <h5>{editEntry ? "Edit Entry" : "Add Entry"}</h5>
      <div className="row">
        <div className="col-md-3 mb-2">
          <input name="name" value={form.name} onChange={handleChange}
            className="form-control" placeholder="Name" required />
        </div>
        <div className="col-md-3 mb-2">
          <input name="address" value={form.address} onChange={handleChange}
            className="form-control" placeholder="Address" required />
        </div>
        <div className="col-md-2 mb-2">
          <input name="pin" value={form.pin} onChange={handleChange}
            className="form-control" placeholder="PIN (6 digits)" pattern="\d{6}" required />
        </div>
        <div className="col-md-2 mb-2">
          <input name="phone" value={form.phone} onChange={handleChange}
            className="form-control" placeholder="Phone (10 digits)" pattern="\d{10}" required />
        </div>
        <div className="col-md-2 mb-2">
          <button className="btn btn-success w-100" disabled={loading}>
            {editEntry ? "Update" : "Add"}
          </button>
        </div>
      </div>
      {editEntry && (
        <button className="btn btn-secondary btn-sm mt-2" type="button"
          onClick={() => setEditEntry(null)}>
          Cancel Edit
        </button>
      )}
    </form>
  );
}

export default EntryForm;
