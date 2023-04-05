const { readdirSync } = require("fs");
const path = require("path");
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const { urlencoded } = require('body-parser');
app.use(cors());

app.use(express.json());
app.use(urlencoded({ extended: true }));


// Routes
readdirSync("./routes").map((r) =>
  app.use("/api/v1", require("./routes/" + r))
);

app.get("/", (req, res) => {
  res.send("server is on");
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});