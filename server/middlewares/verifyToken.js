const jwt = require('jsonwebtoken');

const User = require('../models/User');

// Verify if the token is valid or not ( token is valid if it is not expired and the user is authenticated)
module.exports.verifyToken = (req, res, next) => {
  const authorization = req.get('Authorization');
  !authorization && res.status(400).json({ message: 'Not authenticated!' });
  // Split the token from the string 'Bearer' and the token itself 
  const token = authorization.split(' ')[1];

  let payload;
  try {
    /* Returns the payload if the signature is valid.
    If not, it will throw the error. */
    payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    res.status(500).json(error);
  }
  req.user = payload;
  next();
};

module.exports.verifyTokenAndFan = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.role === 'fan' || req.user.id == req.params.id) {
      next();
    } else {
      res.status(403).json('Unauthorized access.');
    }
  });
};

module.exports.verifyTokenAndManager = (req, res, next) => {
  this.verifyToken(req, res, () => {
    // Check if the manager is approved or not
    User.findById(req.user.id)
      .then((manager) => {
        if (!manager.approved) {
          res.status(403).json('You are not approved yet.');
        } else {
          if (req.user.role === 'manager' || req.user.id == req.params.id) {
            next();
          } else {
            res.status(403).json('Unauthorized access.');
          }
        }
      })
      .catch((err) => console.log(err));
  });
};

module.exports.verifyTokenAndAdmin = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json('You are not an admin.');
    }
  });
};