const db = require("../models")

module.exports.createMessage = async function (request, response, next) {
    try {
        const message = await db.Message.create({
            text: request.body.text,
            user: request.params.id
        })

        // const foundMessage = await db.Message.findById(message._id)
        const foundUser = await db.User.findById(request.params.id)
        foundUser.messages.push(message.id)
        await foundUser.save();

        const foundMessage = await db.Message.findById(message._id).populate("user", {
            username: true,
            profileImageUrl: true
        })


        return response.status(200).json({
            foundMessage
        });

    } catch (error) {
        return next({
            status: 400,
            message: "Not found"
        });
    }



}

module.exports.getMessage = async function (request, response, next) {

    try {
        const message = await db.Message.findById(request.params.messageId)
        return response.status(200).json(message)
    } catch (error) {
        return next(error);
    }
}

module.exports.deleteMessage = async function (request, response, next) {
    try {
        const message = await db.Message.findById(request.params.messageId)
        await message.deleteOne()
        return response.status(200).json(message)
    } catch (error) {
        return next(error);
    }
}