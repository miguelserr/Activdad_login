const User = require('../models/user.model');
const Role = require('../models/role.model');
const path = require("path");
const fs = require("fs");

const created = async (data) => {
    await User.sync();
    const user = await User.create(data);
    return user;
};
const updated = async (id, data) => {
    const user = await User.update(data, { where: { id } });
    return user;
}
const getAll = async () => {
    return await User.findAll({ include: { model: Role, as: "Role" }, attributes: { exclude: ['role_id'] } });
};
const getById = async (id) => {
    return await User.findOne({
        where: { id },
        include: { model: Role, as: "Role" },
        attributes: { exclude: ['role_id'] }
    });
};
const deleted = async (id) => {
    return await User.destroy({ where: { id } });
};
const getAvatar = async (id) => {
    const user = await User.findOne({ where: { id } });
    if (!user.avatar) {
        return ""
    }

    const avatarPath = path.join(__dirname, '../..', 'uploads', 'images', 'users', 'avatar', user.avatar);

    // Verificar que el archivo exista
    if (!fs.existsSync(avatarPath)) {
        return ""
    }
    return avatarPath;
};
module.exports = {
    created,
    updated,
    getAll,
    getById,
    deleted,
    getAvatar
};
