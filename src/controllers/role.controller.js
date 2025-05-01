const { successResponse, errorResponse } = require("../utils/response");
const roleService = require("../services/role.service");

const created = async (req, res) => {
    try {
        const user = await roleService.created(req.body);
        return successResponse(res, user, "creado exitosamente.", 201);
    } catch (error) {
        console.error(error);
        return errorResponse(res, error, "Error al crear.", 500);
    }
};

const updated = async (req, res, next) => {
    try {
        const user = await roleService.updated(req.params.id, req.body)
        return successResponse(res, user, "actualizado exitosamente.", 200);
    } catch (error) {
        return errorResponse(res, error, "Error al actualizar.", 500);
    }
};

const getAll = async (req, res) => {
    try {
        const users = await roleService.getAll();
        return successResponse(res, users, "Consulta exitosa.", 200);

    } catch (error) {
        console.error(error);
        return errorResponse(res, error, "Error al obtener.", 500);
    }
};

const getById = async (req, res) => {
    try {
        const user = await roleService.getById(req.params.id);
        if (!user) return errorResponse(res, error, "Registro no encontrado.", 404);
        return successResponse(res, user, "Consulta exitosa.", 200);
    } catch (error) {
        console.error(error);
        return errorResponse(res, error, "Error al obtener.", 500);
    }
};

const deleted = async (req, res) => {
    try {
        await roleService.deleted(req.params.id);
        return successResponse(res, req.params.id, "eliminado correctamente.", 200);
    } catch (error) {
        console.error(error);
        return errorResponse(res, error, "'Error al eliminar.", 500);
    }
};

module.exports = {
    created,
    updated,
    getAll,
    getById,
    deleted
}