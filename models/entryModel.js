const pool = require('../db');

module.exports = {
  async getAll(userId) {
    const res = await pool.query(
      `SELECT id, to_char(date, 'YYYY-MM-DD') AS date, 
              to_char(clock_in, 'HH24:MI') AS "clockIn",
              to_char(clock_out, 'HH24:MI') AS "clockOut"
       FROM entries
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    return res.rows;
  },

  async create({ date, clockIn, clockOut, userId }) {
    const res = await pool.query(
      `INSERT INTO entries (date, clock_in, clock_out, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, to_char(date, 'YYYY-MM-DD') AS date,
                 to_char(clock_in, 'HH24:MI') AS "clockIn",
                 to_char(clock_out, 'HH24:MI') AS "clockOut"
      `,
      [date, clockIn, clockOut, userId]
    );
    return res.rows[0];
  },

  async update({ id, date, clockIn, clockOut, userId }) {
    const res = await pool.query(
      `UPDATE entries 
       SET date = $1, clock_in = $2, clock_out = $3
       WHERE id = $4 AND user_id = $5
       RETURNING id, to_char(date, 'YYYY-MM-DD') AS date,
                 to_char(clock_in, 'HH24:MI') AS "clockIn",
                 to_char(clock_out, 'HH24:MI') AS "clockOut"
      `,
      [date, clockIn, clockOut, id, userId]
    );
    return res.rows[0];
  },

  async delete({ id, userId }) {
    const res = await pool.query(
      'DELETE FROM entries WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );
    return res.rows[0];
  },
};