import Task from '../models/Task.js'

export async function autoArchiveOverdueTasks() {
  const now = new Date()

  const overdueTasks = await Task.find({
    completed: false,
    dueDate: { $lt: now },
  })

  if (overdueTasks.length === 0) {
    return { tasksToAutoDone: [] }
  }

  const ids = overdueTasks.map(t => t._id.toString())

  await Task.updateMany(
    { _id: { $in: overdueTasks.map(t => t._id) } },
    { $set: { completed: true, autoArchived: true } }
  )

  console.log(`[AutoArchive] Archived ${ids.length} overdue task(s): ${ids.join(', ')}`)

  return { tasksToAutoDone: ids }
}
