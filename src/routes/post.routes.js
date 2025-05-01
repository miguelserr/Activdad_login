const router = require("express").Router();
const upload = require('../middlewares/upload');

const controller = require("../controllers/post.controller");


router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.created);
router.put("/:id", controller.updated);
router.delete("/:id", controller.deleted);
router.get('/image/:id', controller.getImage);
router.post('/image/:id', upload.single('post'), controller.updatedImage);

module.exports = router;