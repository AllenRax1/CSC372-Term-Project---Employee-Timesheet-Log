const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await fetch('https://api.api-ninjas.com/v2/quoteoftheday?category=happiness', {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    
    const data = await response.json();
    res.json(data[0]); // Returns first quote
  } catch (err) {
    console.error('Quote API error:', err);
    res.status(500).json({ 
      quote: 'Have a great day at work!', 
      author: 'Employee Timesheet',
      category: 'motivational'
    });
  }
});

module.exports = router;