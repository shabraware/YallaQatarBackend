const Stadium = require('../models/Stadium');

module.exports.addStadium = async (req, res) => {

  // Create a new match and save it in the database 
  const newStadium = new Stadium(req.body);
  try {
    const savedStadium = await newStadium.save();
    res.status(200).json({ message: 'Stadium is created successfully.', stadium: savedStadium });
  } catch (error) {
    res.status(500).json(error);
  }
};