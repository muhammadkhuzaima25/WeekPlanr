import Task from '../models/Task.js'
import { aiOptimize, aiOverwhelm } from '../utils/groqService.js'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const estimatedHours = {
  Quiz: 1.5,
  Assignment: 2.5,
  Project: 4.0,
  Lab: 1.5,
  Exam: 3.5,
}

function getNextDay(today) {
  const idx = DAYS.indexOf(today)
  if (idx === -1 || idx === 6) return DAYS[0]
  return DAYS[idx + 1]
}

function getToday() {
  return DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
}

function mapTasks(tasks) {
  const days = {}
  for (const day of DAYS) {
    days[day] = tasks
      .filter(t => t.scheduledDay === day)
      .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
      .map(t => ({
        _id: t._id,
        name: t.name,
        type: t.type,
        subject: t.subject?.name || 'General',
        subjectColor: t.subject?.color || '#7C3AED',
        estimatedHours: estimatedHours[t.type] || 2,
        priority: t.priority,
        completed: t.completed || false,
        autoArchived: t.autoArchived || false,
        orderIndex: t.orderIndex ?? 0,
      }))
  }
  return days
}

export const getWeekSchedule = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate('subject')
    const days = mapTasks(tasks)
    res.json({
      days,
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.completed).length,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Only schedules tasks that DON'T already have a scheduledDay
// Preserves all existing manual placements, drag-and-drop, and Overwhelm assignments
export const generateSchedule = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id, completed: false })
      .populate('subject')

    const unscheduled = tasks.filter(t => !t.scheduledDay)
    if (unscheduled.length === 0) {
      return res.json({ message: 'All tasks already scheduled', taskCount: 0 })
    }

    const priorityWeight = { high: 3, medium: 2, low: 1 }
    const sorted = [...unscheduled].sort((a, b) => {
      const pa = priorityWeight[a.priority] || 0
      const pb = priorityWeight[b.priority] || 0
      if (pa !== pb) return pb - pa
      return new Date(a.dueDate) - new Date(b.dueDate)
    })

    for (let i = 0; i < sorted.length; i++) {
      sorted[i].scheduledDay = DAYS[i % 5]
      sorted[i].orderIndex = 0
      await sorted[i].save()
    }

    res.json({ message: 'Unscheduled tasks placed by due date', taskCount: sorted.length })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// AI-powered — mode: "optimize" | "overwhelm"
export const aiSchedule = async (req, res) => {
  try {
    const { mode } = req.body

    if (mode === 'overwhelm') {
      const today = getToday()
      const allTasks = await Task.find({ user: req.user.id, completed: false }).populate('subject')
      const todayTasks = allTasks.filter(t => t.scheduledDay === today)

      if (todayTasks.length === 0) {
        const days = mapTasks(allTasks)
        return res.json({ success: true, message: 'No tasks today!', days })
      }

      const result = await aiOverwhelm(todayTasks)

      for (const task of allTasks) {
        const id = task._id.toString()
        if (result.keep?.includes(id)) {
          task.scheduledDay = today
          await task.save()
        } else if (result.shift?.includes(id)) {
          task.scheduledDay = getNextDay(today)
          await task.save()
        }
      }

      const updatedTasks = await Task.find({ user: req.user.id }).populate('subject')
      const days = mapTasks(updatedTasks)
      return res.json({ success: true, message: 'Simplified to top 3 tasks', days })
    }

    // Optimize mode — AI distribution across all 7 days
    const tasks = await Task.find({ user: req.user.id, completed: false }).populate('subject')
    const schedule = await aiOptimize(tasks)

    for (const task of tasks) {
      const id = task._id.toString()
      let assigned = false
      for (const day of DAYS) {
        if (schedule[day]?.includes(id)) {
          task.scheduledDay = day
          await task.save()
          assigned = true
          break
        }
      }
      if (!assigned) {
        task.scheduledDay = DAYS[tasks.indexOf(task) % 7]
        await task.save()
      }
    }

    const updatedTasks = await Task.find({ user: req.user.id }).populate('subject')
    const days = mapTasks(updatedTasks)
    res.json({ success: true, message: 'Week optimized by AI!', days })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
