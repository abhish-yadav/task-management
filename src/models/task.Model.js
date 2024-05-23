const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", default: null },
    collab_with: { type: Schema.Types.ObjectId, ref: "User", default: null },
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
    dueDate: { type: Date },
    status: {
      type: String,
      enum: ["completed", "in-progress"],
      default: "in-progress",
    },
    labels: [{ type: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = { Task };
