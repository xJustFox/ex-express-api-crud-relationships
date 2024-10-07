const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { createSlug } = require('../utils.js');

const index = async (req, res, next) => {
    let { page = 1, limit = 5 } = req.query;

    const offset = (page - 1) * limit;
    const totalItems = await prisma.tag.count({ where });
    const totalPages = Math.ceil(totalItems / limit);

    if (page > totalPages) {
        res.status(404).json({
            status: 404,
            success: false,
            message: 'Page not exist',
        })
    }
    try {
        const tags = await prisma.tag.findMany({
            where,
            take: parseInt(limit),
            skip: parseInt(offset)
        });

        const count = parseInt(tags.length);
        if (count === 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "No tags found",
                count
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            data: tags,
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
        const tags = await prisma.tag.findMany();
        const data = {
            name,
            slug: createSlug(name, tags),
        }

        const newTag = await prisma.tag.create({ data });

        res.status(200).json({
            status: 200,
            success: true,
            newTag,
        })
    } catch (error) {
        next(error)
    }
};

const show = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const foundTag = await prisma.tag.findUnique({
            where: { slug },
        });

        if (!foundTag) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Tag not found',
            });
        }

        res.status(200).json({
            status: 200,
            success: true,
            found_tag: foundTag,
        })
    } catch (error) {
        next(error)
    }
};

const update = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const updatedTag = await prisma.tag.update({
            where: { slug },
            data: req.body
        })
        res.status(200).json({
            status: 200,
            success: true,
            updated_tag: updatedTag,
        })
    } catch (error) {
        next(error)
    }
};

const destroy = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const deletedTag = await prisma.tag.delete({ where: { slug } })
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Tag deleted'
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