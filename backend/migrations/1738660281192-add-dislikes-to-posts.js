const connectDB = require("../config/db");
const mongoose = require('mongoose');
/**
 * Make any changes you need to make to the database here
 */
async function up() {
  await connectDB();
  const db = mongoose.connection.db;
  await db.collection('posts').updateMany(
    { dislikes: { $exists: false } },
    { $set: { dislikes: 0 } }
  );
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
 async function down() {
    await Post.updateMany(
      { dislikes: { $exists: true } },
      { $unset: { dislikes: "" } }
    );
  }

module.exports = { up, down };
