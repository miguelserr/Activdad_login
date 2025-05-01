const { successResponse, errorResponse } = require("../utils/response");
const authService = require("../services/auth.service");

const login = async (req, res) => {
    try {
        const resp = await authService.login(req.body);
        return successResponse(res, resp, "peticion exitosa.", 201);
    } catch (error) {
        return errorResponse(res, error, "Error en la peticion.", 500);
    }
}

const create = async (req, res) => {
    try {
        const resp = await authService.authService(req.body);
        return successResponse(res, resp, "creado exitosamente.", 201);
    } catch (error) {
        return errorResponse(res, error, "Error al crear.", 500);
    }
};

const changePassword = async (req, res) => {
    try {
        const resp = await authService.changePassword(req.params.id, req.body);
        return successResponse(res, resp, "actualizado exitosamente.", 200);
    } catch (error) {
        return errorResponse(res, error, "Error al actualizar.", 500);
    }
};

module.exports = {
    create,
    login,
    changePassword
};