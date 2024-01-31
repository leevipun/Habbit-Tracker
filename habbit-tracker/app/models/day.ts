import mongoose from 'mongoose';

const DaySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  habbits: {
    type: Array,
    required: false,
  },
});

const Day = mongoose.models.Day || mongoose.model('Day', DaySchema);

export {Day};
