const dotenv = require("dotenv");
dotenv.config();


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route.js");
const connectToDB = require("./db/db.js");

connectToDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("Hello world");
})
app.use("/api/auth", authRoutes);




module.exports = app;