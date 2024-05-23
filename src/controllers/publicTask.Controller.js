const { Task } = require("../models/task.Model");
const { response, status, messages } = require("../utils/common");

const getTasks = async (req, res, next) => {
  try {
    const { title } = req.query;
    let data = title
      ? { title: { $regex: title, $options: "i" } }
      : { user: null };
    const tasks = await Task.find(data);
    res.render("public", {
      tasks,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getFilter = async (req, res, next) => {
  try {
    const { labels, dueDate } = req.query;
    let filter = { user: null };

    if (labels) {
      // Create a regular expression to match any of the comma-separated labels
      const labelsArray = labels.split(",").map((label) => label.trim());
      const regex = new RegExp(labelsArray.join("|"), "i");
      filter.labels = { $regex: regex };
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
    res.render("public", { tasks });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  const { title, description, priority, dueDate, labels } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
      labels,
    });
    await newTask.save();
    res.redirect("/publicTasks");
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
    res.redirect("/publicTasks");
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
    res.redirect("/publicTasks");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  publicController: {
    getTasks,
    getFilter,
    createTask,
    updateTask,
    deleteTask,
  },
};
