const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      tasks: tasks,
      status: "success",
      message: "Tasks fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({
      task: task,
      status: "success",
      message: "Task created successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getTask = async (req,res) => {
  try{
    const {id} = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }
    res.status(200).json({
      task: task,
      status: "success",
      message: "Task fetched successfully",
    });
  }catch(err){
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const updateTask = async (req, res) => {
  try{
   const {id} = req.params;
   const data = req.body;
   const task = await Task.findOneAndUpdate({_id:id}, data, {new:true, runValidators:true});
    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }
    res.status(200).json({
      task: task,
      status: "success",
      message: "Task updated successfully",
    });
  }catch(err){
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
 };

const deleteTask = async (req, res) => {
  const {id} = req.params;
  try{
    const task = await Task.findOneAndDelete({_id:id});
    if (!task) {
      return res.status(404).json({
        status: "error",
        message: `no task with the id: ${id}`,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  }catch(err){
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}; 

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
