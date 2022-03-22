// Import Modules
const CompanyInfo = require("../models/CompanyInfo");
const { NotFoundError } = require("../errors");

exports.getAllCompanyInfo = async (req, res) => {
	const { companyname, stockexchange, industry } = req.query;
	const queryObject = {};

	if (companyname) {
		queryObject.CompanyName = { $regex: companyname, $options: "i" };
	}

	if (stockexchange) {
		queryObject.StockExchange = stockexchange;
	}

	if (industry) {
		queryObject.Industry = industry;
	}

	console.log(queryObject);
	let result = CompanyInfo.find(queryObject);
	const companyinfo = await result;
	if (!companyinfo) {
		throw new NotFoundError("Cannot find company");
	}
	res.status(200).json({ success: true, companyinfo });
};

exports.getCompanyInfoByTicker = async (req, res) => {
	const companyinfo = await CompanyInfo.find({
		Ticker: req.params.ticker,
	});
	if (!companyinfo) {
		throw new NotFoundError("Cannot find company");
	}
	res.status(200).json({ success: true, companyinfo });
};

exports.getRelevant = (req, res) => {
	CompanyInfo.aggregate([
		{ $match: { Ticker: "ACB" } },
		{
			$lookup: {
				from: "stocks",
				// localField: "Ticker",
				// foreignField: "Ticker",
				as: "Ticker",
				let: { ticker: "$Ticker" },
				pipeline: [
					{ $match: { $expr: { $eq: ["$$ticker", "$Ticker"] } } },
					{ $sort: { TimeStamp: -1 } },
					{ $limit: 5 },
				],
			},
		},
	]).exec((err, result) => {
		if (err) throw err;
		res.json(result);
	});
};
