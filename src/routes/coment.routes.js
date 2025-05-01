const router = require("express").Router();

const controller = require("../controllers/comment.controller");


router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/post/:post", controller.getByPost);
router.post("/", controller.created);
router.put("/:id", controller.updated);
router.delete("/:id", controller.deleted);

module.exports = router;