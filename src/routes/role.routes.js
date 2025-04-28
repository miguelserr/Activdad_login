const router = require("express").Router();

const controller = require("../controllers/role.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.created);
router.put("/", controller.updated);
router.delete("/:id", controller.deleted);

module.exports = router;