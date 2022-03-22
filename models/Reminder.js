const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
	UserId: { type: mongoose.Types.ObjectId, ref: "User" },
	// StockId: { type: mongoose.Types.ObjectId, ref: "Stock" },
	Title: { type: String, trim: true },
	Ticker: { type: String, trim: true, minlength: 3, maxlength: 3 },
	Content: { type: String, trim: true },
	RemindAt: { type: Date },
});

module.exports = mongoose.model("Reminder", reminderSchema);
