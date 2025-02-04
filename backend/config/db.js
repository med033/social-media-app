const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
       // 30 seconds         // Fix Server Discovery and Monitoring engine warning
    });
    console.log('MongoDB connecté !');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;