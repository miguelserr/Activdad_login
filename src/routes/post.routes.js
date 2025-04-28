const router = require("express").Router();

const controller = require("../controllers/post.controller");


router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.created);
router.put("/:id", controller.updated);
router.delete("/:id", controller.deleted);
router.get('/image/:id', controller.getImage);

module.exports = router;