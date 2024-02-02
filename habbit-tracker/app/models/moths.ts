import mongoose from 'mongoose';

const monthSchema = new mongoose.Schema({
  months: {
    type: String,
    required: true,
  },
  user: {
    type: String,
  },
  days: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
});

const Month = mongoose.models.Month || mongoose.model('Month', monthSchema);

export {Month};
