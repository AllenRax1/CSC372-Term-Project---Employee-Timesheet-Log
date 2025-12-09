const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const cors = require('cors');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const pool = require('./db');
const entriesRouter = require('./routes/entriesRoute');
const authRouter = require('./routes/authRoute');
const quotesRouter = require('./routes/quotesRoute');

// the configuration for CORS
app.use(cors({
  origin: process.env.CLIENT_BASE_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.static('public'));

// my session secret for express-session
app.use(session({
  store: new PgSession({
    pool: pool,
    tableName: 'session'
  }),
  secret: process.env.SESSION_SECRET || 'simple-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/entries', entriesRouter);
app.use('/api/quotes', quotesRouter);

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, 'timesheet-project/dist')));

// Fallback to index.html for SPA
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'timesheet-project/dist/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
