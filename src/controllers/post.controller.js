const { successResponse, errorResponse } = require("../utils/response");
const postService = require("../services/post.service");

const created = async (req, res) => {
    try {
        const post = await postService.created(req.body);
        return successResponse(res, post, "creado exitosamente.", 201);
    } catch (error) {
        console.error(error);
        return errorResponse(res, error, "Error al crear.", 500);
    }
};

const updated = async (req, res, next) => {
    try {
        const post = await postService.updated(req.params.id, req.body)
        return successResponse(res, post, "actualizado exitosamente.", 200);
    } catch (error) {
        return errorResponse(res, error, "Error al actualizar.", 500);
    }
};

const getAll = async (req, res) => {
    try {
        const posts = await postService.getAll();
        return successResponse(res, posts, "Consulta exitosa.", 200);

    } catch (error) {
        console.error(error);
        return errorResponse(res, error, "Error al obtener registros.", 500);
    }
};

const getById = async (req, res) => {
    try {
        const post = await postService.getById(req.params.id);
        if (!post) return errorResponse(res, error, "Registro no encontrado.", 404);
        return successResponse(res, post, "Consulta exitosa.", 200);
    } catch (error) {
        console.error(error);
        return errorResponse(res, error, "Error al obtener registro.", 500);
    }
};

const deleted = async (req, res) => {
    try {
        await postService.deleted(req.params.id);
        return successResponse(res, req.params.id, "eliminado correctamente.", 200);
    } catch (error) {
        console.error(error);
        return errorResponse(res, error, "Error al eliminar.", 500);
    }
};
const getImage = async (req, res) => {
    try {
        const imagePath = await postService.getImage(req.params.id);
        if (imagePath === "") {
            errorResponse(res, error, "imagen no encontrada.", 404);
        }
        return res.sendFile(imagePath);
    } catch (error) {
        return errorResponse(res, error, "Error al obtener la imagen.", 500);
    }
};


module.exports = {
    created,
    updated,
    getAll,
    getById,
    deleted,
    getImage
}