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
const Message = require('./models/message');

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

app.get("/api/messages", loginRequired, async function (request, response, next) {
    try {
        const message = await Message.find().sort({ createdAt: "desc" }).populate("user", {
            username: true,
            profileImageUrl: true
        });
        return response.status(200).json(message)

    } catch (error) {
        return next(error);
    }
})


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