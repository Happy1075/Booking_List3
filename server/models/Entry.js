import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true,
    match: /^\d{6}$/
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{10}$/
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Entry', entrySchema);
