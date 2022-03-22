const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
	Ticker: { type: String },
	PredictedPrice: { type: Number },
	Date: { type: Date },
	TimeStamp: { type: Date },
});

module.exports = mongoose.model("Prediction", predictionSchema);
