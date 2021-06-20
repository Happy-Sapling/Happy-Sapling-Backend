const Trophy = require("../models/trophy-model");

createTrophy = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a trophy",
    });
  }

  const trophy = new Trophy(body);

  if (!trophy) {
    return res.status(400).json({ success: false, error: err });
  }
  try {
    await trophy.save();
    return res.status(201).json({
      success: true,
      id: trophy._id,
      message: "trophy created!",
    });
  } catch (error) {
    return res.status(400).json({
      error,
      message: "trophy not created!",
    });
  }
};

updateTrophy = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Trophy.findOne({ _id: req.params.id }, async (err, trophy) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "trophy not found!",
      });
    }
    trophy.submission = body.submission;

    try {
      await trophy.save();
      return res.status(200).json({
        success: true,
        id: trophy._id,
        message: "trophy updated!",
      });
    } catch (error) {
      return res.status(404).json({
        error,
        message: "trophy not updated!",
      });
    }
  });
};

deleteTrophy = async (req, res) => {
  await Trophy.findOneAndDelete({ _id: req.params.id }, (err, trophy) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!trophy) {
      return res
        .status(404)
        .json({ success: false, error: `trophy not found` });
    }

    return res.status(200).json({ success: true, data: trophy });
  }).catch((err) => console.log(err));
};

getTrophyById = async (req, res) => {
  await Trophy.findOne({ _id: req.params.id }, (err, trophy) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!trophy) {
      return res
        .status(404)
        .json({ success: false, error: `trophy not found` });
    }
    return res.status(200).json({ success: true, data: trophy });
  }).catch((err) => console.log(err));
};

getTrophys = async (req, res) => {
  await Trophy.find({}, (err, trophys) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!trophys.length) {
      return res
        .status(404)
        .json({ success: false, error: `trophy not found` });
    }
    return res.status(200).json({ success: true, data: trophys });
  }).catch((err) => console.log(err));
};

module.exports = {
  createTrophy,
  updateTrophy,
  deleteTrophy,
  getTrophys,
  getTrophyById,
};
