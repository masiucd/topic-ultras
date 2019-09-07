const express = require('express');

const app = express();
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

connectDB();
app.use(express.json({ extended: false }));
app.use(express.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/image', require('./routes/api/image'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(port, () => console.log(`port is running on localhost ${port}`));
