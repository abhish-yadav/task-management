const { Task } = require("../models/task.Model");
const { User } = require("../models/user.Model");
const { response, status, messages } = require("../utils/common");

const getTasks = async (req, res, next) => {
  try {
    const { title } = req.query;

    let data = {
      $or: [{ user: req.user._id }, { collab_with: req.user._id }],
    };

    if (title) {
      data.title = { $regex: title, $options: "i" };
    }

    const tasks = await Task.find(data);

    res.render("dashboard", {
      tasks,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { getTasks };

const getFilter = async (req, res, next) => {
  try {
    const { labels, dueDate } = req.query;
    let filter = { user: req.user._id }; // Default filter to user

    if (labels) {
      filter.labels = labels;
    }

    if (dueDate) {
      const today = new Date();
      const dueDateObj = new Date(dueDate);
      filter.dueDate = {
        $gte: today,
        $lte: dueDateObj,
      };
    }

    const tasks = await Task.find(filter);
    res.render("dashboard", { tasks, user: req.user });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  const { title, description, priority, dueDate, labels } = req.body;
  try {
    const newTask = new Task({
      user: req.user._id,
      title,
      description,
      priority,
      dueDate,
      labels,
    });
    await newTask.save();
    res.redirect("/tasks");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const updates = req.body;
  try {
    const data = await Task.findByIdAndUpdate(taskId, updates);
    if (!data)
      return response({
        res,
        status: status.notFound,
        message: messages.notFound,
      });
    res.redirect("/tasks");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const data = await Task.findByIdAndDelete(taskId);
    if (!data)
      return response({
        res,
        status: status.notFound,
        message: messages.notFound,
      });
    res.redirect("/tasks");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const userCollab = async (req, res, next) => {
  const { taskId, collab_with } = req.query;
  try {
    const userList = await User.find(
      { _id: { $ne: req.user._id } },
      { password: 0 }
    );
    const taskList = await Task.find({ user: req.user._id });
    if (!taskId || !collab_with)
      return response({
        res,
        status: status.ok,
        message: messages.ok + " / User list",
        data: { userList, taskList },
      });
    const collab = await Task.findByIdAndUpdate(
      { _id: taskId, user: req.user._id },
      { $set: { collab_with } },
      { new: true }
    )
      .populate({ path: "user", select: { password: 0 } })
      .populate({ path: "collab_with", select: { password: 0 } });
    response({
      res,
      status: status.ok,
      message: messages.ok + " / Collaboration Success",
      data: collab,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  TaskController: {
    getTasks,
    getFilter,
    createTask,
    updateTask,
    deleteTask,
    userCollab,
  },
};
