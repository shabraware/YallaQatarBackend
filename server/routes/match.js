const express = require('express');

const { createMatch, updateMatch, getMatches, getMatchSeatsStatus } = require('../controllers/match');
const { verifyTokenAndFan, verifyTokenAndManager, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

const router = express.Router();

// POST => /api/matches
router.post('/', verifyTokenAndManager, createMatch);

// PATCH => /api/matches/:id
router.patch('/:id', verifyTokenAndManager, updateMatch);

// GET => /api/matches/:id/seatStatus
router.get('/:id/seatStatus', verifyTokenAndManager, getMatchSeatsStatus);

// GET => /api/matches
router.get('/', getMatches);

module.exports = router;