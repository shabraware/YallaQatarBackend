const express = require('express');

const { addStadium } = require('../controllers/stadium');
const { verifyTokenAndFan, verifyTokenAndManager, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

const router = express.Router();

// POST => /api/stadiums
router.post('/', verifyTokenAndManager, addStadium);

module.exports = router;