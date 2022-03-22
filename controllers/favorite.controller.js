const { StatusCodes } = require("http-status-codes");
const Favorite = require("../models/Favorite");

exports.getFavorites = async (req, res) => {
	const favorite = await Favorite.find({ UserId: req.user._id }).populate({
		path: "CompanyId",
	});
	// console.log("favorite: ", favorite[0].CompanyId.Ticker);
	// res.status(200).json(favorite._id);
	// res.json(req.company[0].Ticker);
	// console.log("Req: ", req.company[0].Ticker[0].Ticker);
	const reqTicker = req.company[0].Ticker[0].Ticker;
	const favTicker = favorite[0].CompanyId.Ticker;
	const { Ticker } = req.company[0];
	if (reqTicker === favTicker) {
		res.json(Ticker);
	}
};

exports.createFavorite = async (req, res) => {
	req.body.UserId = req.user._id;
	const favorite = await Favorite.create(req.body);
	res.status(StatusCodes.CREATED).json({ favorite });
};
