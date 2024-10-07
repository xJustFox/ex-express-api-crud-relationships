const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bodyData = {
    title: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Title is a required field",
            bail: true
        },
        isString: {
            errorMessage: "Title must be a string",
            bail: true
        },
        isLength: {
            errorMessage: "Title must be at least 4 characters",
            options: { min: 4 },
        }
    },
    content: {
        in: ["body"],
        isString: {
            errorMessage: "Content must be a string",
        },
    },
    published: {
        in: ["body"],
        isBoolean: {
            errorMessage: "Published must be a boolean"
        }
    },
    categoryId: {
        in: ["body"],
        isInt: {
            errorMessage: "Category-Id must be a integer",
            bail: true
        },
        custom: {
            options: async (value) => {
                const categoryId = parseInt(value);
                const category = await prisma.category.findUnique({
                    where: {id:  categoryId}
                });
                if (!category) {
                    throw new Error(`There is no category with id: ${categoryId}`)
                }
                return true;
            }
        }
    },
    tags: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Tags is a required field",
            bail: true
        },
        isArray: {
            errorMessage: "Tags must be an array",
            bail: true
        },
        custom: {
            options: async (ids) => {
                if (ids.length === 0) {
                    throw new Error("The post must have at least one tag");
                }
                const notIntId = ids.find(id => isNaN(parseInt(id)));
                if (notIntId) {
                    throw new Error(`One or more ids are not integers`);
                }
                const tags = await prisma.tag.findMany({
                    where: {id: {in: ids}}
                });
                if (tags.length != ids.length) {
                    throw new Error(`One or more specified tags do not exist`);
                }
                return true
            }
        }
    }
}

module.exports ={
    bodyData
}