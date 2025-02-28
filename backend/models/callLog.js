const mongoose = require("mongoose");

const callLogSchema = new mongoose.Schema({
  caller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: "ongoing" } 
});

module.exports = mongoose.model("CallLog", callLogSchema);
