const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { createSlug } = require('../utils.js');

const index = async (req, res, next) => {
    let { published, word, page = 1, limit = 5 } = req.query;

    if (published === 'true') {
        published = true;
    } else if (published === 'false') {
        published = false;
    } else {
        published = undefined;
    }

    const where = {
        published,
        title: { contains: word },
        content: { contains: word }
    }

    const offset = (page - 1) * limit;
    const totalItems = await prisma.post.count({ where });
    const totalPages = Math.ceil(totalItems / limit);

    if (page > totalPages) {
        res.status(404).json({
            status: 404,
            success: false,
            message: 'Page not exist',
        })
    }
    try {
        const posts = await prisma.post.findMany({
            where,
            include: {
                category: {
                    select: {
                        name: true
                    }
                },
                tags: {
                    select: {
                        name: true
                    }
                }
            },
            take: parseInt(limit),
            skip: parseInt(offset)
        });

        const count = parseInt(posts.length);
        if (count === 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "No posts found",
                count
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            data: posts,
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
        const { title, content, published, image, categoryId, tags } = req.body;
        const posts = await prisma.post.findMany();
        const data = {
            title,
            slug: createSlug(title, posts),
            content,
            published,
            image,
            tags: {
                connect: tags.map(id => ({ id }))
            }
        }

        if (categoryId) {
            data.categoryId = categoryId;
        }

        const newPost = await prisma.post.create({ data });

        res.status(200).json({
            status: 200,
            success: true,
            newPost,
        })
    } catch (error) {
        next(error)
    }
};

const show = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const foundPost = await prisma.post.findUnique({
            where: { slug },
            include: {
                category: {
                    select: {
                        name: true
                    }
                },
                tags: {
                    select: {
                        name: true
                    }
                }
            },
        });

        if (!foundPost) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Post not found',
            });
        }

        res.status(200).json({
            status: 200,
            success: true,
            found_post: foundPost,
        })
    } catch (error) {
        next(error)
    }
};

const update = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { title, content, published, image, categoryId, tags } = req.body;

        const data = {
            title,
            content,
            published,
            image,
            tags: {
                set: tags.map(id => ({ id }))
            }
        }

        if (categoryId) {
            data.categoryId = categoryId;
        }

        const updatedPost = await prisma.post.update({
            where: { slug },
            data
        })
        res.status(200).json({
            status: 200,
            success: true,
            updated_post: updatedPost,
        })
    } catch (error) {
        next(error)
    }
};

const destroy = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const deletedPost = await prisma.post.delete({ where: { slug } })
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Post deleted'
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