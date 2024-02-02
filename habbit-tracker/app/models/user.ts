import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  habits: {
    type: Array,
    required: false,
  },
  lastActive: {
    type: String,
    required: false,
  },
  created: {
    type: String,
    required: false,
  },
  Streak: {
    type: Number,
    required: false,
  },
  months: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Month',
    },
  ],
  years: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Year',
    },
  ],
  days: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Day',
    },
  ],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export {User};
