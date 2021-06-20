const Journal = require("../models/journal-model");

createJournal = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a journal",
    });
  }

  const journal = new Journal(body);

  if (!journal) {
    return res.status(400).json({ success: false, error: err });
  }
  try {
    await journal.save();
    return res.status(201).json({
      success: true,
      id: journal._id,
      message: "Journal created!",
    });
  } catch (error) {
    return res.status(400).json({
      error,
      message: "Journal not created!",
    });
  }
};

updateJournal = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Journal.findOne({ _id: req.params.id }, async (err, journal) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "journal not found!",
      });
    }
    journal.date = body.date;
    jounral.submission = body.submission;

    try {
      await journal.save();
      return res.status(200).json({
        success: true,
        id: journal._id,
        message: "journal updated!",
      });
    } catch (error) {
      return res.status(404).json({
        error,
        message: "journal not updated!",
      });
    }
  });
};

deleteJournal = async (req, res) => {
  await Journal.findOneAndDelete({ _id: req.params.id }, (err, journal) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!journal) {
      return res
        .status(404)
        .json({ success: false, error: `Journal not found` });
    }

    return res.status(200).json({ success: true, data: journal });
  }).catch((err) => console.log(err));
};

getJournalById = async (req, res) => {
  await Journal.findOne({ _id: req.params.id }, (err, journal) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!journal) {
      return res
        .status(404)
        .json({ success: false, error: `journal not found` });
    }
    return res.status(200).json({ success: true, data: journal });
  }).catch((err) => console.log(err));
};

getJournals = async (req, res) => {
  await Journal.find({}, (err, journals) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!journals.length) {
      return res
        .status(404)
        .json({ success: false, error: `Journal not found` });
    }
    return res.status(200).json({ success: true, data: journals });
  }).catch((err) => console.log(err));
};

module.exports = {
  createJournal,
  updateJournal,
  deleteJournal,
  getJournals,
  getJournalById,
};
