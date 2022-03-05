require("dotenv").config();
const express = require("express");
const cors = require("cors");

// routes
const api = require("./routes/api/api");
const app = express();

// cors middleware
app.use(cors({ origin: "*" }));

// Body Parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/", api);
app.get("/", (req, res) => {
	res.send("welcome to the api.");
});

const port = process.env.PORT || 5005;
app.listen(port, () => console.log(`Server running on port ${port}`));
