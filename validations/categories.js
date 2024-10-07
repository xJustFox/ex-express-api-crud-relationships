const bodyData = {
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Name is a required field",
            bail: true
        },
        isString: {
            errorMessage: "Name must be a string",
            bail: true
        },
        isLength: {
            errorMessage: "Title must be at least 4 characters",
            options: { min: 4 },
        }
    }
}

module.exports = {
    bodyData
}