const express = require('express');

const { updateUser, getUnApprovedManagers, getUsers, approveManager, deleteUser } = require('../controllers/user');
const { verifyTokenAndFan, verifyTokenAndManager, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

const router = express.Router();

// PATCH => /api/users/:id
router.patch('/:id', verifyTokenAndFan, updateUser);

// GET => /api/users/unapproved
router.get('/unapproved', verifyTokenAndAdmin, getUnApprovedManagers);

// GET => /api/users
router.get('/', verifyTokenAndAdmin, getUsers);

// POST => /api/users/:id
router.post('/:id', verifyTokenAndAdmin, approveManager);

// DELETE => /api/users/:id
router.delete('/:id', verifyTokenAndAdmin, deleteUser);


module.exports = router;