const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { createSlug } = require('../utils.js');

const index = async (req, res, next) => {
    let { page = 1, limit = 5 } = req.query;

    const offset = (page - 1) * limit;
    const totalItems = await prisma.category.count({ where });
    const totalPages = Math.ceil(totalItems / limit);

    if (page > totalPages) {
        res.status(404).json({
            status: 404,
            success: false,
            message: 'Page not exist',
        })
    }
    try {
        const categories = await prisma.category.findMany({
            where,
            take: parseInt(limit),
            skip: parseInt(offset)
        });

        const count = parseInt(categories.length);
        if (count === 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "No categories found",
                count
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            data: categories,
            page,
            totalPages,
            totalItems
        });
    } catch (error) {
        next(error);
    }
};

const store = async (req, res, next) => {

    try {
        const { name } = req.body;
        const categories = await prisma.category.findMany();
        const data = {
            name,
            slug: createSlug(name, categories),
        }

        const newCategory = await prisma.category.create({ data });

        res.status(200).json({
            status: 200,
            success: true,
            newCategory,
        })
    } catch (error) {
        next(error)
    }
};

const show = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const foundCategory = await prisma.category.findUnique({
            where: { slug },
        });

        if (!foundCategory) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Category not found',
            });
        }

        res.status(200).json({
            status: 200,
            success: true,
            found_category: foundCategory,
        })
    } catch (error) {
        next(error)
    }
};

const update = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const updatedCategory = await prisma.category.update({
            where: { slug },
            data: req.body
        })
        res.status(200).json({
            status: 200,
            success: true,
            updated_category: updatedCategory,
        })
    } catch (error) {
        next(error)
    }
};

const destroy = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const deletedCategory = await prisma.category.delete({ where: { slug } })
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Category deleted'
        })
    } catch (error) {
        next(error)
    }
};

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}