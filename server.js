const express = require('express');
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
  credentials: true,
  allowedHeaders: ['Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());
app.use(express.static('public'));

// Disable Cloudflare caching for API routes to allow Set-Cookie headers
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// my session secret for express-session
app.use(session({
  store: new PgSession({
    pool: pool,
    tableName: 'session'
  }),
  secret: process.env.SESSION_SECRET || 'simple-secret',
  resave: false,
  saveUninitialized: true,
  name: 'sessionId',
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/entries', entriesRouter);
app.use('/api/quotes', quotesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
