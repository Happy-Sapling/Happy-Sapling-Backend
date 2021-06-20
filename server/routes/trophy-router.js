const express = require("express");

const TrophyCtrl = require("../controllers/trophy-ctrl");

const router = express.Router();

router.post("/Trophys/create", TrophyCtrl.createTrophy);
router.put("/Trophys/:id", TrophyCtrl.updateTrophy);
router.delete("/Trophys/:id", TrophyCtrl.deleteTrophy);
router.get("/Trophys/:id", TrophyCtrl.getTrophyById);
router.get("/Trophys", TrophyCtrl.getTrophys);

module.exports = router;
