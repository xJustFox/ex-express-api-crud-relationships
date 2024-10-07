const paramSLUG = {
    slug: {
        in: ["params"],
        isString: {
            errorMessage: "Slug must be a string."
        }
    }
}

module.exports = {
    paramSLUG
}