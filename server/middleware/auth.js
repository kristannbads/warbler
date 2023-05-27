require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.loginRequired = function (request, response, next) {
    try {
        const token = request.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {

            if (decoded) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Please log in first"
                });
            }
        });
    } catch (error) {
        return next({
            status: 401,
            message: "Please log in first"
        })
    }
}

module.exports.ensureCorrectUser = function (request, response, next) {
    try {
        const token = request.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {

            if (decoded && decoded.id === request.params.id) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Unauthorized"
                });
            }
        });
    } catch (error) {
        return next({
            status: 401,
            message: "Unauthorized"
        })
    }
}

