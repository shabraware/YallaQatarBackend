const express = require('express');

const { addStadium, getStadiums } = require('../controllers/stadium');
const { verifyTokenAndFan, verifyTokenAndManager, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

const router = express.Router();

// POST => /api/stadiums
router.post('/', verifyTokenAndManager, addStadium);

// GET => /api/stadiums
router.get('/', getStadiums);

module.exports = router;