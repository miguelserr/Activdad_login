const Comment = require('../models/comment.model');
const User = require('../models/user.model');

const created = async (data) => {
    await Comment.sync();
    const comment = await Comment.create(data);
    return comment;
};
const updated = async (id, data) => {
    const comment = await Comment.update(data, { where: { id } });
    return comment;
}
const getAll = async () => {
    return await Comment.findAll();
};
const getById = async (id) => {
    return await Comment.findOne({ where: { id } });
};
const getByPost = async (post) => {
    return await Comment.findOne({
        where: { post_id: post },
        include: {
            model: User, as: "Author",
            attributes: {
                exclude: ['role_id', 'createdAt', 'updatedAt']
            }
        }
    });
};
const deleted = async (id) => {
    return await Comment.destroy({ where: { id } });
};
module.exports = {
    created,
    updated,
    getAll,
    getById,
    getByPost,
    deleted
};