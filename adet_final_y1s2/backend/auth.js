const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.'
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const isAdmin = email === adminEmail && password === adminPassword;

  // any email logs in as a regular user and only admin login brings up admin view
  
  return res.json({
    success: true,
    isAdmin,
    email
  });
});

module.exports = router;