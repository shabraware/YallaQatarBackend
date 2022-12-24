const express = require('express');

const { createMatch, reserveSeat, cancelReservation, updateMatch, getMatches, getMatchSeatsStatus } = require('../controllers/match');
const { verifyToken, verifyTokenAndFan, verifyTokenAndManager, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

const router = express.Router();

// POST => /api/matches
router.post('/', verifyTokenAndManager, createMatch);

// POST => /api/matches/:id/reserve?row=1&seat=1
router.post('/:id/reserve', verifyTokenAndFan, reserveSeat);

// DELETE => /api/matches/:id/cancel?row=1&seat=1
router.delete('/:id/cancel', verifyTokenAndFan, cancelReservation);

// PATCH => /api/matches/:id
router.patch('/:id', verifyTokenAndManager, updateMatch);

// GET => /api/matches/:id/seatStatus
router.get('/:id/seatStatus', verifyToken, getMatchSeatsStatus);

// GET => /api/matches
router.get('/', getMatches);

module.exports = router;