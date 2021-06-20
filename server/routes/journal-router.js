const express = require("express");

const JournalCtrl = require("../controllers/journal-ctrl");

const router = express.Router();

router.post("/Journals/create", JournalCtrl.createJournal);
router.put("/Journals/:id", JournalCtrl.updateJournal);
router.delete("/Journals/:id", JournalCtrl.deleteJournal);
router.get("/Journals/:id", JournalCtrl.getJournalById);
router.get("/Journals", JournalCtrl.getJournals);

module.exports = router;
