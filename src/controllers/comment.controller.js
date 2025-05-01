const { successResponse, errorResponse } = require("../utils/response");
const commentService = require("../services/comment.service");

const created = async (req, res) => {
    try {
        const comment = await commentService.created(req.body);
        return successResponse(res, comment, "creado exitosamente.", 201);
    } catch (error) {
        console.error(error);
        return errorResponse(res, error, "Error al crear.", 500);
    }
};

const updated = async (req, res, next) => {
    try {
        const comment = await commentService.updated(req.params.id, req.body)
        return successResponse(res, comment, "actualizado exitosamente.", 200);
    } catch (error) {
        return errorResponse(res, error, "Error al actualizar.", 500);
    }
};

const getAll = async (req, res) => {
    try {
        const comments = await commentService.getAll();
        return successResponse(res, comments, "Consulta exitosa.", 200);

    } catch (error) {
        console.error(error);
        return errorResponse(res, error, "Error al obtener.", 500);
    }
};

const getById = async (req, res) => {
    try {
        const comment = await commentService.getById(req.params.id);
        if (!comment) return errorResponse(res, error, "Registro no encontrado.", 404);
        return successResponse(res, comment, "Consulta exitosa.", 200);
    } catch (error) {
        console.error(error);
        return errorResponse(res, error, "Error al obtener.", 500);
    }
};

const getByPost = async (req, res) => {
    try {
        const comment = await commentService.getByPost(req.params.post);
        if (!comment) return errorResponse(res, error, "Registro no encontrado.", 404);
        return successResponse(res, comment, "Consulta exitosa.", 200);
    } catch (error) {
        console.error(error);
        return errorResponse(res, error, "Error al obtener.", 500);
    }
};

const deleted = async (req, res) => {
    try {
        await commentService.deleted(req.params.id);
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
    getByPost,
    deleted
}