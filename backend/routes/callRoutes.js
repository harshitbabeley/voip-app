const express = require("express");
const CallLog = require("../models/callLog"); // Previously `Call.js`
const router = express.Router();

router.get("/logs", async (req, res) => {
  try {
    const logs = await CallLog.find().populate("caller receiver", "username profilePicture");
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching call logs", error });
  }
});

module.exports = router;
