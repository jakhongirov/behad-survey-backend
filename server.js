require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const { PORT } = require("./src/config");
const router = require("./src/modules");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.listen(PORT, console.log(PORT));