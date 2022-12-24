const { v4: uuidv4 } = require('uuid');

const Match = require('../models/Match');
const Stadium = require('../models/Stadium');

module.exports.createMatch = async (req, res) => {
  try {
    // Check if a team have match at the same day 
    // TODO: Find a better way to check if a team have match at the same day.
    // e.g. Check for the day only not the entire date.
    const matches = await Match.find({ date: req.body.date });
    const { firstTeam, secondTeam } = req.body;
    matches.forEach(match => {  // check if the team is already in the matches at the same day  
      if (match.firstTeam === firstTeam || match.secondTeam === firstTeam || match.firstTeam === secondTeam || match.secondTeam === secondTeam) {
        return res.status(400).json({ message: 'The team is already in a match at the same day.' });
      }
    });
    // Check if the stadium is in the database
    const stadium = await Stadium.findOne({ name: req.body.matchVenue });
    if (!stadium) {
      return res.status(400).json({ message: 'The stadium is not in the database.' });
    }
    // Get the stadium # of rows and the # of seats per row and Create the seatsStatus array to attach with the match.
    const seatsStatus = [];
    for (let i = 0; i < stadium.rows; i++) {
      seatsStatus.push([]);
      for (let j = 0; j < stadium.seatsPerRow; j++) {
        seatsStatus[i].push(0);
      }
    }
    const match = { ...req.body, seatsStatus };
    // Create a new match and save it in the database 
    const newMatch = new Match(match);
    const savedMatch = await newMatch.save();
    return res.status(200).json({ message: 'Match is created successfully.', match: savedMatch });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.reserveSeat = async (req, res) => {
  try {
    const { row, seat } = req.query;
    const match = await Match.findById(req.params.id);
    if (match.seatsStatus[row][seat] === 0) {
      // Generate the ticket number
      match.seatsStatus[row][seat] = uuidv4(); // new Date().getUTCMilliseconds();
      await match.save(); // TODO Match is not saved in the database.
      return res.status(200).json({ message: 'Seat is reserved successfully.', ticketNumber: match.seatsStatus[row][seat] });
    } else {
      return res.status(400).json({ message: 'Seat is already reserved.' });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// TODO Check if it's working correctly.
module.exports.cancelReservation = async (req, res) => {
  try {
    const { row, seat } = req.query;
    const match = await Match.findById(req.params.id);
    if (match.seatsStatus[row][seat] !== 0) {
      match.seatsStatus[row][seat] = 0;
      await match.save();
      return res.status(200).json({ message: 'Seat is canceled successfully.' });
    } else {
      return res.status(400).json({ message: 'Seat is already not reserved.' });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    return res.status(200).json(matches);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.getMatchSeatsStatus = async (req, res) => {
  try {
    const seatsStatus = await Match.findById(req.params.id).select('seatsStatus');
    return res.status(200).json(seatsStatus);
  } catch (error) {
    return res.status(500).json(error);
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
    return res.status(500).json(error);
  }
};