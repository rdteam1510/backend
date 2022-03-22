const express = require("express");
const router = express.Router();
const {
	getFavorites,
	createFavorite,
} = require("../controllers/favorite.controller");

const CompanyInfo = require("../models/CompanyInfo.js");
const getRelevant = async (req, res, next) => {
	try {
		const result = await CompanyInfo.aggregate([
			{ $match: { Ticker: "ACB" } },
			{
				$lookup: {
					from: "stocks",
					as: "Ticker",
					let: { ticker: "$Ticker" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$$ticker", "$Ticker"] } } },
						{ $sort: { TimeStamp: -1 } },
						{ $limit: 1 },
					],
				},
			},
		]);
		req.company = result;
		console.log(req.company);
		next();
	} catch (err) {
		console.log(err);
	}
};

// @desc Get favorite
// @method GET
// @route /api/favorite
router.route("/").get(getRelevant, getFavorites).post(createFavorite);

module.exports = router;
