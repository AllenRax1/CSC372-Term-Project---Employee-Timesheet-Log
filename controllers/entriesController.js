const Entry = require('../models/entryModel');

// Middleware to check if user is logged in
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

exports.getAllEntries = [requireAuth, async (req, res, next) => {
  try {
    const entries = await Entry.getAll(req.session.userId);
    res.json(entries);
  } catch (err) {
    next(err);
  }
}];

exports.createEntry = [requireAuth, async (req, res, next) => {
  try {
    const { date, clockIn, clockOut } = req.body;
    if (!date || !clockIn || !clockOut) {
      return res.status(400).json({ error: 'date, clockIn, and clockOut are required' });
    }
    const created = await Entry.create({ 
      date, 
      clockIn, 
      clockOut, 
      userId: req.session.userId 
    });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}];

exports.updateEntry = [requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { date, clockIn, clockOut } = req.body;
    
    if (!date || !clockIn || !clockOut) {
      return res.status(400).json({ error: 'date, clockIn, and clockOut are required' });
    }
    
    const updated = await Entry.update({ 
      id, 
      date, 
      clockIn, 
      clockOut, 
      userId: req.session.userId 
    });
    
    if (!updated) {
      return res.status(404).json({ error: 'Entry not found or unauthorized' });
    }
    
    res.json(updated);
  } catch (err) {
    next(err);
  }
}];

exports.deleteEntry = [requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const deleted = await Entry.delete({ 
      id, 
      userId: req.session.userId 
    });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Entry not found or unauthorized' });
    }
    
    res.json({ message: 'Entry deleted successfully', id: deleted.id });
  } catch (err) {
    next(err);
  }
}];