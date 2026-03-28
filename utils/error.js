const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};

module.exports = {
    errorHandler,
    // keep the original misspelled export as an alias for backward compatibility
    errorHnadler: errorHandler,
};