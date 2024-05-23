const express = require("express");
const router = express.Router();
const { TaskController } = require("../controllers/task.Controller");
const { authorizeToken } = require("../middlewares/verification");

router.use(authorizeToken);

router.get("/", TaskController.getTasks);
router.get("/filter", TaskController.getFilter);
router.post("/", TaskController.createTask);
router.patch("/:taskId", TaskController.updateTask);
router.delete("/:taskId", TaskController.deleteTask);

router.post("/user_collab", TaskController.userCollab);

module.exports = router;
