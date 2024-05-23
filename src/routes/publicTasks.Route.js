const express = require("express");
const router = express.Router();
const { publicController } = require("../controllers/publicTask.Controller");

router.get("/", publicController.getTasks);
router.get("/filter", publicController.getFilter);
router.post("/", publicController.createTask);
router.patch("/:taskId", publicController.updateTask);
router.delete("/:taskId", publicController.deleteTask);

module.exports = router;
