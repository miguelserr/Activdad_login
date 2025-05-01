const User = require('../models/user.model');
const Role = require('../models/role.model');
const Auth = require('../models/auth.model');
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

const created = async (data) => {
    await User.sync();
    const user = await User.create(data);
    let auth = ''
    if (data.password) {
        await Auth.sync();
        password = await bcrypt.hash(data.password.toString(), 5);
        auth = await Auth.create({
            id: user.id,
            email: data.email,
            password: password,
        });
        user.dataValues["auth"] = true;
        console.log({ user });
    } else {
        user.dataValues["auth"] = false;
    }
    return user;
};
const updated = async (id, data) => {
    const user = await User.update(data, { where: { id } });
    await Auth.update(data, { where: { id } });
    return user;
}
const getAll = async () => {
    return await User.findAll({ include: { model: Role, as: "Role", attributes: { exclude: ['createdAt', 'updatedAt'] } }, attributes: { exclude: ['role_id'] } });
};
const getById = async (id) => {
    return await User.findOne({
        where: { id },
        include: { model: Role, as: "Role", attributes: { exclude: ['createdAt', 'updatedAt'] } },
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

const updatedAvatar = async (id, avatar) => {
    const user = await User.findByPk(id);

    if (!user) {
        return;
    }
    // Borrar avatar anterior si existe
    if (user.avatar) {
        const oldPath = path.join(__dirname, '../..', 'uploads', 'images', 'users', 'avatar', user.avatar);
        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath); // Elimina el archivo anterior
        }
    }
    user.avatar = avatar;
    return await user.save();
}

module.exports = {
    created,
    updated,
    getAll,
    getById,
    deleted,
    getAvatar,
    updatedAvatar
};
