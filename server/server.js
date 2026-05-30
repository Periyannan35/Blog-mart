require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blog';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on ${port}`));
}

module.exports = app;
