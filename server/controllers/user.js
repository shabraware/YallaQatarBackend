const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports.updateUser = async (req, res) => {
  req.body.userName && res.status(400).json({ message: 'You cannot update the userName!' });
  req.body.emailAddress && res.status(400).json({ message: 'You cannot update the emailAddress!' });
  if (req.body.password) {
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

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'manager', approved: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.approveManager = async (req, res) => {
  try {
    const approvedManger = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        approved: true
      }
    }, {
      new: true
    });
    res.status(200).json({
      message: 'Manager is approved successfully!',
      manager: approvedManger
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
