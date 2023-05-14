function errorHandler(error, request, response, next) {
    const { statusCode = 500 } = error;
    if (!error.message) error.message = "Oh no error"
    response.status(statusCode).json({
        error: {
            message: error.message || "Oops! Something went wrong."
        }
    })
}

module.exports = errorHandler;

