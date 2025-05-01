const { successResponse, errorResponse } = require("../utils/response");
const userService = require("../services/user.service");

const created = async (req, res) => {
  try {
    const user = await userService.created(req.body);
    return successResponse(res, user, "creado exitosamente.", 201);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error, "Error al crear.", 500);
  }
};

const updated = async (req, res, next) => {
  try {
    const user = await userService.updated(req.params.id, req.body)
    return successResponse(res, user, "actualizado exitosamente.", 200);
  } catch (error) {
    return errorResponse(res, error, "Error al actualizar.", 500);
  }
};

const getAll = async (req, res) => {
  try {
    const users = await userService.getAll();
    return successResponse(res, users, "Consulta exitosa.", 200);

  } catch (error) {
    console.error(error);
    return errorResponse(res, error, "Error al obtener.", 500);
  }
};

const getById = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) return errorResponse(res, error, "Registro no encontrado.", 404);
    return successResponse(res, user, "Consulta exitosa.", 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error, "Error al obtener.", 500);
  }
};

const deleted = async (req, res) => {
  try {
    await userService.deleted(req.params.id);
    return successResponse(res, req.params.id, "eliminado correctamente.", 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error, "Error al eliminar.", 500);
  }
};
const getAvatar = async (req, res) => {
  try {
    const avatarPath = await userService.getAvatar(req.params.id);
    if (avatarPath === "") {
      errorResponse(res, error, "imagen no encontrado.", 404);
    }
    return res.sendFile(avatarPath);
  } catch (error) {
    return errorResponse(res, error, "Error al obtener la imagen.", 500);
  }
};

const updatedAvatar = async (req, res) => {
  try {

    const user = await userService.updatedAvatar(req.params.id, req.file ? req.file.filename : null);

    return successResponse(res, user, "actualizado correctamente.", 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error, "Error al actaulizar la imagen.", 500);
  }
}

module.exports = {
  created,
  updated,
  getAll,
  getById,
  deleted,
  getAvatar,
  updatedAvatar
}