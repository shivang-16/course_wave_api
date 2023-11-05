const errorMiddleware = (err, req, res, next) => {
    // Use err.statusCode instead of statusCode
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}

export default errorMiddleware;
