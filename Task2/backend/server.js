const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nexus', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/meetings', require('./routes/meetings'));

app.get('/', (req, res) => res.send('Nexus Backend API'));

const PORT = process.env.PORT || 5000;
const { server } = require('./socket');
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));