const Entry = require('../models/entryModel');

exports.getAllEntries = async (req, res, next) => {
  try {
    const entries = await Entry.getAll();
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

exports.createEntry = async (req, res, next) => {
  try {
    const { date, clockIn, clockOut } = req.body;
    if (!date || !clockIn || !clockOut) {
      return res.status(400).json({ error: 'date, clockIn, and clockOut are required' });
    }
    const created = await Entry.create({ date, clockIn, clockOut });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};