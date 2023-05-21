const db = require("../models");
const jwt = require("jsonwebtoken");


exports.signin = async function (request, response, next) {
    try {
        const user = await db.User.findOne({
            email: request.body.email
        });
        const { id, username, profileImageUrl } = user;
        const isMatch = await user.comparePassword(request.body.password);

        if (isMatch) {
            const token = jwt.sign({
                id,
                username,
                profileImageUrl,
            }, process.env.SECRET_KEY);

            return response.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid email/password"
            });
        }

    } catch (error) {
        return next({
            status: 400,
            message: "Invalid email/password"
        });
    }


}

exports.signup = async function (request, response, next) {
    try {

        const user = await db.User.create(request.body);

        const { id, username, profileImageUrl } = user;
        const token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY
        );
        console.log(token)
        return response.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });


    } catch (error) {
        // see what king of err
        // 11000 is a validation error
        if (error.code === 11000) {
            error.message = "Sorry, that username and/or email is taken"
        }
        return next({
            status: 400,
            message: error.message
        });
        // if it is a  certain error
        //respond if email or username is taken
        // generic 404
    }
};