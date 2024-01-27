import mongoose from 'mongoose';

const HabbitSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const DaySchema = new mongoose.Schema({
  id: {
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
const Habbit = mongoose.models.Habbit || mongoose.model('Habbit', HabbitSchema);

export {Day, Habbit};
