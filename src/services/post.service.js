const Post = require('../models/post.model');
const User = require('../models/user.model');
const path = require("path");
const fs = require("fs");

const created = async (data) => {
    await Post.sync();
    const post = await Post.create(data);
    return post;
};
const updated = async (id, data) => {
    const post = await Post.update(data, { where: { id } });
    return post;
}
const getAll = async () => {
    return await Post.findAll({ include: { model: User, as: "Author", attributes: { exclude: ['role_id', 'createdAt', 'updatedAt'] } }, attributes: { exclude: ['author_id'] } });
};
const getById = async (id) => {
    return await Post.findOne({
        where: { id },
        include: {
            model: User, as: "Author", attributes: { exclude: ['role_id', 'createdAt', 'updatedAt'] }
        },
        attributes: { exclude: ['author_id'] }
    });
};
const deleted = async (id) => {
    return await Post.destroy({ where: { id } });
};
const getImage = async (id) => {
    const post = await Post.findOne({ where: { id } });
    if (!post.image) {
        return ""
    }

    const postPath = path.join(__dirname, '../..', 'uploads', 'images', 'users', 'post', post.image);

    // Verificar que el archivo exista
    if (!fs.existsSync(postPath)) {
        return ""
    }
    return postPath;
};
module.exports = {
    created,
    updated,
    getAll,
    getById,
    deleted,
    getImage
};
