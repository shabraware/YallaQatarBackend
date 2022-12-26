const Stadium = require('../models/Stadium');

module.exports.addStadium = async (req, res) => {
  // Check if the stadium is already in the database
  try {
    const stadium = await Stadium.findOne({ name: req.body.name });
    if (stadium) {
      return res.status(400).json({ message: 'The stadium is already in the database.' });
    }
  } catch (error) {
    res.status(500).json(error);
  }

  // Create a new stadium and save it in the database 
  const newStadium = new Stadium(req.body);
  try {
    const savedStadium = await newStadium.save();
    res.status(200).json({ message: 'Stadium is created successfully.', stadium: savedStadium });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getStadiums = async (req, res) => {
  try {
    const stadiums = await Stadium.find();
    res.status(200).json(stadiums);
  } catch (error) {
    res.status(500).json(error);
  }
};