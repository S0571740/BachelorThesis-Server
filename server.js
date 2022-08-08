const express = require("express");
const { MongoClient } = require('mongodb');
const cors = require("cors");

const uri = process.env.MONGODB_URI;
const port = process.env.PORT;

const client = new MongoClient(uri);
await client.connect();

const app = express();



app.use(express.json());
app.set('trust proxy', 1);
app.use(
	cors({
		origin: ["http://localhost:5500","http://loquacious-cat-52d8b6.netlify.app"],
		credentials: true,
	})
);

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	let user = await client.findOne();
	return res.send(user);
    // if (!user) {
	// 	return res.status(401).send("no user found");
	// }
	// if (password === user.password) {
	// 	return res.status(200).send("success");
	// } else {
	// 	return res.status(401).send("wrong password");
	// }
});
