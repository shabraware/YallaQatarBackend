const Match = require('../models/Match');

module.exports.createMatch = async (req, res) => {
  // The only restriction is a team can not have two matches at the same day
  try {
    const matches = await Match.find({ date: req.body.date });
    const { firstTeam, secondTeam } = req.body;
    matches.forEach(match => {  // check if the team is already in the matches at the same day  
      if (match.firstTeam === firstTeam || match.secondTeam === firstTeam || match.firstTeam === secondTeam || match.secondTeam === secondTeam) {
        return res.status(400).json({ message: 'The team is already in a match at the same day.' });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
  // Create a new match and save it in the database 
  const newMatch = new Match(req.body);
  try {
    const savedMatch = await newMatch.save();
    res.status(200).json({ message: 'Match is created successfully.', match: savedMatch });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getMatchSeatsStatus = async (req, res) => {
  try {
    const seatsStatus = await Match.findById(req.params.id).select('seatsStatus');
    res.status(200).json(seatsStatus);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.updateMatch = async (req, res) => {
  try {
    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      {
        new: true
      }
    );
    // updatedMatch is the document after update because of new: true
    res.status(200).json({
      message: 'Match is updated successfully!',
      updatedMatch
    });
  } catch (error) {
    res.status(500).json(error);
  }
};