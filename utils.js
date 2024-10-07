const slugify = require('slugify')

const createSlug = (title, posts) => {
    const baseSlug = slugify(title, {lower: true})
    let slug = baseSlug;
    let counter = 1;

    while (posts.find(p => p.slug === slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}

module.exports = {
    createSlug
}