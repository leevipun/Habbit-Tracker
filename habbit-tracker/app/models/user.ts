import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  habits: {
    type: Array,
    required: false,
  },
  days: {
    type: Array,
    required: false,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export {User};
