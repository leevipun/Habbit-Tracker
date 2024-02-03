import mongoose from 'mongoose';

const yearSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  months: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Month',
    },
  ],
  user: {
    type: String,
  },
  days: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Day',
    },
  ],
});

const Year = mongoose.models.Year || mongoose.model('Year', yearSchema);

export {Year};
