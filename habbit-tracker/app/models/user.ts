import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

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

userSchema.plugin(uniqueValidator);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export {User};
