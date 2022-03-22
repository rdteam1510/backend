const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const scheduler = require("node-schedule");
require("dotenv").config({ path: "./config/.env" });

// These id's and secrets should come from .env file.
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
	"";

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
	try {
		const accessToken = await oAuth2Client.getAccessToken();

		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: process.env.EMAIL,
				password: process.env.EMAIL_PASS,
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken: accessToken,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		const mailOptions = {
			from: "",
			to: "",
			subject: "HAHAHA",
			text: "Hello world! =))))))))))))))",
		};

		const result = await transport.sendMail(mailOptions);
		return result;
	} catch (error) {
		return error;
	}
}

const mTime = Date.now() + 60000;
const mJob = scheduler.scheduleJob(mTime, () => {
	sendMail()
		.then((result) => console.log("Email sent...", result))
		.catch((error) => console.log(error.message));
	mJob.cancel();
});
