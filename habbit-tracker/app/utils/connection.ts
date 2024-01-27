import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  if (mongoose.connection.readyState) {
    return;
  }
  try {
    await mongoose.connect(
      'mongodb+srv://leevipuntanen2:sz7LC0PiaE3BiFzx@clusterhabbit.luhswiz.mongodb.net/habbittracker?retryWrites=true&w=majority'
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};
export default connect;
