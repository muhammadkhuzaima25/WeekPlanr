import Task from '../models/Task.js'

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate('subject')
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function dueDateToDay(dueDate) {
  const d = new Date(dueDate)
  const idx = d.getDay() === 0 ? 6 : d.getDay() - 1
  return DAYS[idx]
}

export const createTask = async (req, res) => {
  try {
    const taskData = { ...req.body, user: req.user.id }
    if (!taskData.scheduledDay && taskData.dueDate) {
      taskData.scheduledDay = dueDateToDay(taskData.dueDate)
    }
    const task = await Task.create(taskData)
    const populated = await task.populate('subject')
    res.status(201).json(populated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    ).populate('subject')
    res.json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    res.json({ message: 'Task deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const clearWeek = async (req, res) => {
  try {
    await Task.deleteMany({ user: req.user.id })
    res.json({ message: 'All weekly tasks cleared' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
