module.exports = (req, res, next) => {
    return res.status(404).json({
        status:404,
        message: "The page you're looking for is missing."
    })
}