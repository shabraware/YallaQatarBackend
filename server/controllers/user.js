const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports.updateUser = async (req, res) => {
  req.body.userName && res.status(400).json({ message: 'You cannot update the userName!' });
  req.body.emailAddress && res.status(400).json({ message: 'You cannot update the emailAddress!' });
  // validate the password
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters.'
      });
    }
    req.body.password = await bcrypt.hash(req.body.password, 10); // hash the password before saving
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      {
        new: true
      }
    );
    // updatedUser is the document after update because of new: true
    res.status(200).json({
      message: 'User is updated successfully!',
      updatedUser
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getUnApprovedManagers = async (req, res) => {
  try {
    const users = await User.find({ role: 'manager', approved: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getUsers = async (req, res) => {
  console.log("getUsers");
  try {
    const users = await User.find({ role: { $ne: 'admin' } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.approveManager = async (req, res) => {
  // Check if the manager is already exist in the database
  const foundManager = await User.findById(req.params.id);
  if (!foundManager) {
    res.status(400).json({
      message: 'Manager is not exist.'
    });
  }
  try {
    const approvedManager = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        approved: true
      }
    }, {
      new: true
    });
    res.status(200).json({
      message: 'Manager is approved successfully!',
      manager: approvedManager
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'User is deleted successfully!'
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get matches reserved by the user
module.exports.getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('matches');
    res.status(200).json(user.matches);
  } catch (error) {
    res.status(500).json(error);
  }
};