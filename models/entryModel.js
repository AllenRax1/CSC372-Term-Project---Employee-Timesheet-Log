const pool = require('../db');

module.exports = {
  async getAll() {
    const res = await pool.query(
      `SELECT id, to_char(date, 'YYYY-MM-DD') AS date, 
              to_char(clock_in, 'HH24:MI') AS "clockIn",
              to_char(clock_out, 'HH24:MI') AS "clockOut"
       FROM entries
       ORDER BY created_at DESC`
    );
    return res.rows;
  },

  async create({ date, clockIn, clockOut }) {
    const res = await pool.query(
      `INSERT INTO entries (date, clock_in, clock_out)
       VALUES ($1, $2, $3)
       RETURNING id, to_char(date, 'YYYY-MM-DD') AS date,
                 to_char(clock_in, 'HH24:MI') AS "clockIn",
                 to_char(clock_out, 'HH24:MI') AS "clockOut"
      `,
      [date, clockIn, clockOut]
    );
    return res.rows[0];
  },
};