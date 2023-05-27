const db = require("../models");
const jwt = require("jsonwebtoken");


module.exports.signin = async function (request, response, next) {
    try {
        const user = await db.User.findOne({
            email: request.body.email
        });
        const { id, username, profileImageUrl } = user;
        const isMatch = await user.comparePassword(request.body.password);

        if (isMatch) {
            const token = generateToken(id, username, profileImageUrl);

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

module.exports.signup = async function (request, response, next) {
    try {

        const user = new db.User(request.body);


        const { id, username, profileImageUrl } = user;
        const token = generateToken(id, username, profileImageUrl);
        await user.save();
        return response.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });

    } catch (error) {
        if (error.code === 11000) {
            error.message = "Sorry, that username and/or email is taken"
        }
        return next({
            status: 400,
            message: error.message
        });

    }
};

function generateToken(id, username, profileImageUrl) {
    const token = jwt.sign(
        { id, username, profileImageUrl },
        process.env.SECRET_KEY
    );

    return token;
}
