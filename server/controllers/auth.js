const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports.register = (req, res, next) => {
  // TODO : Manager requires admin approve 
  bcrypt.hash(req.body.password, 12)
    .then(hashedPassword => {
      const newUser = new User({
        ...req.body,
        password: hashedPassword,
      });
      newUser.role === 'manager' && (newUser.approved = false);
      return newUser.save();
    })
    .then(savedUser => {
      if (savedUser.role === 'manager') {
        res.status(201).json({
          message: 'Manager is registered successfully. Please wait for the admin approval.',
          savedUser
        });
      } else {
        // Generate the JWT token
        const token = jwt.sign(
          {
            id: savedUser._id.toString(),
            role: savedUser.role
          },
          process.env.JWT_SECRET_KEY,
          {}
        );
        res.status(201).json({
          message: 'Fan is registered successfully.',
          token,
          user
        });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

module.exports.login = (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  let user;
  // Find the user by username
  User.findOne({ userName })
    .then(foundUser => {
      !foundUser && res.status(400).json({
        message: 'Username is not exist.'
      });
      user = foundUser;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      !isEqual && res.status(400).json({
        message: 'Password is not correct.'
      });
      // Generate the JWT token
      const token = jwt.sign(
        {
          id: user._id.toString(),
          role: user.role
        },
        process.env.JWT_SECRET_KEY,
        {}
      );
      res.status(200).json({
        message: 'User is logined successfully.',
        token,
        user
      });
    })
    .catch(error => {
      // res.status(500).json(error);
    });
};