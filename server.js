const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const entriesRouter = require('./routes/entriesRoute');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/entries', entriesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
