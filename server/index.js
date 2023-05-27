require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const errorHandler = require("./handlers/error")
const mongoose = require("mongoose");
const PORT = 3000;
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth")

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use("/api/auth", authRoutes);
app.use("/api/user/:id/messages", loginRequired, ensureCorrectUser, messagesRoutes);


app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found", 404))
})

app.use(errorHandler);

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error in server setup");
    }
    else {
        console.log("Listening on Port 3000");
    }
}
)